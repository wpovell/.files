. ~/.commonrc

# No less history
LESSHISTFILE=-

# Max num of dirs
PROMPT_DIRTRIM=2

# Prompt
prompt() {
    C1="\[\033[34m\]"
    END="\[\033[0m\]"
    BRIGHT="\[\033[35m\]"
    GIT_P=""
    BRANCH=""
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
    PS1="$C1\h$END \w $GITP$C1»$END "	
}

PROMPT_COMMAND="prompt"

# Ignore repeat history
HISTCONTROL=ignoreboth
# Size
HISTSIZE=1000
# Disable C-s
stty -ixon
