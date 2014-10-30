jQuery(function ($) {

    var BRUSHED = window.BRUSHED || {};

    // --------------------------------------------------
    // Mobile Navigation
    // --------------------------------------------------
    var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

    BRUSHED.mobileNav = function () {
        var windowWidth = $(window).width();

        if (windowWidth <= 979) {
            if ($('#mobile-nav').length > 0) {
                mobileMenuClone.insertAfter('#menu');
                $('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
            }
        } else {
            $('#navigation-mobile').css('display', 'none');
            if ($('#mobile-nav').hasClass('open')) {
                $('#mobile-nav').removeClass('open');
            }
        }
    }

    BRUSHED.listenerMenu = function () {
        $('#mobile-nav').on('click', function (e) {
            $(this).toggleClass('open');

            if ($('#mobile-nav').hasClass('open')) {
                $('#navigation-mobile').slideDown(500, 'easeOutExpo');
            } else {
                $('#navigation-mobile').slideUp(500, 'easeOutExpo');
            }
            e.preventDefault();
        });

        $('#menu-nav-mobile a').on('click', function () {
            $('#mobile-nav').removeClass('open');
            $('#navigation-mobile').slideUp(350, 'easeOutExpo');
        });
    }

    // --------------------------------------------------
    // Navigation Fix
    // --------------------------------------------------

    BRUSHED.nav = function () {
        $('.sticky-nav').waypoint('sticky');
    }

    // --------------------------------------------------
    // Menu Highlight
    // --------------------------------------------------

    BRUSHED.menu = function () {
        $('#menu-nav, #menu-nav-mobile').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 750,
            scrollOffset: 30,
            scrollThreshold: 0.5,
            easing: 'easeOutExpo',
            filter: ':not(.external)'
        });
    }

    $(window).resize(function () {
        BRUSHED.mobileNav();
    });

    BRUSHED.nav();
    BRUSHED.mobileNav();
    BRUSHED.listenerMenu();
    BRUSHED.menu();
});
