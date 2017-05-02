/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var pI = parseInt;
var rl = readline;
var N = pI(rl()); // Number of elements which make up the association table.
var Q = pI(rl()); // Number Q of file names to be analyzed.
var mime = [];
for (var i = 0; i < N; i++) {
    var inputs = rl().split(' ');
    var EXT = inputs[0]; // file extension
    var MT = inputs[1]; // MIME type.
    mime [EXT.toLowerCase()] = MT;
}
for (var i = 0; i < Q; i++) {
    var FNAME = rl(); // One file name per line.
    var arr = FNAME.toLowerCase().split('.');
    if (arr.length > 1) {
        var extKey = arr.length - 1;
        if (mime[arr[extKey]] != undefined) {
            output(mime[arr[extKey]]);
            continue;
        }
    }
    output('UNKNOWN');
}

// Write an action using print()
// To debug: printErr('Debug messages...');

//print('UNKNOWN'); // For each of the Q filenames, display on a line the corresponding MIME type. If there is no corresponding type, then display UNKNOWN.

function output(str) {
    print(str);
}