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

/*
 * @todo better event handling/ register
 * @todo better storage handling
 * @todo storage export/import
 * @todo % solved puzzle in language in language picker
 */

/* closed namespace */
jQuery.noConflict();
(function ($) {

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

    /* improve usability */
    function script() {

        /* add last report button */
        $('.puzzle-name').each(function () {
            var url = getLocalStorage(localStorageKey).report[$(this).html()];
            if (url != undefined) {
                $(this).parent().parent().find('.puzzle-buttons').append('<button type="button" class="puzzle-details-button">MY LAST REPORT</button>').on('click', function () {
                    window.location.href = url;
                });
            }
        });

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

    function canReportLinkBeStored() {
        if ($('.achievement-name').length > 0) {
            return true;
        }
        return false;
    }

    function storeReportLink() {
        var CodinGame = getLocalStorage(localStorageKey);
        $('.achievement-name').each(function () {
            var puzzle_name = $(this).html().split('% ');
            if (puzzle_name.length == 2) {
                CodinGame.report[puzzle_name[1]] = window.location.href;
                localStorage.setItem(localStorageKey, JSON.stringify(CodinGame));
                return false;
            }
        });
    }

    function getLocalStorage(key) {
        var CodinGame = localStorage.getItem(key);
        if (CodinGame == null) {
            CodinGame = {
                report: {}
            };
        }
        else {
            CodinGame = JSON.parse(CodinGame);
        }
        return CodinGame;
    }

})(jQuery);
#############################################




/* closed namespace */
jQuery.noConflict();
(function ($) {
    /**
     *
     * @type {{}|Storage}
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

    $(document).ready(function () {
        var Manager = new Collection.Manager();
        Manager.addFunc(function () {
            Collection.Feature.CollapseLevel.init();
        });
        Manager.addFunc(function () {
            test();
        });
        Manager.initAllFunc();
    });

    /**
     *
     * @type {{set, get, delete, clear, isSupported}}
     */
    Collection.Storage.Manager = (function () {
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

    function test() {
        alert(123);
    }

    Collection.Feature.CollapseLevel = (function () {

        function collapse() {

            var collapseSymbol = '-';
            var expandSymbol = '+';
            var levelProgessToHide = 100;

            /* foreach level */
            $('.level').each(function () {
                var $level = $(this);
                var $level_header = $level.find('.level-header');
                var $level_title = $level_header.find('.level-title');
                var $level_puzzles = $level.find('.level-puzzles');
                var level_progress = $level.find('.level-progress-value-value').html();

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

                /* collapse solved levels */
                if (level_progress == levelProgessToHide) {
                    $level_puzzles.hide();
                }
            });
        }

        return {
            init: function () {
                $(document).on('collapseLevel', function () {
                    collapse();
                });
            }
        }
    })();
})(jQuery);

#########################################################
$(document).ready(function () {
    var revProxyManager = new CodingGameStorage.RevProxyManager("{session_name()}");
    revProxyManager.addInitFuncs(
        function () {
            CodingGameStorage.RevProxyCartHandler.init();
        }
    );
    revProxyManager.addInitFuncs(
        function () {
            CodingGameStorage.RevProxyCountrySelectorHandler.init(('active' ? 1 : 0);
        }
    );
    revProxyManager.initAllFuncs();
});

###
var CodingGameStorage = CodingGameStorage || {}; //Namespace
/**
 *
 * @type {{init}}
 */
CodingGameStorage.RevProxyCartHandler = (function () {

    function getLiveCart() {
        storeForceUpdateCartOnPageInit(0);
        return CodingGameStorage.ReversProxyLib.getAjaxData("POST", "/comeppendorfeshopajax/getDynamicData/cart");
    }

    function updateLocal(cart) {
        if (cart) {
            if (cart.totalAmount > -1) {
                CodingGameStorage.ReversProxyLib.setStorageValueInHTML("direct", "span.amount", cart.totalAmount);
            }
            if (cart.template) {
                CodingGameStorage.ReversProxyLib.setStorageValueInHTML("replace", "span.cartplaceHolder", cart.template);
            }
        }
    }

    function storeCart(cart) {
        if (cart.template) {
            CodingGameStorage.ReversProxyLib.store('cart', cart);
        }
    }

    function storeForceUpdateCartOnPageInit(value) {
        CodingGameStorage.ReversProxyLib.store('forceUpdateCartOnPageInit', value);
    }

    return {
        init: function () {
            /**
             * trigger "cartUpdate bei jeder Änderung des Carts, falls dass nicht
             * möglich CodingGameStoraget, zum Beispiel per Link, dann siehe forceUpdateCartOnPageInit
             *
             * Event auslösen:
             * $(document).trigger('cartUpdate', cart);
             */
            $(document).on('cartUpdate', function (event, cart) {
                storeCart(cart);
            });
            /**
             * Änderungen des Carts per Link, hier für den Seitenneuaufbau beim Abschicken noch
             * den forceUpdateCartOnPageInit auslösen. Beim Seitenaufbau wird das Laden des Carts
             * erzwungen.
             *
             * Event auslösen:
             * $(document).trigger('forceUpdateCartOnPageInit', 1);
             */
            $(document).on('forceUpdateCartOnPageInit', function (event, value) {
                storeForceUpdateCartOnPageInit(value);
            });

            var forceUpdateCartOnPageInit = CodingGameStorage.ReversProxyLib.retrieve('forceUpdateCartOnPageInit') || 0;
            var cart = CodingGameStorage.ReversProxyLib.retrieve('cart');

            if (cart === null || cart == 'undefined' || forceUpdateCartOnPageInit > 0) {
                cart = getLiveCart();
                storeCart(cart);
            }
            if (cart) {
                updateLocal(cart);
            }
        }
    }
})();
###
CodingGameStorage.RevProxyCountrySelectorHandler = (function () {

    function getLiveCountrySelector() {
        return CodingGameStorage.ReversProxyLib.getAjaxData("POST", "/countryselector/getSeperated", "country", []);
    }

    function updateLocal(countrySelector) {
        if (countrySelector) {
            if (countrySelector) {
                CodingGameStorage.ReversProxyLib.setStorageValueInHTML("append", "body", countrySelector);
            }
        }
    }

    return {
        init: function (isNeeded) {
            $(document).on('countrySelected', function (event, value) {
                CodingGameStorage.ReversProxyLib.store('countrySelected', value);
            });
            if (isNeeded && !($.cookie("customerCountryId") || CodingGameStorage.ReversProxyLib.retrieve("countrySelected"))) {
                updateLocal(getLiveCountrySelector());
            }
        }
    }
})();
###
/**
 *
 * @param sessionName
 * @constructor
 */
CodingGameStorage.RevProxyManager = function (sessionName) {
    CodingGameStorage.ReversProxyLib.checkIfSessionExpired(sessionName);
    this.initFuncs = [];
}
CodingGameStorage.RevProxyManager.prototype = {
    addInitFuncs: function (initFunc) {
        this.initFuncs.push(initFunc);
    },
    initAllFuncs: function () {
        for (var i = 0; i < this.initFuncs.length; i++) {
            if (typeof this.initFuncs[i] === 'function') {
                this.initFuncs[i]();
            }
        }
    }
}
###
var CodingGameStorage = CodingGameStorage || {}; //Namespace
/**
 * Speicher per localStorage
 *
 * @type {{put, get, delete, clear, test}}
 */
CodingGameStorage.LocalStorageStrategy = (function () {

    function getUndef() {
        // return nothing, to get undefined ;)
    }

    return {
        put: function (key, val) {
            var retVal = localStorage.setItem(key, val);
        },
        get: function (key) {
            return localStorage.getItem(key);
        },
        delete: function (key) {
            localStorage.removeItem(key);
        },
        clear: function () {
            localStorage.clear();
        },
        test: function () {
            if (typeof (localStorage) !== getUndef() && localStorage !== null) {
                return true; // supported
            }
            return false; //not supported
        }
    }
})();
##

/**
 * Speicher per sessionCookie
 *
 * @type {{put, get, delete, clear, test}}
 */
CodingGameStorage.CookieStorageStrategy = (function () {

    function getUndef() {
        // return nothing, to get undefined ;)
    }

    return {
        put: function (key, val) {
            if (val !== null || val == getUndef()) {
                $.cookie(key, val);
            }
        },
        get: function (key) {
            return $.cookie(key);
        },
        delete: function (key) {
            $.cookie(key, null)
        },
        clear: function () {
            if (document.cookie) {
                $.each(document.cookie.split(/;/), function (i, v) {
                    var cookieParts = v.split(/=/);
                    if (cookieParts[0]) {
                        $.cookie(cookieParts[0], null);
                    }
                });
            }
        },
        test: function () {
            if (document.cookie) {
                return true; // supported
            }
            return false; //not supported
        }
    }
})();
/**
 * Library
 *
 * @type {{store, retrieve, delete, checkIfSessionExpired, setStorageValueInHTML, getAjaxData}}
 */
CodingGameStorage.ReversProxyLib = (function () {
    /**
     * private storage, Impl of LocalStorage or CookieStorage as Fallback
     * @type {{put, get, delete, clear, test}|*}
     */
    var storage = (CodingGameStorage.LocalStorageStrategy.test()) ? CodingGameStorage.LocalStorageStrategy : CodingGameStorage.CookieStorageStrategy;
    // public interface
    return {
        /**
         * put value by key into storage
         *
         * @param key
         * @param val
         */
        store: function (key, val) {
            storage.put(key, JSON.stringify(val));
        },
        /**
         * retrieve value from storage by key
         *
         * @param key
         * @returns {*}
         */
        retrieve: function (key) {
            var val = storage.get(key);
            if (val && val.length >= 0) {
                try {
                    return JSON.parse(val);
                } catch (e) {
                    // val war kein JSON
                }
                return val;
            }
            return null;
        },
        /**
         * delete element from storage by key
         *
         * @param key
         */
        delete: function (key) {
            storage.delete(key);
        },
        /**
         * Checks if Session expired
         *
         * @param cookieName
         */
        checkIfSessionExpired: function (cookieName) {
            var internCookieName = '_' + cookieName;
            var fromStorage = this.retrieve(internCookieName);
            var fromCookie = $.cookie(cookieName);
            if (this.retrieve(internCookieName) != $.cookie(cookieName)) {
                storage.clear();
                this.store(internCookieName, $.cookie(cookieName));
            }
        },
        /**
         * Sets the Values from the localStorage into the HTML
         *
         * @param type
         * @param place
         * @param data
         */
        setStorageValueInHTML: function (type, place, data) {
            if (type == "direct") {
                $(place).html(data);
            }
            else if (type == "replace") {
                $(place).replaceWith(data);
            }
            else if (type == "append") {
                $(place).append(data);
            }
        },
        /**
         * Ajax Wrapper
         *
         * @param type
         * @param url
         * @param data
         * @returns {*}
         */
        getAjaxData: function (type, url, data) {
            var returnValue = false;
            $.ajax({
                type: type,
                url: url,
                data: {data: data},
                async: false,
                success: function (val) {
                    returnValue = val;
                },
                error: function (xhr, textStatus, error) {
                    returnValue = [];
                    returnValue["error"] = textStatus + " : " + error;
                }
            })
            return returnValue;
        }
    }
})();
#################
var DataModel = {
    language: [
        '',
        '',
        '',
        'ada',
        'c',
        'java',
        'php'
    ],
    puzzle: [
        {},
        {},
        {},
        {
            name: 'lala',
            report: [
                {},
                {},
                {},
                {
                    language: this.language[10],
                    status: '0',
                    url: 'asdf'
                }
            ]
        }
    ],
    site: [
        {},
        {},
        {},
        {
            name: 'ganes',
            url: 'lala.la/lala'
        },
        {
            name: 'report',
            url: 'lala.la/lala'
        },
        {
            name: 'all',
            url: 'lala.la/lala'
        },
        {
            name: 'ide',
            url: 'lala.la/lala'
        },
    ]
};
//sub id nach site
//report select on change for report
//    headline for resolved in every language

//The
//difference
//is
//that
//functionOne
//is
//defined
//at
//run - time, whereas
//functionTwo
//is
//defined
//at
//parse - time
//for a script
//block.For
//example:
//
//    <
//script >
//    // Error
//functionOne();
//
//var functionOne = function () {
//};
//</
//script >
//
//< script >
//    // No error
//functionTwo();
//
//function functionTwo() {
//}
//</
//script >