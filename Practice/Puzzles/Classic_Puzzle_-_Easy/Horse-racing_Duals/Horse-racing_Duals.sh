# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

D=10000000
prev=-1

read N
for (( i=0; i<N; i++ ))
do
    read Pi
    arr[Pi]=1
done

# Write an action using echo
# To debug: echo "Debug messages..." >&2

#echo "answer"

if [ ${#arr[@]} != $N ]
then
    D=0
else
    for k in ${!arr[@]}
    do
        delta=$(($k - $prev))
        if (( $prev > -1 && $delta < $D ))
        then
            D=$delta
        fi
        prev=$k
    done
fi

echo $D