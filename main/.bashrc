# Cuda Stuff
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda/lib64:/usr/local/cuda/extras/CUPTI/lib64"
export CUDA_HOME=/usr/local/cuda

# Path
export PATH=$PATH:~/bin/:~/dotfiles/bin:/sbin/:/usr/local/cuda-8.0/bin:~/.local/bin

# Reload Xresources
alias xup="xrdb -I$HOME ~/.Xresources"
# Never open emacs in a window
alias emacs="emacs -nw"
# Ls, now with color!
alias ls='ls --color=auto'
alias lsa='ls -a'
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
