function setenv
    if [ $argv[1] = PATH ]
        # This is a big hack to allow me to call setenv on
        # PATH multiple times without messing up my bash config
        # Essentially turns into space seperated list of values
        # and then removes duplicates that somehow magically
        # show up.

        # TODO: Make this better
        set -gx PATH (echo $argv[2..-1] | tr ': ' \n | nl | sort -k 2 | uniq -f 1 | sort -n | cut -f 2)
    else
        set -gx $argv
    end
end

source ~/.env
source ~/.aliases
