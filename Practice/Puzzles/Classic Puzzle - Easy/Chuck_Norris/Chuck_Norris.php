<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
$MESSAGE = stream_get_line(STDIN, 100 + 1, "\n");
// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));
$MESSAGE = text2bin($MESSAGE);
$msgArr = str_split($MESSAGE, 1);
$output = '';
foreach ($msgArr as $key => $val) {
    if ($key == 0) {
        $output .= findState($val);
    } elseif ($val != $msgArr[$key - 1]) {
        $output .= findState($val);
    }
    $output .= '0';
    if ($key == count($msgArr) - 1) {
        break;
    } elseif ($val != $msgArr[$key + 1]) {
        $output .= ' ';
    }
}
echo $output . "\n";

function text2bin($txt_str)
{
    $len = strlen($txt_str);
    $bin = '';
    for ($i = 0; $i < $len; $i++) {
        $b = decbin(ord($txt_str[$i]));
        $bin .= strlen($b) < 7 ? str_pad($b, 7, 0, STR_PAD_LEFT) : $b;
    }
    return $bin;
}

function findState($val)
{
    if ($val == 0) {
        return '00 ';
    } else {
        return '0 ';
    }
}