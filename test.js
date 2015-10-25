// ==UserScript==
// @name        CodinGameUsabilityImprovementCollection
// @namespace   CodinGameUsabilityImprovementCollection
// @description a collection of usability improvements for the CodinGame-Site
// @include     https://www.codingame.com/*
// @version     0.4
// @grant       none
// @author      Delgan
// @author      Segse
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

/*
 * @todo better event handling/ register
 * @todo better storage handling
 * @todo storage export/import
 * @todo % solved puzzle in language in language picker
 */

/* closed namespace */
jQuery.noConflict();
(function ($) {
    /**
     *
     * @type {*|{}}
     */
    var Collection = Collection || {};
    /**
     *
     * @constructor
     */
    Collection.Manager = function () {
        this.funcArr = [];
        this.addFunc = function (func) {
            this.funcArr.push(func);
        };
        this.initAllFunc = function () {
            for (var i = 0; i < this.funcArr.length; i++) {
                if (typeof this.funcArr[i] === 'function') {
                    this.funcArr[i]();
                }
            }
        }
    };

    /**
     *
     * @type {{set, get, delete, clear, isSupported}}
     */
    Collection.Storage = (function () {
        return {
            set: function (key, val) {
                localStorage.setItem(key, val);
            },
            get: function (key) {
                return localStorage.getItem(key);
            },
            delete: function (key) {
                localStorage.removeIteqm(key);
            },
            clear: function () {
                localStorage.clear();
            },
            isSupported: function () {
                if (typeof (localStorage) !== undefined && localStorage !== null) {
                    return true;
                }
                return false;
            }
        }
    })();

    /**
     * delay controller
     *
     * @param cond
     * @param func
     */
    Collection.delay = function delay(cond, func) {
        var refreshIntervalId = setInterval(function () {
            if (cond()) {
                clearInterval(refreshIntervalId);
                func();
            }
        }, 100);
    };

    Collection.CollapseLevel = (function () {

        function collapse() {

            var collapseSymbol = '-';
            var expandSymbol = '+';

            /* foreach level */
            $('.level').each(function () {
                var $level = $(this);
                var $level_header = $level.find('.level-header');
                var $level_title = $level_header.find('.level-title');
                var $level_puzzles = $level.find('.level-puzzles');

                /* level collapse/expand button */
                $level_header.css('cursor', 'pointer');
                $level_title.html(collapseSymbol + ' ' + $level_title.html());
                $level_header.on('click', function () {
                    if ($level_title.html().substr(0, collapseSymbol.length) == collapseSymbol) {
                        $level_title.html($level_title.html().replace(collapseSymbol, expandSymbol));
                    } else {
                        $level_title.html($level_title.html().replace(expandSymbol, collapseSymbol));
                    }
                    $level_puzzles.slideToggle();
                });
            });
        }

        function isPuzzleSiteLoaded() {
            if (
                window.location.pathname == '/games/puzzles'
                && $('.level').last().find('.puzzle-name').last().html().length > 0
            ) {
                return true;
            }
            return false;
        }

        return {
            init: function () {
                $(document).on('collapseLevel', function () {
                    Collection.delay(isPuzzleSiteLoaded, collapse);
                });
            }
        }
    })();


    $(document).ready(function () {
        var Manager = new Collection.Manager();
        Manager.addFunc(function () {
            Collection.CollapseLevel.init();
        });
        Manager.initAllFunc();

        $('.navigation-link[href="/games"]').on('click', function () {
            $(document).trigger('collapseLevel');
        });

    });


})(jQuery);


var localStorageKey = 'CodinGame';

/* wait for document ready and elements to modify are loaded */
$.holdReady(true);
if (window.location.pathname == '/games/puzzles') {
    delay(isCodinGameLoaded, siteIsReady);
} else {
    $.holdReady(false);
}
$(document).ready(function () {
    $('.navigation-link[href="/games"]').on('click', function () {
        delay(isSitePuzzleLoaded, script);
    });
    if (window.location.pathname == '/games/puzzles') {
        delay(isSitePuzzleLoaded, script);
    }
    if (window.location.pathname.split('/')[1] == 'report') {
        delay(canReportLinkBeStored, storeReportLink);
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