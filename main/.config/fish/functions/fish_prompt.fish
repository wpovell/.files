function fish_prompt
  set_color blue	 
  echo -n "$USER "
  set_color normal
  echo -n (prompt_pwd)
  set_color blue
  set branch (git branch 2>/dev/null | grep "*" | cut -f2 -d" ")
  if [ "$branch" != "" ]
     echo -n " [$branch]"
  end 
  echo -n " » "
  set_color normal
end
