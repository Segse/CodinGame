<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

fscanf(STDIN, "%s", $LON);
fscanf(STDIN, "%s", $LAT);
fscanf(STDIN, "%d", $N);
$delta = -1;
$output = '';
for ($i = 0; $i < $N; $i++) {
    $defibArr = explode(';', stream_get_line(STDIN, 256, "\n"));
    $longA = str_replace(',', '.', $LON);
    $latA = str_replace(',', '.', $LAT);
    $longB = str_replace(',', '.', $defibArr[4]);
    $latB = str_replace(',', '.', $defibArr[5]);
    $x = abs($longB - $longA) * cos(($latA + $latB) / 2);
    $y = abs($latB - $latA);
    $d = sqrt(pow($x, 2) + pow($y, 2)) * 6371;
    if ($i == 0 || $d < $delta) {
        $delta = $d;
        $output = $defibArr[1];
    }
}

// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));
echo $output . "\n";