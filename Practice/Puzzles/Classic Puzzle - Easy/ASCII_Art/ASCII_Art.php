<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
$alphabet = [
    0 => 'A',
    1 => 'B',
    2 => 'C',
    3 => 'D',
    4 => 'E',
    5 => 'F',
    6 => 'G',
    7 => 'H',
    8 => 'I',
    9 => 'J',
    10 => 'K',
    11 => 'L',
    12 => 'M',
    13 => 'N',
    14 => 'O',
    15 => 'P',
    16 => 'Q',
    17 => 'R',
    18 => 'S',
    19 => 'T',
    20 => 'U',
    21 => 'V',
    22 => 'W',
    23 => 'X',
    24 => 'Y',
    25 => 'Z',
    26 => '?',
];
$alphabet_flipped = array_flip($alphabet);
fscanf(STDIN, "%d",
    $L
);
fscanf(STDIN, "%d",
    $H
);
$T = stream_get_line(STDIN, 256, "\n");
$arr_T = str_split(strtoupper($T), 1);

for ($i = 0; $i < $H; $i++) {
    $ROW = stream_get_line(STDIN, 1024, "\n");
    $output = '';
    foreach ($arr_T as $letter) {
        if (isset($alphabet_flipped[$letter])) {
            $pos = $alphabet_flipped[$letter];
        } else {
            $pos = count($alphabet) - 1;
        }
        $output .= substr($ROW, $pos * $L, $L);
    }
    echo $output . "\n";
}

// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));

//echo("answer\n");

cty