function fish_prompt
  echo -n (date '+(%I:%M) ')
  set_color blue	 
  echo -n "$USER "
  set_color normal
  echo -n (prompt_pwd)
  set_color blue
  set branch (git branch 2>/dev/null | grep "*" | cut -f2 -d" ")
  if [ "$branch" != "" ]
     git diff --no-ext-diff --quiet --exit-code
     if [ $status != 0 ]
         set_color yellow
     end
     echo -n "  "
     if [ "$branch" != "master" ]
         echo -n "[$branch] "
     end
  end
  set_color blue
  echo -en "\n⨉⪧ "
  set_color normal
end
