function mkcd
  mkdir -p "$argv[1]"
  if test $status -eq 0
    cd "$argv[1]"
  end
end
