/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var toFloat = function (str) {
    return parseFloat(str.replace(',', '.'));
};
var longA = toFloat(readline());
var latA = toFloat(readline());
var N = parseInt(readline());
var delta = -1;
var output = '';
for (var i = 0; i < N; i++) {
    var defibArr = readline().split(';');
    var longB = toFloat(defibArr[4]);
    var latB = toFloat(defibArr[5]);
    var x = Math.abs(longA - longB) * Math.cos((latA + latB) / 2);
    var y = Math.abs(latA - latB);
    var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371;
    if (i == 0 || d < delta) {
        delta = d;
        output = defibArr[1];
    }
}

// Write an action using print()
// To debug: printErr('Debug messages...');

print(output);