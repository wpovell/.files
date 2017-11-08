. ~/.commonrc

# No less history
LESSHISTFILE=-

# Max num of dirs
PROMPT_DIRTRIM=2

# Prompt
C1="\[\033[34m\]"
END="\[\033[0m\]"
PS1="$C1\h$END \w $C1»$END "

# Ignore repeat history
HISTCONTROL=ignoreboth
# Size
HISTSIZE=500
# Disable C-s
stty -ixon
