<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * */
$D = -1;
fscanf(STDIN, "%d", $N);
$arr = [];
for ($i = 0; $i < $N; $i++) {
    fscanf(STDIN, "%d", $Pi);
    if (isset($arr[$Pi])) {
        $D = 0;
        break;
    } else {
        $arr[$Pi] = $Pi;
    }
}
if ($D === -1) {
    ksort($arr);
    $prev = -1;
    foreach ($arr as $value) {
        if ($prev > -1) {
            $delta = abs($prev - $value);
            if ($D === -1) {
                $D = $delta;
            } elseif ($delta < $D) {
                $D = $delta;
            }
        }
        $prev = $value;
    }
}
// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));
//echo("answer\n");

echo $D . "\n";