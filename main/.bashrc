#!/bin/bash
. ~/.commonrc
[[ -f ~/git/weenix/.weenixrc ]] && source ~/git/weenix/.weenixrc
set bell-style none
bind 'set mark-symlinked-directories on'

# Dropdown ignores ctrl-d
if [[ -n $DISPLAY ]]; then
    window_name=$(xprop -id "$(xprop -root _NET_ACTIVE_WINDOW | awk '{print $5}')" 2> /dev/null | grep 'WM_NAME(STRING)' | awk '{print $3}' 2> /dev/null)
    if [[ $window_name == '"dropdown"' && -z $TMUX ]]; then
        set -o ignoreeof
        dim=$(xrandr | grep "*" | perl -lne 'print $1 if /([0-9]+)x/')
        i3-msg \[instance=\"dropdown\"\] floating enable, resize set $dim 300, \
               move position 0px 27px, move scratchpad >/dev/null 2>&1

        if sess=$(tmux list-sessions 2>/dev/null | grep "x12"); then
            sess=${sess:0:1}
            tmux attach -t $sess
        fi
    fi
fi

# No less history
LESSHISTFILE=-

# Max num of dirs
PROMPT_DIRTRIM=2

# Prompt
prompt() {
    last=$?
    FILESYS=$(mount | grep "^$(df -Pk . | sed '2q;d' | cut -f 1 -d ' ') " | cut -f 5 -d ' ')
    C3="\[\033[33m\]"
    C4="\[\033[34m\]"
    C5="\[\033[35m\]"
    RED="\[\033[38;5;196m\]"
    END="\[\033[0m\]"
    GITP=""
    # Don't use git prompt if in network mount
    if [[ "$FILESYS" != "fuse.sshfs" ]] && (
           [ -d .git ] ||
           git rev-parse --git-dir)>/dev/null 2>&1; then
       GITP=""
       BRANCH=$(git branch | grep -Po "(?<=\* ).+|(?<=HEAD detached at )[a-f0-9]+")
       if [ "$BRANCH" != "master" ]; then
         GITP="$GITP [$BRANCH]"
       fi

       if git diff --no-ext-diff --quiet --exit-code; then
      	   GITP="$C4$GITP"
       else
           GITP="$C3$GITP"
       fi
       GITP="$GITP$END "
    fi
    end="» "
    if [[ "$last" -ne "0" ]]; then
      end="$RED$end"
    fi
    PS1="$C4\h$END \w $GITP$C4"

    if [[ -n $VIRTUAL_ENV ]]; then
        PS1="(`basename \"$VIRTUAL_ENV\"`) $PS1"
    fi

    PS1="$PS1\n$end$END"
}

PROMPT_COMMAND="prompt"

# Ignore repeat history
HISTCONTROL=ignoreboth
# Size
HISTSIZE=1000
# Disable C-s
stty -ixon
