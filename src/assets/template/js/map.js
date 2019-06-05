    function showYaMaps() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        document.getElementById("YaMaps").appendChild(script);

        setTimeout(function() {
            ymaps.ready(init);
            function init() {
                createMap({ center:mapData.center, zoom:mapData.zoom, controls:[], scroll: false }, mapData);
                if (location.pathname == "/kontaktyi"){
                    createMap3({ center:mapData3.center, zoom:mapData3.zoom, controls:[], scroll: true }, mapData3);
                }
            }
        }, 2000);
    }
    
    if (location.pathname == "/"){
            let YaMapsShown = false;
            let mapSelector = document.querySelector('.partners');
            let sizeMap = mapSelector.offsetTop;
            
            window.onscroll = function() {
                if (!YaMapsShown) {
                    if (window.pageYOffset > sizeMap - 500) {
                        showYaMaps();
                        YaMapsShown = true;
                    }
                }
            };
    } else {
        showYaMaps();
    }

    


hideMapOnMobile = function() {
    if ($(window).width()<750) {
        setTimeout(function() {
            $('#map.hidden').slideUp();
        }, 3000);
        setTimeout(function() {
            $('#map2.hidden').slideUp();
        }, 3000);
        setTimeout(function() {
            $('#map3.hidden').slideUp();
        }, 3000);
    }
};
    function createMap(state, mapData) {

        map = new ymaps.Map('map', state);

        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover__grid">' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
            '</div></div>' +
            '</div>', {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                 },
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                 },

                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                    if(!this._isElement(this._$element)) {
                        return;
                     }
                    this.applyElementOffset();

                    this.events.fire('shapechange');
                 },
                applyElementOffset: function () {
                    this._$element.css({
                        left: 0,
                        top: -23
                     });
                 },
                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                 },
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                     }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                 },
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                 }
             }),
            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover__address">$[properties.balloonHeader]</div>'
            ),
        placemark = new ymaps.Placemark(
            mapData.coords, {
                balloonHeader: mapData.header
             }, {
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,
                iconLayout: 'default#image',
                iconImageHref: '/assets/template/images/map-marker.png',
                iconImageSize: [30, 31],
                iconImageOffset: [-21, -25],
                pane: 'balloon'
             });
        map.geoObjects.add(placemark);
        placemark.balloon.open();
        map.behaviors.disable('scrollZoom');
}
    function createMap3(state, mapData) {
        map = new ymaps.Map('map3', state);
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            '<a class="close" href="#">&times;</a>' +
            '<div class="arrow"></div>' +
            '<div class="popover__grid">' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
            '</div></div>' +
            '</div>', {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._$element = $('.popover', this.getParentElement());
                    this.applyElementOffset();
                    this._$element.find('.close')
                        .on('click', $.proxy(this.onCloseClick, this));
                 },
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                 },
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                    if(!this._isElement(this._$element)) {
                        return;
                     }
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                 },
                applyElementOffset: function () {
                    this._$element.css({
                        left: 0,
                        top: -23
                     });
                 },
                onCloseClick: function (e) {
                    e.preventDefault();
                    this.events.fire('userclose');
                 },
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                     }
                    var position = this._$element.position();
                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                 },
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                 }
             }),
            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover__address">$[properties.balloonHeader]</div>'
            ),
        placemark = new ymaps.Placemark(
            mapData.coords, {
                balloonHeader: mapData.header
             }, {
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,
                iconLayout: 'default#image',
                iconImageHref: '/assets/template/images/map-marker.png',
                iconImageSize: [30, 31],
                iconImageOffset: [-21, -25],
                pane: 'balloon'
             });
        map.geoObjects.add(placemark);
        placemark.balloon.open();
        map.behaviors.disable('scrollZoom');
}
