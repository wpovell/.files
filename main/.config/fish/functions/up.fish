function up
  if test (count $argv) -lt 1
    cd ..
  else
    set CDSTR ""
    set -xl n $argv[1]  
    for i in (seq $n)
      set CDSTR "../$CDSTR"
    end
    cd $CDSTR
  end
end
