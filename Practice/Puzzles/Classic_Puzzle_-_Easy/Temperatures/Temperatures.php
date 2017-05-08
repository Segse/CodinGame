<?
/*
 * you know the task,
 * so take action :^)
 */
fscanf(STDIN, "%d",
    $n // the number of temperatures to analyse
);
$tempArr = explode(' ',
    stream_get_line(STDIN, 256 + 1, "\n")); // the n temperatures expressed as integers ranging from -273 to 5526
$re = $tempArr[0]; /* set the first temperature to compare */
foreach ($tempArr as $temp) {
    /* find the temperature to be closest to zero */
    if (abs($temp) < abs($re)) { /* get absolute values of temps, so the smaller one is closer to zero */
        $re = $temp;
    } elseif (abs($temp) == abs($re)) {
        if ($temp > $re) { /* if both absolute temp values are equal, the puzzle expects the positive temp */
            $re = $temp;
        }
    }
}
/*
 * this final int cast is very important in this php code
 * it is the reason, why we do not need an additional if clause for case06 No temperature,
 * in case 6 the input is '' an empty string, the puzzle expects '0', if there is no temperature
 * so intval('') => 0
 */
echo intval($re) . "\n";