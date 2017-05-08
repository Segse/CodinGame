/* initial code */

// /**
//  * Auto-generated code below aims at helping you parse
//  * the standard input according to the problem statement.
//  **/
// var inputs = readline().split(' ');
// var W = parseInt(inputs[0]);
// var H = parseInt(inputs[1]);
// for (var i = 0; i < H; i++) {
//     var inputs = readline().split(' ');
//     for (var j = 0; j < W; j++) {
//         var food = parseInt(inputs[j]);
//     }
// }
// Write an action using print()
// To debug: printErr('Debug messages...');
// print('answer');

// #########################################################################################

/* solution */

/**
 *
 * @param val
 */
var debug = function (val) {
    if (readline == undefined) {
        console.log(val);
    } else {
        printErr(val);
    }
};
/**
 *
 * @constructor
 */
var Lake = function () {
    var _this = this;
    /**
     *
     * @type {Array}
     */
    var lakeArr = [];
    /**
     *
     */
    var setLakeArr = function () {
        if (readline == undefined) {
            var input = '3 3';
            var inputs = input.split(' ');
            var width = parseInt(inputs[0]);
            var height = parseInt(inputs[1]);
            input = [
                '1 2 3',
                '4 5 6',
                '7 8 9'
            ]
            for (var y = 0; y < height; y++) {
                lakeArr[y] = [];
                inputs = input[y].split(' ');
                for (var x = 0; x < width; x++) {
                    lakeArr[y][x] = parseInt(inputs[x]);
                }
            }
        } else {
            var input = readline();
            var inputs = input.split(' ');
            var width = parseInt(inputs[0]);
            var height = parseInt(inputs[1]);
            for (var y = 0; y < height; y++) {
                lakeArr[y] = [];
                inputs = readline().split(' ');
                for (var x = 0; x < width; x++) {
                    lakeArr[y][x] = parseInt(inputs[x]);
                }
            }
        }
    };
    /**
     *
     * @returns {Array}
     */
    _this.getLakeArr = function () {
        return lakeArr;
    };
    /**
     *
     * @returns {Number}
     */
    _this.getHeight = function () {
        return lakeArr.length;
    };
    /**
     *
     */
    _this.getWidth = function () {
        return lakeArr[0].length;
    };
    /**
     *
     * @private
     */
    var __construct = function () {
        setLakeArr();
    };
    __construct();
};
/**
 *
 * @constructor
 */
var HungryDuck = function () {
    var _this = this;
    /**
     *
     * @type {Lake}
     */
    var LakeObj = new Lake();
    /**
     *
     * @type {{x: number, y: number}}
     */
    var positionArr = {
        x: 0,
        y: 0
    };
    /**
     *
     * @type {Array}
     */
    var pathArr = [];
    /**
     *
     * @type {Array}
     */
    var eatenFoodArr = [];
    /**
     *
     * @param x
     * @param y
     * @returns {*}
     */
    var getFoodOfPosition = function (x, y) {
        // if (isSetLakePosition(x, y)) {
        return LakeObj.getLakeArr()[y][x];
        // } else {
        //     return 0;
        // }
    };
    /**
     *
     */
    var eatFoodInPath = function () {
        for (var i in pathArr) {
            eatenFoodArr[i] = 0;
            for (var k in pathArr[i]) {
                eatenFoodArr[i] += getFoodOfPosition(pathArr[i][k].x, pathArr[i][k].y);
            }
        }
    };
    /**
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    var isSetLakePosition = function (x, y) {
        return LakeObj.getLakeArr()[y] != undefined && LakeObj.getLakeArr()[y][x] != undefined
    };
    /**
     *
     * @param x
     * @param y
     * @param path
     */
    var permutePath = function (x, y, path) {
        path.push({
            x: x,
            y: y
        });
        var isSetRight = isSetLakePosition(x + 1, y);
        var isSetDown = isSetLakePosition(x, y + 1);
        if (isSetRight) {
            permutePath(x + 1, y, path.slice());
        }
        if (isSetDown) {
            permutePath(x, y + 1, path.slice());
        }
        if (!isSetRight && !isSetDown) {
            pathArr.push(path);
        }
    };
    /**
     *
     */
    var findFood = function () {
        var a = [];
        permutePath(positionArr.x, positionArr.y, a);
        eatFoodInPath();
        print(Math.max.apply(null, eatenFoodArr));
    };
    /**
     *
     * @private
     */
    var __construct = function () {
        findFood();
    };
    __construct();
};
var a = new HungryDuck();