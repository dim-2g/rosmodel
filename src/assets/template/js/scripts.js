var header = $('.header');
var start_fixed = header.offset().top;

$(function() {
    $('[data-mask]').each(function() {
        input = $(this);
        mask = input.attr('data-mask');
        input.inputmask({"mask": mask});
    });
    $('.toggle-menu').on('click', function () {
        $('.mobile-menu').slideToggle();
        $(this).toggleClass('active');
    });
    $('.hide-form-reviews').on('click', function (e) {
        e.preventDefault();
        $('.review-form').slideToggle();
        $(this).toggleClass('close');
    });
    $('[data-toggle]').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle');
        console.log('toggle  '+selector);
        $(selector).slideToggle();
    });
    $('[data-toggle-active]').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        var selector = $(this).attr('data-toggle-active');
        $(selector).toggleClass('active');
    });

    $('body').on('click', '[data-goto]', function(e) {
        e.preventDefault();
        $('.mobile-menu').slideUp();
        var hx = 0;
            hx = -120;
        var selector = $(this).attr('data-goto');
        $('html, body').animate({ scrollTop: $(selector).offset().top + hx}, 1200);
    });
    $('[data-tab]').click(function(){
        var xtab = $('.xtab');
        $('[data-tab]').removeClass('active');
        $(this).addClass('active');
        var data_tab = $(this).attr('data-tab');
        xtab.removeClass('active');
        xtab.css({"opacity": 0.1});
        setTimeout(function() {
            xtab.css({"opacity": 1});
        }, 120);
        $(data_tab).addClass('active');
        return false;
    });

    $('.brief__box').click(function(){
       $(this).toggleClass('active');
    });
    $('body').on('click','.incrementer .minus',function(e){
        e.preventDefault();
        var input = $(this).parents(".incrementer").find(".js_zcount");
        var input_val = parseInt( input.val() );
        if(input_val > 1){
            input_val--;
            input.attr("data-current", input_val);
            input.val(input_val);
        }
        if (input.hasClass('count_live')) {
            input.trigger('change');
        }
    });
    $('body').on('click','.incrementer .plus', function(e){
        e.preventDefault();
        var input = $(this).parents(".incrementer").find(".js_zcount");
        var input_val = parseInt( input.val() );
        if(input_val < 999){
            input_val++;
            input.attr("data-current", input_val);
            input.val(input_val);
        }
        if (input.hasClass('count_live')) {
            input.trigger('change');
        }
    });
    $('body').on('change', '#msCart input[name="count"]', function(){
        var id = '#' + $( this ).closest( '.cart-item' ).attr( 'id' );
        var count = parseInt($( this ).val());
        var price = parseInt( $( id + ' .cart-item-cost' ).text().replace( /\s+/g, '' ) );
        $( id + ' .price-sum' ).html( miniShop2.Utils.formatPrice(count * price) );
    });
    initMainSlider('.main-slider');
    initProductSlider();
    initGalleryCardSlider();
    initMainProductSlider('.product-slider');
    initMainSpecificSlider('.specific-slider');
    initWorkshopGallerySlider('.workshop-gallery-slider');
    //initWorkshopMastersSlider();
    initSimilarProductSlider();
    initViewedProductSlider();
    initMainSecretSlider();

    initMainIssuesSlider();

    setFixedHeader();
    $(document).on('change','#brief-form_file',function(){
        var file=$(this).val();
        file=file.replace(/\\/g,"/").split('/').pop();
        $('#brief-form_filename').text('Выбран файл: '+file);
    });
});

initProductSlider = function() {
    $('.product-image__list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.product-previews',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: true,
                }
            }
        ]
    });
    var selector = '.product-image__list';
    setArrows(selector);
    $(selector).on('breakpoint', function(event, slick, direction){
        setArrows(selector);
    });
    $('.product-previews').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.product-image__list',
        dots: false,
        focusOnSelect: true,
        vertical: true,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    vertical: false
                }
            }
        ]
    });
};

initGalleryCardSlider = function() {
    $('.gallery-card__main-images').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.gallery-card__previews',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    dots: false,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    dots: true,
                }
            }
        ]
    });
    var selector = '.gallery-card__main-images';
    setArrows(selector);
    $(selector).on('breakpoint', function(event, slick, direction){
        setArrows(selector);
    });
    $('.gallery-card__previews').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.gallery-card__main-images',
        dots: false,
        focusOnSelect: true,
        arrows: true,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 750,
                settings: {
                    arrows: false,
                    vertical: false
                }
            }
        ]
    });
};

var slider_main = false;
initMainSlider  = function(selector) {
    console.log('start');
    if (!slider_main) {
        $(selector).slick({
            'autoplay': false,
            'arrows': false,
            'dots': true,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'appendDots': $('.slider__arrows'),
            'fade': false,
            'responsive': [
                {
                    breakpoint: 400,
                    settings: {
                        vertical: false,
                        dots: false,
                    }
                }
            ]
        });
        slider_main = true;
    }
};

var main_product_slider = false;
initMainProductSlider = function(selector) {
    if ($(window).width()<1050) {
        if (!main_product_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow:2
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });

            main_product_slider = true;
        }
    } else {
        if (main_product_slider) {
            $(selector).slick('unslick');
            main_product_slider = false;
        }
    }
};

var main_secret_slider = false;
initMainSecretSlider = function() {
    var selector = '.secret-slider';
    if ($(window).width()<1050) {
        if (!main_secret_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow:2
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });

            main_secret_slider = true;
        }
    } else {
        if (main_secret_slider) {
            $(selector).slick('unslick');
            main_secret_slider = false;
        }
    }
};

var similar_product_slider = false;
initSimilarProductSlider = function() {
    var selector = '.similar-product-slider';
    if ($(window).width()<1050) {
        if (!similar_product_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow:2
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });
            similar_product_slider = true;
        }
    } else {
        if (similar_product_slider) {
            $(selector).slick('unslick');
            similar_product_slider = false;
        }
    }
};
var viewed_product_slider = false;
initViewedProductSlider = function() {
    var selector = '.viewed-product-slider';
    if ($(window).width()<1050) {
        if (!viewed_product_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 3,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow:2
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });
            viewed_product_slider = true;
        }
    } else {
        if (viewed_product_slider) {
            $(selector).slick('unslick');
            viewed_product_slider = false;
        }
    }
};
setArrows = function(selector) {
    $(selector+" .slick-dots").wrap("<div class='slick-dots__wrapper'></div>");
    $(selector+" .slick-dots__wrapper").prepend('<span class="slick-dots-prev"></span>');
    $(selector+" .slick-dots__wrapper").append('<span class="slick-dots-next"></span>');
    $(selector+' .slick-dots-prev').on('click', function(){
        $(selector).slick('slickPrev');
    });
    $(selector+' .slick-dots-next').on('click', function(){
        $(selector).slick('slickNext');
    });
};
var workshop_gallery_slider = false;
initWorkshopGallerySlider = function(selector) {
        if (!workshop_gallery_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': true,
                'dots': false,
                'slidesToShow': 6,
                'slidesToScroll': 1,
                'initialSlide': 0,
                'infinite': true,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1270,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow:5
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow:4
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            vertical: false,
                            dots: false,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: true,
                            slidesToShow: 1
                        }
                    }
                ]
            });
            workshop_gallery_slider = true;
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                console.log('breakpoint');
                setArrows(selector);
            });
        }
};
var main_specific_slider = false;
initMainSpecificSlider = function(selector) {
    if ($(window).width()<1050) {
        if (!main_specific_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 1,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });
            main_specific_slider = true;
        }
    } else {
        if (main_specific_slider) {
            $(selector).slick('unslick');
            main_specific_slider = false;
        }
    }
};
var workshop_master_slider = false;
initWorkshopMastersSlider = function() {
    var selector = '.workshop-masters-slider';
    if ($(window).width()<1050) {
        if (!workshop_master_slider) {
            $(selector).slick({
                'autoplay': false,
                'arrows': false,
                'dots': true,
                'slidesToShow': 4,
                'slidesToScroll': 1,
                'initialSlide': 1,
                'infinite': false,
                'adaptiveHeight': true,
                'responsive': [
                    {
                        breakpoint: 1000,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow:3
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            vertical: false,
                            dots: true,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 750,
                        settings: {
                            arrows: false,
                            vertical: false,
                            dots: false,
                            slidesToShow: 1,
                            centerMode: true,
                        }
                    }
                ]
            });
            setArrows(selector);
            $(selector).on('breakpoint', function(event, slick, direction){
                setArrows(selector);
            });
            workshop_master_slider = true;
        }
    } else {
        if (workshop_master_slider) {
            $(selector).slick('unslick');
            workshop_master_slider = false;
        }
    }
};


var slider_issues = false;
initMainIssuesSlider  = function() {
    var selector = '.issues-slider';
    if (!slider_issues) {
        $(selector).slick({
            'autoplay': false,
            'arrows': true,
            'dots': false,
            'slidesToShow': 1,
            'slidesToScroll': 1,
            'fade': false,
            'responsive': [
                {
                    breakpoint: 750,
                    settings: {
                        vertical: false,
                        dots: false,
                    }
                }
            ]
        });
        setArrows(selector);
        $(selector).on('breakpoint', function(event, slick, direction){
            setArrows(selector);
        });
        slider_issues = true;
    }
};

var doit;
$(window).resize(function(){
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
});
function resizedw(){
    var width = $(window).width();
    initMainProductSlider('.product-slider');
    initMainSpecificSlider('.specific-slider');
    initWorkshopGallerySlider('.workshop-gallery-slider');
    //initWorkshopMastersSlider();
    initSimilarProductSlider();
    setFixedHeader();
}
setFixedHeader = function(){
    if ($(window).width()<0.768) {
        $('body').removeClass('fixed-header');
        return;
    }
    var scroll = $(window).scrollTop();

    if ($(window).width()>768) {
        if (scroll > start_fixed) {
            header.addClass('fixed-header');
        } else {
            header.removeClass('fixed-header');
        }
    } else {
        var topline = $('.topline-mobile');
        if (scroll > 1) {
            topline.addClass('fixed-header');
        } else {
            topline.removeClass('fixed-header');
        }
    }

};
$(document).scroll(function(){
    setFixedHeader();
});

$( document ).ready(function() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    if(getUrlParameter('go_to'))
    {
        var selector = getUrlParameter('go_to');
        $('html, body').animate({ scrollTop: $(selector).offset().top - 120}, 1200);
    }
    $('.owl-carousel').owlCarousel({
        margin:10,
        loop:true,
        autoWidth:true,
        items:3,
        dots:true,
    })
});
