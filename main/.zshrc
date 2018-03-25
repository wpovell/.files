. ~/.commonrc

local host_name="%{$fg[cyan]%}blueno"
local path_string="%{$fg[yellow]%}%~"
local prompt_string="»"

C1="\[\033[34m\]"
END="\[\033[0m\]"
PROMPT="%{%F{blue}%}%M%{%f%} %4(c:.../:)%3c %{%F{blue}%}»%{%f%} "

setopt automenu
