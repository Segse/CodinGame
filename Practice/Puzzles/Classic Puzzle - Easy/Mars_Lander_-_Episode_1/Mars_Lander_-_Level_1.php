<?
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

fscanf(STDIN, "%d",
    $surfaceN // the number of points used to draw the surface of Mars.
);
for ($i = 0; $i < $surfaceN; $i++) {
    fscanf(STDIN, "%d %d",
        $landX, // X coordinate of a surface point. (0 to 6999)
        $landY // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    );
}

// game loop
while (true) {
    fscanf(STDIN, "%d %d %d %d %d %d %d",
        $X,
        $Y,
        $hSpeed, // the horizontal speed (in m/s), can be negative.
        $vSpeed, // the vertical speed (in m/s), can be negative.
        $fuel, // the quantity of remaining fuel in liters.
        $rotate, // the rotation angle in degrees (-90 to 90).
        $power // the thrust power (0 to 4).
    );

    // Write an action using echo(). DON'T FORGET THE TRAILING \n
    // To debug (equivalent to var_dump): error_log(var_export($var, true));

//    echo("-20 3\n"); // rotate power. rotate is the desired rotation angle. power is the desired thrust power.

    if (abs($rotate) >= 15) {
        $r = 15;
    } else {
        $r = $rotate;
    }
    if ($rotate < 0) {
        $r += $r;
    } elseif ($rotate > 0) {
        $r -= $r;
    } else {
        $r = 0;
    }

    if ($vSpeed <= -40) {
        $p = $power + 1;
    } elseif ($vSpeed > -40) {
        $p = $power - 1;
    } else {
        $p = $power;
    }
    if ($p < 0) {
        $p = 0;
    } elseif ($p > 4) {
        $p = 4;
    }

    echo $r . ' ' . $p . "\n";
}