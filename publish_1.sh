for dir in `ls topublish_1`
do
    ( cd topublish_1/$dir && npm publish --no-progress )
done