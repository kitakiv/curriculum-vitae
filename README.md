# curriculum-vitae
curriculum vitae about me
parse_git_branch() {
  git branch 2>/dev/null | grep '*' | sed 's/* //'
}

# Prompt: show username and git branch only
export PS1="> (\$(parse_git_branch)) \$ "

export PS1="\u@\h:\w\$ "