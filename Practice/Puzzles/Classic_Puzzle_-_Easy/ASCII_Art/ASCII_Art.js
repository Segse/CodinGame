/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '?',
];
var alphabet_flipped = array_flip(alphabet);
var p = parseInt;
var r = readline;
var L = p(r());
var H = p(r());
var T = r();
var arr_T = T.toUpperCase().split('');

for (var i = 0; i < H; i++) {
    var ROW = r();
    var output = '';
    for (var k in arr_T) {
        var letter = arr_T[k];
        if (alphabet_flipped[letter] != undefined) {
            var pos = alphabet_flipped[letter];
        } else {
            var pos = alphabet.length - 1;
        }
        output += ROW.substring(pos * L, pos * L + L);
    }
    print(output);
}

// Write an action using print()
// To debug: printErr('Debug messages...');

//print('answer');

function array_flip(trans) {
    var tmp_ar = {};

    for (var key in trans) {
        if (trans.hasOwnProperty(key)) {
            tmp_ar[trans[key]] = key;
        }
    }

    return tmp_ar;
}