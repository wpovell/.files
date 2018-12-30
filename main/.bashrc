#!/bin/bash

# shellcheck source=/home/wpovell/.env
. ~/.env
# shellcheck source=/home/wpovell/.aliases
. ~/.aliases

~/bin/support/dropdown

# Max num of dirs
PROMPT_DIRTRIM=2

# Prompt
prompt() {
    last=$?
    FILESYS=$(mount |
                  grep "^$(df -Pk . | sed '2q;d' | cut -f 1 -d ' ') " |
                  cut -f 5 -d ' ')
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
        BRANCH=$(git branch |
                     grep -Po "(?<=\* ).+|(?<=HEAD detached at )[a-f0-9]+")
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
        PS1="($(basename "$VIRTUAL_ENV")) $PS1"
    fi

    PS1="$PS1\n$end$END"
}

PROMPT_COMMAND="prompt"

# Ignore repeat history
HISTCONTROL=ignoreboth
# Size
HISTFILESIZE=10000
HISTSIZE=10000
# Session appends rather than overwrites history
shopt -s histappend
# Disable C-s
stty -ixon
set bell-style none
bind 'set mark-symlinked-directories on'
