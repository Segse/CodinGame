/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var MESSAGE = readline();

// Write an action using print()
// To debug: printErr('Debug messages...');

//print('answer');

var pi = parseInt;
MESSAGE = text2bin(MESSAGE);
var arr = MESSAGE.split('');
var output = '';

for (var key in arr) {
    var val = arr[key];
    if (pi(key) == 0) {
        output += findState(val);
    }
    else if (val != arr[pi(key) - 1]) {
        output += findState(val);
    }
    output += '0';
    if (pi(key) == arr.length - 1) {
        break;
    }
    else if (val != arr[pi(key) + 1]) {
        output += ' ';
    }
}

print(output);

function text2bin(txt_str) {
    var len = txt_str.length;
    var bin = '';
    for (var i = 0; i < len; i++) {
        var b = txt_str[i].charCodeAt(0).toString(2);
        bin += b.length < 7 ? str_pad(b) : b;
    }
    return bin;
}

function str_pad(str) {
    var pad = "0000000";
    return pad.substring(0, pad.length - str.length) + str;
}

function findState(val) {
    if (val == 0) {
        return '00 ';
    } else {
        return '0 ';
    }
}