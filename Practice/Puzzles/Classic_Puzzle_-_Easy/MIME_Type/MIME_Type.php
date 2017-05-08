<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

fscanf(STDIN, "%d",
    $N // Number of elements which make up the association table.
);
fscanf(STDIN, "%d",
    $Q // Number Q of file names to be analyzed.
);
$mime = [];
for ($i = 0; $i < $N; $i++) {
    fscanf(STDIN, "%s %s",
        $EXT, // file extension
        $MT // MIME type.
    );
    $mime [strtolower($EXT)] = $MT;
}
for ($i = 0; $i < $Q; $i++) {
    $FNAME = stream_get_line(STDIN, 500, "\n"); // One file name per line.
    $arr = explode('.', strtolower($FNAME));
    if (count($arr) > 1) {
        $extKey = count($arr) - 1;
        if (isset($mime[$arr[$extKey]])) {
            output($mime[$arr[$extKey]]);
            continue;
        }
    }
    output('UNKNOWN');
}

// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));

//echo("UNKNOWN\n"); // For each of the Q filenames, display on a line the corresponding MIME type. If there is no corresponding type, then display UNKNOWN.

function output($str)
{
    echo $str . "\n";
}