let swiper;

function initSwiper() {
    swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        centerInsufficientSlides: true,
        initialSlide: 0,  // Start with the first slide
        /*navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },*/
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1132: {
                slidesPerView: 1,
                centeredSlides: false,
            },
            1131: {
                slidesPerView: 1,
                centeredSlides: true,
            },
        },
    });

    // Manually set the first bullet as active after initialization
    setTimeout(() => {
        $('.swiper-pagination-bullet:first').addClass('swiper-pagination-bullet-active');
        $('.swiper-pagination-bullet:not(:first)').removeClass('swiper-pagination-bullet-active');
        setStudyTitle('btn_read_more_1');  // Ensure the content matches the first slide
    }, 0);

    // Add event listener for slide change
    swiper.on('slideChange', function () {
        let activeIndex = swiper.realIndex;
        let buttonClass;
        switch(activeIndex) {
            case 0:
                buttonClass = 'btn_read_more_1';
                break;
            case 1:
                buttonClass = 'btn_read_more_3';
                break;
            case 2:
                buttonClass = 'btn_read_more_4';
                break;
        }
        setStudyTitle(buttonClass);
    });
}

function destroySwiper() {
    if (swiper) {
        swiper.destroy();
        swiper = null;
    }
}

function onWindowResize() {
    destroySwiper();
    initSwiper();
}

/*// Reinitialize Swiper on window resize
$(window).on("resize", function() {
    onWindowResize();
});*/


let resizeTimeout;
$(window).on("resize", function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 250); // 250ms delay
});
