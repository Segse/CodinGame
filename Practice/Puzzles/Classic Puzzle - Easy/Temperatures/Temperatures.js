/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var n = parseInt(readline()); // the number of temperatures to analyse
var temps = readline(); // the n temperatures expressed as integers ranging from -273 to 5526

// Write an action using print()
// To debug: printErr('Debug messages...');

//print('result');

var arr_temps = temps.split(' ');
var result = arr_temps[0];
if (result != '') {
    for (var i in arr_temps) {
        var val = arr_temps[i];
        if (Math.abs(val) < Math.abs(result)) {
            result = val;
        } else if (Math.abs(val) == Math.abs(result)) {
            if (val > result) {
                result = val;
            }
        }
    }
} else {
    result = 0;
}

print(result);