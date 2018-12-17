function setenv
    if [ $argv[1] = PATH ]
        # Replace colons and spaces with newlines
        set -gx PATH (echo $argv[2..-1] | tr ': ' \n | nl | sort -k 2| uniq -f 1 | sort -n| cut -f 2)
    else
        set -gx $argv
    end
end

source ~/.env
source ~/.aliases
