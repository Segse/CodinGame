// /**
//  * Don't let the machines win. You are humanity's last hope...
//  **/
// var width = parseInt(readline()); // the number of cells on the X axis
// var height = parseInt(readline()); // the number of cells on the Y axis
// for (var i = 0; i < height; i++) {
//     var line = readline(); // width characters, each either 0 or .
// }
// Write an action using print()
// To debug: printErr('Debug messages...');
// Three coordinates: a node, its right neighbor, its bottom neighbor
// print('0 0 1 0 0 1');

// ##############################################

/**
 * Don't let the machines win. You are humanity's last hope...
 **/
var width = parseInt(readline()); // the number of cells on the X axis
var height = parseInt(readline()); // the number of cells on the Y axis
var grid = [];
for (var x = 0; x < width; x++) {
    grid[x] = [];
}
for (var y = 0; y < height; y++) {
    var line = readline(); // width characters, each either 0 or .
    var len = line.length;
    for (var x = 0; x < len; x++) {
        grid[x][y] = line[x];
    }
}
// Write an action using print()
// To debug: printErr('Debug messages...');
//print('0 0 1 0 0 1'); // Three coordinates: a node, its right neighbor, its bottom neighbor
for (var x in grid) {
    var valX = grid[x];
    for (var y in valX) {
        var node = valX[y];
        if (node === '0') {
            var output = x + ' ' + y + ' ';
            var x2 = x;
            var y2 = y;
            do {
                ++x2;
                if (grid[x2] == undefined) {
                    output += '-1 -1 ';
                } else if (grid[x2][y] === '0') {
                    output += x2 + ' ' + y + ' ';
                    break;
                }
            } while (grid[x2] != undefined);
            do {
                ++y2;
                if (grid[x][y2] == undefined) {
                    output += '-1 -1';
                } else if (grid[x][y2] === '0') {
                    output += x + ' ' + y2;
                    break;
                }
            } while (grid[x][y2] != undefined);
            print(output);
        }
    }
}