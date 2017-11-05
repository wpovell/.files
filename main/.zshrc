export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/usr/local/cuda/lib64:/usr/local/cuda/extras/CUPTI/lib64"
export CUDA_HOME=/usr/local/cuda

# Path
export PATH=$PATH:~/bin/:~/dotfiles/bin:/sbin/:/usr/local/cuda-8.0/bin:~/.local/bin
# Reload Xresources
alias xup="xrdb -I$HOME ~/.Xresources"
# Never open emacs in a window
alias emacs="emacs -nw"
alias ls="ls --color"

local host_name="%{$fg[cyan]%}blueno"
local path_string="%{$fg[yellow]%}%~"
local prompt_string="»"

C1="\[\033[34m\]"
END="\[\033[0m\]"
PROMPT="%{%F{blue}%}%M%{%f%} %4(c:.../:)%3c %{%F{blue}%}»%{%f%} "

setopt automenu
