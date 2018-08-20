function grt
    set dir (git rev-parse --show-toplevel 2>/dev/null)
    if test $status -ne 0
      echo "Not in a repo"
    else
      cd $dir
    end
end
