(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm').css('top', '0px');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm').css('top', '-100px');
        }
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

    

    // Additional carousel integration (from provided code)
    $(".owl-carousel").owlCarousel({
        items: 3,
        margin: 30,
        loop: true,
        dots: true,
        autoplay: false // You can change this if needed
        // nav: true,
        // navText: ["<i class='fas fa-long-arrow-alt-left'></i>","<i class='fas fa-long-arrow-alt-right'></i>"]
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Contact Form AJAX
    $('#contactForm').on('submit', function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            project: $('#project').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        $.ajax({
            type: 'POST',
            url: 'php/contact.php', // PHP script to process form
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (response) {
                $('#responseMessage').html('<p class="alert alert-success">' + response.message + '</p>');
            },
            error: function (response) {
                $('#responseMessage').html('<p class="alert alert-danger">Something went wrong, please try again.</p>');
            }
        });
    });

})(jQuery);
