function setenv
    if [ $argv[1] = PATH ]
        # This is a big hack to allow me to call setenv on
        # PATH multiple times without messing up my bash config
        # TODO: Make this better
        set -gx PATH (
        echo $argv[2..-1] | \ # Get path args
        tr ': ' \n | \        # Trim colons and spaces
        nl | \                # Number lines
        sort -k 2| \          # Sort path entries
        uniq -f 1 | \         # Get unique path entries
        sort -n| \            # Sort by line numbers
        cut -f 2)             # Remove line numbers
    else
        set -gx $argv
    end
end

# Added to supress warnings about
# unset rows/cols in alacritty
stty >/dev/null 2>&1

source ~/.env
source ~/.aliases
