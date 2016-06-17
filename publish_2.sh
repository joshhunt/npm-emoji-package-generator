for dir in `ls topublish_2`
do
    ( cd topublish_2/$dir && npm publish --no-progress )
done