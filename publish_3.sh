for dir in `ls topublish_3`
do
    ( cd topublish_3/$dir && npm publish --no-progress )
done