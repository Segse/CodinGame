<?php
/* initial code */
///**
// * Auto-generated code below aims at helping you parse
// * the standard input according to the problem statement.
// **/
//fscanf(STDIN, "%d %d",
//    $W,
//    $H
//);
//for ($i = 0; $i < $H; $i++) {
//    $inputs = fgets(STDIN);
//    $inputs = explode(" ", $inputs);
//    for ($j = 0; $j < $W; $j++) {
//        $food = intval($inputs[$j]);
//    }
//}
// Write an action using echo(). DON'T FORGET THE TRAILING \n
// To debug (equivalent to var_dump): error_log(var_export($var, true));
//echo("answer\n");

#########################################################################################

/* solution */

/**
 * Class LakeClass
 */
class LakeClass
{
    /**
     * @var array
     */
    private $lakeArr = [];

    /**
     * LakeClass constructor.
     */
    public function __construct()
    {
        rewind(STDIN);
        $this->setLakeArr();
    }

    /**
     *
     */
    private function setLakeArr()
    {
        list($width, $height) = explode(' ', fgets(STDIN));
        for ($y = 0; $y < $height; $y++) {
            $this->lakeArr[$y] = array_map('intval', explode(' ', trim(fgets(STDIN))));
        }
    }

    /**
     * @return array
     */
    public function getLakeArr()
    {
        return $this->lakeArr;
    }

    /**
     * @return int
     */
    public function getHeight()
    {
        return count($this->lakeArr);
    }

    /**
     * @return int
     */
    public function getWidth()
    {
        return count($this->lakeArr[0]);
    }
}

/**
 * Class HungryDuckClass
 */
class HungryDuckClass
{
    /**
     * @var LakeClass
     */
    private $LakeObj;
    /**
     * @var array
     */
    private $positionArr = [
        'x' => 0,
        'y' => 0
    ];
    /**
     * @var array
     */
    private $pathArr = [];
    /**
     * @var array
     */
    private $eatenFoodArr = [];

    /**
     * HungryDuckClass constructor.
     */
    public function __construct()
    {
        $this->LakeObj = new LakeClass();
        $this->positionArr = [
            'x' => 0,
            'y' => 0
        ];
        $this->pathArr = [];
        $this->eatenFoodArr = [];
        $this->findFood();
    }

    /**
     *
     */
    private function findFood()
    {
        $this->permutePath($this->positionArr['x'], $this->positionArr['y'], []);
        $this->eatFoodInPath();
        echo max($this->eatenFoodArr) . "\n";
    }

    /**
     * @param $x
     * @param $y
     * @param array $path
     */
    private function permutePath($x, $y, array $path)
    {
        $path[] = ['x' => $x, 'y' => $y];
        $issetRight = $this->issetLakePosition($x + 1, $y);
        $issetDown = $this->issetLakePosition($x, $y + 1);
        if ($issetRight) {
            $this->permutePath($x + 1, $y, $path);
        }
        if ($issetDown) {
            $this->permutePath($x, $y + 1, $path);
        }
        if (!$issetRight && !$issetDown) {
            $this->pathArr[] = $path;
        }
    }

    /**
     *
     */
    private function eatFoodInPath()
    {
        foreach ($this->pathArr as $key => $pathArr) {
            $this->eatenFoodArr[$key] = 0;
            foreach ($pathArr as $positionArr) {
                $this->eatenFoodArr[$key] += $this->getFoodOfPosition($positionArr['x'], $positionArr['y']);
            }
        }
    }

    /**
     * @param $x
     * @param $y
     * @return int
     */
    private function getFoodOfPosition($x, $y)
    {
//        if ($this->issetLakePosition($x, $y)) {
        return $this->LakeObj->getLakeArr()[$y][$x];
//        } else {
//            return 0;
//        }
    }

    /**
     * @param $x
     * @param $y
     * @return bool
     */
    private function issetLakePosition($x, $y)
    {
        return isset($this->LakeObj->getLakeArr()[$y][$x]);
    }

    /**
     * @param $val
     */
    private function debug($val)
    {
        error_log(var_export($val, true));
    }
}

new HungryDuckClass();