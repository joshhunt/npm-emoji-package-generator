for dir in `ls topublish_0`
do
    ( cd topublish_0/$dir && npm publish --no-progress )
done