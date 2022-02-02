#########################################################
# filename : commit.sh
# author   : geekhall
# version  : v1.0.0
# function : quick commit tool
#            1. Get current date and time.
#            2. commit and push to github, gitee and gitlab.
#########################################################
usage()
{
	echo "Usage:"
	echo "commit.sh"
	echo " or"
	echo "commit.sh CommentContent"
	exit 2
}

if [ $# -eq 1 ]; then
	comment=$1
else
	comment=`date +'%Y%m%d-%H%M%S'`
fi

###############
# copy file
###############

git add .
git commit -m "$comment"
git push github
git push gitee
git push gitlab
echo "commit ok"


