function setenv
    if [ $argv[1] = PATH ]
        # This is a big hack to allow me to call setenv on
        # PATH multiple times without messing up my bash config
        # TODO: Make this better
        set -gx PATH (echo $argv[2..-1] | tr ': ' \n | nl | sort -k 2 | uniq -f 1 | sort -n | cut -f 2)
    else
        set -gx $argv
    end
end

# Added to supress warnings about
# unset rows/cols in alacritty
stty >/dev/null 2>&1

source ~/.env
source ~/.aliases
