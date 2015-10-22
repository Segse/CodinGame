// ==UserScript==
// @name        CodinGameUsabilityImprovementCollection
// @namespace   CodinGameUsabilityImprovementCollection
// @description usability improvement: collapse and expand level and scroll to unsolved level/puzzle
// @include     https://www.codingame.com/*
// @version     0.3
// @grant       none
// @author      Delgan
// @author      Segse
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

/* closed namespace */
jQuery.noConflict();
(function ($) {

    /* wait for document ready and elements to modify are loaded */
    $.holdReady(true);
    delay(isCodinGameLoaded, siteIsReady);
    $(document).ready(function () {
        $('.navigation-link[href="/games"]').on('click', function () {
            delay(isSitePuzzleLoaded, script);
        });
        if (window.location.pathname == '/games/puzzles') {
            delay(isSitePuzzleLoaded, script);
        }
    });

    /* delay controller */
    function delay(cond, func) {
        var refreshIntervalId = setInterval(function () {
            if (cond()) {
                clearInterval(refreshIntervalId);
                func();
            }
        }, 100);
    }

    function isCodinGameLoaded() {
        if (
            $('.navigation-link[href="/games"] .navigation-item-label').html().length > 0
            && $('.level').last().find('.puzzle-name').last().html().length > 0
        ) {
            return true;
        }
        return false;
    }

    function siteIsReady() {
        $.holdReady(false);
    }

    function isSitePuzzleLoaded() {
        if (
            window.location.pathname == '/games/puzzles'
            && $('.level').last().find('.puzzle-name').last().html().length > 0
        ) {
            return true;
        }
        return false;
    }

    /* improve usability */
    function script() {

        var quantityPuzzleToShow = 5;
        var collapseSymbol = '-';
        var expandSymbol = '+';
        var levelProgessToHide = 100;
        var contentWasScrolled = false;
        var slideSpeed;

        /* foreach level */
        $('.level').each(function () {
            var $level = $(this);
            var $level_header = $level.find('.level-header');
            var $level_title = $level_header.find('.level-title');
            var $level_puzzles = $level.find('.level-puzzles');
            var $puzzle = $level_puzzles.find('.puzzle');
            var puzzleHeight = $puzzle.outerHeight(true);
            var level_progress = $level.find('.level-progress-value-value').html();
            var levelScrollable = false;

            /* level collapse/expand button */
            $level_header.css('cursor', 'pointer');
            $level_title.html(collapseSymbol + ' ' + $level_title.html());
            $level_header.on('click', function () {
                if ($level_title.html().substr(0, collapseSymbol.length) == collapseSymbol) {
                    $level_title.html($level_title.html().replace(collapseSymbol, expandSymbol));
                } else {
                    $level_title.html($level_title.html().replace(expandSymbol, collapseSymbol));
                }
                $level_puzzles.slideToggle(slideSpeed);
            });

            /* level scrollable */
            if ($puzzle.length > quantityPuzzleToShow) {
                $level_puzzles.css({
                    'overflow-y': 'scroll',
                    'max-height': (puzzleHeight * quantityPuzzleToShow)
                });
                levelScrollable = true;
            }

            /* collapse solved levels */
            if (level_progress == levelProgessToHide) {
                $level_puzzles.hide();
            } else {

                /* scroll content to unsolved level */
                if (!contentWasScrolled) {
                    $('.content').animate({scrollTop: ($level.offset().top - $('.games_header').height())}, 'slow');
                    contentWasScrolled = true;
                }

                /* scroll level to unsolved puzzle */
                if (levelScrollable) {
                    $puzzle.each(function (i) {
                        var $puzzle = $(this);
                        var $puzzle_score = $puzzle.find('.puzzle-score');
                        var $puzzle_achievements = $puzzle.find('.puzzle-achievements');
                        if (
                            $puzzle_score.find('.puzzle-score-value').html() != $puzzle_score.find('.puzzle-score-total').html()
                            || $puzzle_achievements.find('.puzzle-score-value').html() != $puzzle_achievements.find('.puzzle-score-total').html()
                        ) {
                            $level_puzzles.animate({scrollTop: (puzzleHeight * i)}, slideSpeed);
                            return false;
                        }
                    });
                }
            }
        });
    }
})(jQuery);