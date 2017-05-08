/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var pI = parseInt;
var rl = readline;
var D = -1;
var N = pI(rl());
var arr = [];
for (var i = 0; i < N; i++) {
    var Pi = pI(rl());
    if (arr[Pi] != undefined) {
        D = 0;
        break;
    } else {
        arr[Pi] = Pi;
    }
}

// Write an action using print()
// To debug: printErr('Debug messages...');

//print('answer');

if (D === -1) {
    arr = ksort(arr);
    var prev = -1;
    for (var k in arr) {
        var value = arr[k];
        if (prev > -1) {
            var delta = Math.abs(prev - value);
            if (D === -1) {
                D = delta;
            }
            else if (delta < D) {
                D = delta;
            }
        }
        prev = value;
    }
}

print(D);

function ksort(obj) {
    var keys = Object.keys(obj).sort();
    var sortedObj = {};

    for (var i in keys) {
        sortedObj[keys[i]] = obj[keys[i]];
    }

    return sortedObj;
}