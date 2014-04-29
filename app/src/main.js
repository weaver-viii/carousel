/*globals define*/
define(function(require, exports, module) {
    'use strict';
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var CarouselView = require('./views/CarouselView');
    var ScrollItemView = require('./views/ScrollItemView');
    var Utility = require('famous/utilities/Utility');

    var mainContext = Engine.createContext();
    var scrollItemViews = [];

    var createScrollItemArray = function (num, size) {
        for (var i = 0; i < num; i += 1) {
            var color = "hsl(" + (i * 360 / 10) + ", 100%, 50%)";
            var scrollItemView = new ScrollItemView(color, size);

            scrollItemViews.push(scrollItemView);
            carousel.subscribe(scrollItemView);
        }
    };

    var carousel = new CarouselView({ 
        direction: Utility.Direction.X,
        startScale: 1,
        endScale: 3,
        startFade: 0.3,
        endFade: 1
    });
    
    createScrollItemArray(100, 50);
    carousel.sequenceFrom(scrollItemViews);

    // adding a visual on screen for midpoint
    var midHSurface = new Surface({
        size : [5, window.innerHeight],
        properties: {
            backgroundColor: 'red'
        }
    });

    var midHMod = new StateModifier({
        origin: [0.5, 0]
    });

    window.carousel = carousel;
    var carouselModifier = new StateModifier({
        origin: [0, 0.5]
    });

    mainContext.setPerspective(500);
    mainContext.add(carouselModifier).add(carousel);
    mainContext.add(midHMod).add(midHSurface);
});