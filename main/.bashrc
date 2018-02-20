. ~/.commonrc

set bell-style none

# Dropdown ignores ctrl-d
window_name=$(xprop -id "$(xprop -root _NET_ACTIVE_WINDOW | awk '{print $5}')" 2> /dev/null | grep 'WM_NAME(STRING)' | awk '{print $3}' 2> /dev/null)
if [[ $window_name == '"dropdown"' ]] && [[ -z $TMUX ]]
then
  set -o ignoreeof
fi

# No less history
LESSHISTFILE=-

# Max num of dirs
PROMPT_DIRTRIM=2

# Prompt
prompt() {
    FILESYS=$(mount | grep "^$(df -Pk . | sed '2q;d' | cut -f 1 -d ' ') " | cut -f 5 -d ' ')
    C1="\[\033[34m\]"
    END="\[\033[0m\]"
    BRIGHT="\[\033[35m\]"
    GITP=""
    # Don't use git prompt if in network mount
    if [[ $FILESYS != "fuse.sshfs" ]]; then
      git status > /dev/null 2>&1
      if [[ $? == 0 ]]; then
      	GITP=""
      	BRANCH="$(git branch | grep -Po "(?<=\* )\w+")"
      	if [ "$BRANCH" != "master" ]; then
      	    GITP="$GITP [$BRANCH]"
      	fi

      	if [[ $(git diff --shortstat 2> /dev/null | tail -n1) != "" ]]; then
      	    GITP="$BRIGHT$GITP$END"
      	fi
      	GITP="$GITP "
      fi
    fi
    PS1="$C1\h$END \w $GITP$C1»$END "

    if [[ -n $VIRTUAL_ENV ]]; then
        PS1="(`basename \"$VIRTUAL_ENV\"`) $PS1"
    fi
}

PROMPT_COMMAND="prompt"

# Ignore repeat history
HISTCONTROL=ignoreboth
# Size
HISTSIZE=1000
# Disable C-s
stty -ixon
