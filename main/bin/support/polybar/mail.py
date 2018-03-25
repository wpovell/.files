#!/usr/bin/python3
import json
import subprocess
import os
import re
import imaplib
import concurrent.futures
import socket
from functools import partial

def cleanup_imap(mail, futures):
    concurrent.futures.wait(futures)
    mail.logout()

def notification_callback(gid, uid, account_id, mail, future):
    output = future.result().stdout.decode('utf-8').strip()
    if output == 'open':
        url = 'mail.google.com/mail/u/{}/#inbox/{}'.format(account_id, gid)
        subprocess.call(['firefox-nightly', url])
    elif output == 'delete':
        mail.store(uid, '+FLAGS', r'\Deleted')
    elif output == 'read':
        mail.store(uid, '+FLAGS', r'\Seen')

# Ensure cache file eixsts
CACHE = '/home/wpovell/.cache/polybar_mail'
if not os.path.exists(CACHE):
    with open(CACHE, 'w') as f:
        f.write('[[],[]]')

TRUNCATE_AT = 25
def truncate(s):
    '''Truncate long subjects'''
    return s[:TRUNCATE_AT] + '...' if len(s) > TRUNCATE_AT else s

def query():
    '''Query for new mail, notify if new.'''

    # Read passwords
    with open('/home/wpovell/dotfiles/pass.json') as f:
        passwords = json.load(f)

    # Read in fetched but unread mail to compare to
    try:
        with open(CACHE, 'r') as f:
            seen = json.load(f)
    except json.decoder.JSONDecodeError:
        # Probably an empty json file
        seen = [[], []]

    new_seen = []
    cache_file = open(CACHE, 'w')
    accounts = sorted(passwords.keys())
    unread_count = []

    pool = concurrent.futures.ThreadPoolExecutor()

    futures = []
    for account_id, email in enumerate(accounts):
        try:
            mail = imaplib.IMAP4_SSL('imap.gmail.com', 993)
        except (socket.gaierror, ConnectionResetError, OSError):
            # No internet
            exit()
        
        mail.login(email, passwords[email])
        mail.select('Inbox')

        # Notify for unseen emails
        unread = list(map(lambda x: x.decode('utf-8'),
                          mail.search(None, 'UnSeen')[1][0].split()))
        new_seen.append(unread)
        new_mail = set(unread) - set(seen[account_id])
        for uid in new_mail:
            data = mail.fetch(uid, 'BODY.PEEK[HEADER.FIELDS (FROM SUBJECT)]')
            
            headers = data[1][0][1].decode('utf-8').replace('\r','').strip().split('Subject: ')
            if len(headers) == 2:
                frm, sub = headers
            else:
                frm = headers[0]
                sub = ''
                
            # Process
            frm = frm.replace('"', '')
            frm = re.sub(r'<[_a-z.@]+>', '', frm, re.I).strip()

            frm = truncate(frm)
            sub = truncate(sub.replace('Subject: ', ''))

            # Google mail id
            gid = hex(int(mail.fetch(uid, '(X-GM-MSGID)')[1][0].split()[2][:-1]))[2:]
            info = frm + ('\n' + sub) if sub else ''
            args = ['dunstify',
                    '--action=open,Open "{}"'.format(sub),
                    '--action=read,Mark "{}" as read'.format(sub),
                    '--action=delete,Delete "{}"'.format(sub),
                    '--appname=Mail', 'Mail', '{}\n{}'.format(frm, sub)]

            f = pool.submit(subprocess.run, args, stdout=subprocess.PIPE)
            f.add_done_callback(
                partial(notification_callback,
                        gid, uid, account_id, mail))
            futures.append(f)

    pool.submit(cleanup_imap, mail, futures)
    pool.shutdown(wait=False)

    s = ''
    json.dump(new_seen, cache_file)
    cache_file.close()

    lens = list(map(len, new_seen))
    return sum(lens)

def show():
    try:
        with open(CACHE) as f:
            cache = json.load(f)
    except Exception:
        cache = [[],[]]

    if cache[0] or (not cache[0] and not cache[1]):
        subprocess.call(['browser', 'mail.google.com/mail/u/0/'])
    if cache[1]:
        subprocess.call(['browser', 'mail.google.com/mail/u/1/'])
    query()



if __name__ == '__main__':
    from sys import argv
    if len(argv) < 2 or argv[1] == 'query':
        alt_color = '' if len(argv) < 3 else argv[2]
        unread = query()
        if unread:
            s = '%{F' + alt_color + '}'
            s += '  {}'.format(unread)
        else:
            s = ''

        print(s)
    else:
        show()
        query()
