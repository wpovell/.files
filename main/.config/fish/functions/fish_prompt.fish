function fish_prompt
    # Store status of previous command
    set failed false
    if [ $status -ne 0 ]
        set failed true
    end

    # Host
    set_color blue
    echo -n (hostname)" "
    set_color normal

    # Current dir
    echo -n (prompt_pwd)
    set_color blue

    # Git
    set branch (git branch 2>/dev/null | grep "*" | cut -f2 -d" ")
    if [ "$branch" != "" ]
        git diff --no-ext-diff --quiet --exit-code 2>/dev/null
        if [ $status != 0 ]
            set_color yellow
        end
        echo -n "  "
        if [ "$branch" != "master" ]
            echo -n "[$branch] "
        end
    end

    # Prompt color is red if previous command failed
    if [ $failed = true ]
        set_color F00
    else
        set_color blue
    end

    echo -en "\n» "
    set_color normal
end
