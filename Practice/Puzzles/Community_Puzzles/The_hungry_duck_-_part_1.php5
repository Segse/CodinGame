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
            $this->lakeArr[$y] = array_map('intval', explode(' ', fgets(STDIN)));
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

    private $position = [
        'x' => 0,
        'y' => 0
    ];
    /**
     * @var int
     */
    private $eatenFood = 0;

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
        $this->eatenFood = 0;
    }

    /**
     *
     */
    public function findFood()
    {
        $this->eat();
        $this->lookForFood();
        echo $this->eatenFood;
    }

    /**
     *
     */
    private function eat()
    {
        $this->eatenFood += $this->LakeObj->getLakeArr()[$this->position['y']][$this->position['x']];
    }

    /**
     *
     */
    private function lookForFood()
    {
        $right = $this->LakeObj->getLakeArr()[$this->position['y']][$this->position['x'] + 1];
        $down = $this->LakeObj->getLakeArr()[$this->position['y'] + 1][$this->position['x']];
        if ($right != null || $down != null) {
            if ($right == $down) {
                error_log(var_export($right, true));
                error_log(var_export($down, true));
            }
            if ($right < $down) {
                $this->position['y']++;
            } else {
                $this->position['x']++;
            }
            $this->eat();
            $this->lookForFood();
        }
    }
}

(new HungryDuckClass())->findFood();