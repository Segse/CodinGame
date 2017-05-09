<?php
///**
// * Don't let the machines win. You are humanity's last hope...
// **/
//fscanf(STDIN, "%d",
//    $width // the number of cells on the X axis
//);
//fscanf(STDIN, "%d",
//    $height // the number of cells on the Y axis
//);
//for ($i = 0; $i < $height; $i++) {
//    $line = stream_get_line(STDIN, 31 + 1, "\n"); // width characters, each either 0 or .
//}
// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));
// Three coordinates: a node, its right neighbor, its bottom neighbor
//echo("0 0 1 0 0 1\n");

######################################################

/* solution */

/**
 * Don't let the machines win. You are humanity's last hope...
 **/

fscanf(STDIN, "%d",
    $width // the number of cells on the X axis
);
fscanf(STDIN, "%d",
    $height // the number of cells on the Y axis
);

$grid = [];
for ($y = 0; $y < $height; $y++) {
    $line = stream_get_line(STDIN, 31, "\n"); // width characters, each either 0 or .
    $len = strlen($line);
    for ($x = 0; $x < $len; $x++) {
        $grid[$x][$y] = $line[$x];
    }
}

// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));

//echo("0 0 1 0 0 1\n"); // Three coordinates: a node, its right neighbor, its bottom neighbor

foreach ($grid as $x => $valX) {
    foreach ($valX as $y => $node) {
        if ($node === '0') {
            $output = $x . ' ' . $y . ' ';

            $x2 = $x;
            $y2 = $y;

            do {
                ++$x2;
                if (!isset($grid[$x2][$y])) {
                    $output .= '-1 -1 ';
                } elseif ($grid[$x2][$y] === '0') {
                    $output .= $x2 . ' ' . $y . ' ';
                    break;
                }
            } while (isset($grid[$x2][$y]));

            do {
                ++$y2;
                if (!isset($grid[$x][$y2])) {
                    $output .= '-1 -1';
                } elseif ($grid[$x][$y2] === '0') {
                    $output .= $x . ' ' . $y2;
                    break;
                }
            } while (isset($grid[$x][$y2]));

            output($output);
        }
    }
}

function output($str)
{
    echo $str . "\n";
}

//[
//    0 => [
//        0 => 0,
//        1 => '.',
//        2 => 0,
//    ],
//    1 => [
//        0 => '.',
//        1 => '.',
//        2 => '.',
//    ],
//    2 => [
//        0 => '.',
//        1 => '.',
//        2 => 0,
//    ],
//]
