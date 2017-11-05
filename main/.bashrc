# Cuda Stuff
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda/lib64:/usr/local/cuda/extras/CUPTI/lib64"
export CUDA_HOME=/usr/local/cuda

# Path
export PATH=$PATH:~/bin/:~/dotfiles/bin:/sbin/:/usr/local/cuda-8.0/bin:~/.local/bin

# No nv
__GL_SHADER_DISK_CACHE_PATH=$HOME/.cache/nv/

# Reload Xresources
alias xup="xrdb -I$HOME ~/.Xresources"
alias e="emacs"
# Ls, now with color!
alias ls='ls --color=auto'
alias lsa='ls -a'
alias r='ranger'
alias chrome="$(which google-chrome-stable)"
alias yaourt-update="yaourt -Syu"
alias yaourt-clean="yaourt -Qdt"
alias weather="curl wttr.in 2>/dev/null | head -n 7 | tail -n +3"
alias weather-all="curl wttr.in 2>/dev/null | tail -n 33 | head -n 30"
alias m='browser https://mail.google.com/mail/u/0/'

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
