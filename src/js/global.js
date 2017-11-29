$(function () {
    if ($('#usa-map').length > 0)
        dashboardMapInit();
    if ($('#world-map').length > 0)
        settingsMapInit();
    if ($('#chart__average-devices').length > 0 || $('#chart__devices').length > 0)
        dashboardChartInit();
    //
    // modalCasesAdd();
    //
    dropdownShow();
    modalDisplay();
    if ($('.logs').length > 0) {
        $('.log-panel__log-container').niceScroll({
            cursorcolor: "rgba(255, 255, 255, 0.3)",
            cursorborder: "none",
            cursorwidth: "10px",
            cursorminheight: 100
        });
    }

    if ($('.window-body__scroll-container').length > 0) {
        $('.window-body__scroll-container').niceScroll({
            cursorcolor: "rgba(255, 255, 255, 0.3)",
            cursorborder: "none",
            cursorwidth: "10px",
            cursorminheight: 100
        });
    }
    // countryDropdownShow();
    // footerToTopAction();
    // tabsLogic();
    //
    // tooltipInit();
    // closingWidgets();
    // refreshWidgets();
    //
    // mergeBlockShow();
    // searchBlockShow();
    // rerunBlockShow();
    // deleteBlockShow();
    if ($('#datepicker').length > 0)
        datepickerShowing();
    if ($('.tab-button').length > 0)
        tabs();
    //
    // paginationLogic();
    // easyAutoCompletePhones();
    //
    // userMenuShow();
    // notificationsShow();
    // tabCheck();
    // slider();
    //
    // $('.country-dropdown__list').niceScroll({
    //     cursorcolor: "#e1e1e1",
    //     cursorwidth: "10px",
    //     cursorminheight: 100
    // });
    //
    $('.dropdown__list').niceScroll({
        cursorcolor: "#e1e1e1",
        cursorwidth: "10px",
        cursorminheight: 100
    });
    //
    // viewMorePanel();
    // imageGallery();
    //
    // menuShow();
    // moreMenuShow();
    if ($('#draggable').length > 0)
        drag();
    if ($('.window__container').length > 0)
        windowDisplay()
});

function drag() {
    $("#draggable").draggable({containment: "parent"}).resizable({containment: "parent"});
}

function tabs() {
    $('.tab-button').click(function () {
        let tab_id = $(this).attr('data-tab');

        $(this).siblings('.current').removeClass('current');
        $("#" + tab_id).siblings('.current').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
}

function dashboardMapInit() {
    $.getScript("http://jvectormap.com/js/jquery-jvectormap-us-aea.js", function () {
        $('#usa-map').vectorMap({
            map: 'us_aea',
            backgroundColor: 'rgba(6, 13, 16, .3)',
            regionStyle: {
                initial: {
                    fill: '#86857b',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                }
            }
        });
    });
}

function settingsMapInit() {
    $.getScript("http://jvectormap.com/js/jquery-jvectormap-world-mill.js", function () {
        $('#world-map').vectorMap({
            map: 'world_mill',
            backgroundColor: 'transparent',
            regionStyle: {
                initial: {
                    fill: '#86857b',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                }
            }
        });
    });
}

function dashboardChartInit() {

    var chartInit = function (id, type, data, options) {
        var ctx = $(id);
        var chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    };

    var barChartInit = function () {
        var ctx = $('#chart__devices');
        var chart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ["August", "September"],
                datasets: [
                    {
                        label: 'IoT',
                        data: [16, 19],
                        backgroundColor: [
                            '#f2af5f',
                            '#f8d5b0',
                        ],
                        borderWidth: 0
                    },
                    {
                        label: 'Computer',
                        data: [13, 15],
                        backgroundColor: [
                            '#f8d5b0',
                            '#f2af5f',
                        ],
                        borderWidth: 0
                    }

                ]
            },
            options: {
                legend: false,
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<ul>');
                    for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                        text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                        text.push('<p class="text">');
                        if (chart.data.labels[i]) {
                            text.push(chart.data.datasets[i].label);
                        }
                        text.push('</p></li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                layout: {
                    padding: {
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines : {
                            color: 'rgba(255,255,255,.3)'
                        },
                        ticks: {
                            min: 0,
                            step: 1,
                            stacked: true,
                        },
                    }],
                    yAxes: [{
                        gridLines : {
                            display : false,
                            color: 'rgba(255,255,255,.3)'
                        },
                    }],
                },
            }
        })
        $(`#chart-legend__devices`).html(chart.generateLegend());
    };

    var pieChartInit = function () {
        var ctx = $('#chart__attack-success');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Don't Success", "Success"],
                datasets: [{
                    data: [25, 75],
                    backgroundColor: [
                        '#f8d5b0',
                        '#f2af5f'
                    ],
                    borderColor: [
                        '#f8d5b0',
                        '#f2af5f'
                    ]

                }]
            },
            options: {
                legend: false,
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<ul>');
                    for (var i = 0; i < chart.data.datasets[0].data.length; i++) {
                        text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
                        text.push('<p class="text">');
                        if (chart.data.labels[i]) {
                            text.push(chart.data.labels[i]);
                        }
                        text.push('</p></li>');
                    }
                    text.push('</ul>');
                    return text.join("");
                },
                layout: {
                    padding: {
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12
                    }
                }
            }
        });

        $(`#chart-legend__attack-success`).html(chart.generateLegend());
    };

    let linesData = {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
            {
                data: [6, 4, 3, 5, 2, 3],
                borderColor: [
                    '#f2af5f',
                ],
                lineTension: 0,
                pointRadius: 0,
                fill: '#000'
            },
            {
                data: [7, 5, 3, 6, 4, 3],
                borderColor: [
                    '#73797b'
                ],
                lineTension: 0,
                pointRadius: 0,
                fill: '#000'
            }
        ]
    };

    let lineOptions = {
        legend: false,
        scales: {
            xAxes: [{
                gridLines : {
                    display : false
                },
                ticks: {
                    min: 0,
                    max: 8,
                    stepSize: 1
                }
            }],
            yAxes: [{
                ticks: {
                    min: 1,
                    max: 8,
                    stepSize: 1
                },
                gridLines : {
                    color: 'rgba(255,255,255,.3)'
                },
            }],
        },
    };

    let data = {
        labels: [1, 7, 3, 5, 2, 3],
        datasets: [{
            data: [3, 7, 3, 5, 2, 3],
            lineTension: 0,
            pointBackgroundColor: '#f2af5f',
            pointRadius: 5,
            backgroundColor: 'rgba(6, 13, 16, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.3)'
        }]
    };

    let options = {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false,
                beginAtZero: true
            }],
            yAxes: [{
                display: false,
                beginAtZero: true
            }]
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 0
            }
        }
    };

    chartInit('#chart__average-devices', 'line', data, options);
    chartInit('#chart__average-pings', 'line', data, options);
    chartInit('#chart__number-proxies', 'line', data, options);
    chartInit('#chart__number-attacks', 'line', data, options);
    pieChartInit();
    chartInit('#chart__methods-attack', 'line', linesData, lineOptions);
    barChartInit();
}

function dropdownShow() {
    $(document).ready(function () {
        $('.dropdown').each(function () {
            var $dropdown = $(this);

            $('.dropdown__selected', $dropdown).click(function (e) {
                e.preventDefault();
                $div = $(".dropdown__list", $dropdown);
                $div.toggle();
                $(".dropdown__list").not($div).hide();
                $('.dropdown__item', $dropdown).click(function () {
                    $(".dropdown__list").not($div).hide();
                    $('.dropdown__input', $dropdown).val($(this).text());
                });
                return false;
            });
        });
        $('html').click(function () {
            $(".dropdown__list").hide();
        });
    });
}

function modalCasesAdd() {
    $('.modal-cases__add').click(function () {
        var selected = $('.dropdown__input').val();
        $(".modal-cases__selected-values").append("<div class=\"modal-cases__selected\"><p>" + selected + "</p><button class=\"modal-cases__delete\"/></div>");
    });
}

function footerToTopAction() {
    $(document).ready(function () {
        $('.footer__to-top').click(function () {
            $('html, body').animate({scrollTop: '0px'}, 300);
        });
    });
}

function tabsLogic() {
    $('.case__content').eq(1).hide();

    $('.case__wrapper').each(function () {

        $(this).find('.case__tab').click(function () {

            var index = $(this).index();

            $('.case__tab').removeClass('active');
            $(this).addClass('active');

            $('.case__content').hide();
            $('.case__content').eq(index).show();
        });
    });
}

function closingWidgets() {
    $(document).ready(function () {
        $('.buttons__hide').each(function () {
            $(this).click(function () {
                $(this).toggleClass('deg0 deg180');
                $(this).parent().parent().parent().toggleClass("widget__before-hide");
                $(this).parent().parent().siblings('.widget__content').toggle(300);
            });
        });
    });
}

function refreshWidgets() {
    $(document).ready(function () {
        $('.buttons__refresh').each(function () {
            $(this).click(function () {
                $(this).toggleClass('deg0 deg180');
            });
        });
    });
}

function mergeBlockShow() {
    $(document).ready(function () {
        $('button.buttons__merge, a.merge').click(function () {
            $('.open-case__merge').toggle();
            $('.targets__merge').toggle();
        });
    });
}

function rerunBlockShow() {
    $(document).ready(function () {
        $('button.buttons__rerun, a.rerun').click(function () {
            $('.open-case__rerun').toggle();
            $('.target-item__checkbox').toggle();
            $('.target-item__graphic').toggle();
        });
    });
}

function deleteBlockShow() {
    $(document).ready(function () {
        $('button.buttons__header-delete, a.delete').click(function () {
            $('.targets__delete').toggle();
            $('.target-item__checkbox').toggle();
        });
    });
}

function datepickerShowing() {

    $('#datepicker').dateRangePicker({
        autoClose: false,
        format: 'DD.MM.YYYY',
        separator: ' - ',
        language: 'auto',
        startOfWeek: 'sunday',
        getValue: function () {
            return $(this).val();
        },
        setValue: function (s) {
            if (!$(this).attr('readonly') && !$(this).is(':disabled') && s != $(this).val()) {
                $(this).val(s);
                $('.datepicker__container').hide();
            }
        },
        startDate: false,
        endDate: false,
        time: {
            enabled: false
        },
        minDays: 0,
        maxDays: 0,
        showShortcuts: false,
        shortcuts:
            {
                //'prev-days': [1,3,5,7],
                //'next-days': [3,5,7],
                //'prev' : ['week','month','year'],
                //'next' : ['week','month','year']
            },
        customShortcuts: [],
        inline: true,
        container: '.modal-calendar__datepicker',
        alwaysOpen: true,
        singleDate: true,
        lookBehind: false,
        batchMode: false,
        duration: 200,
        stickyMonths: false,
        dayDivAttrs: [],
        dayTdAttrs: [],
        applyBtnClass: '',
        singleMonth: true,
        showTopbar: false,
        swapTime: false,
        selectForward: false,
        selectBackward: false,
        showWeekNumbers: false,
        getWeekNumber: function (date) //date will be the first day of a week
        {
            return moment(date).format('w');
        },
        monthSelect: false,
        yearSelect: false,
        extraClass: 'datepicker__calendar',
    });
}

function paginationLogic() {
    $('.pagination__page').each(function () {
        $(this).click(function () {
            $('.pagination__page').removeClass('active');
            $(this).addClass('active');
        })
    });

    $('.pagination__next').click(function () {
        var current = 0;
        $('.pagination__page').each(function (e) {
            if ($(this).hasClass('active')) {
                current = e;
            }
        });

        if (current !== $('.pagination__page').length - 1) {
            $('.pagination__page').removeClass('active');
            $('.pagination__page').eq(current + 1).addClass('active');
        } else $('.pagination__next').attr('disabled');
    })

    $('.pagination__prev').click(function () {
        var current = 0;
        $('.pagination__page').each(function (e) {
            if ($(this).hasClass('active')) {
                current = e;
            }
        });

        if (current !== 0) {
            $('.pagination__page').removeClass('active');
            $('.pagination__page').eq(current - 1).addClass('active');
        } else $('.pagination__prev').attr('disabled');
    })
}

function easyAutoCompletePhones() {
    var options = {
        url: "resources/phones.json",
        getValue: "phone",
        list: {
            match: {
                enabled: true
            }
        },
        cssClasses: 'phones-autocomplete'
    };

    $("#phones-list").easyAutocomplete(options);
}

function userMenuShow() {
    $(document).ready(function () {
        $('.header__user-menu > a').each(function () {
            $(this).click(function () {
                $('.user-menu').toggle();
                $(".notifications").hide();
            });
        });
        $('.container').click(function () {
            $(".user-menu").hide();

        });
    });
}

function notificationsShow() {
    $(document).ready(function () {
        $('button.bell').each(function () {
            $(this).click(function () {
                $('.notifications').toggle();
                $(".user-menu").hide();
            });
        });
        $('.container').click(function () {
            $(".notifications").hide();

        });
    });
}

function tabCheck() {

    $('[data-full-details-tab]').each(function () {

        $(this).click(function (e) {
            e.preventDefault();

            $('.open-target-full-details__tab').removeClass("button__active").addClass("button__inactive");
            $(this).removeClass("button__inactive").addClass("button__active");

            var id = $(this).attr('data-full-details-tab');
            $('.open-target-tab').hide();
            $(".slick-slider").slick("refresh");
            $('#' + id).fadeIn(500);
        })
    });
}

function gMapInit() {
    $(function () {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
    })
}

function slider() {
    const unslick = {
        breakpoint: 999999,
        settings: 'unslick'
    };

    $(document).ready(function () {
        $(window).resize(function () {
            if (window.innerWidth <= 1280) {
                $('.search-result-slider').slick('init');
                $('.full-details-tabs-slider').slick('init');
                $('.photos-slider').slick('init');
                $('.friends-slider').slick('init');
                $('.preferences-slider').slick('init');
                $('.history-photo-slider').slick('init');
                $('.widget-user-slider').slick('init');
            }
        });

        $('.search-result-slider').slick({
            slidesToShow: 7,
            slidesToScroll: 7,
            rows: 3,
            dots: true,
            arrows: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1367,
                    settings: {
                        rows: 3,
                        slidesToShow: 5,
                        slidesToScroll: 5
                    }
                },
                {
                    breakpoint: 1281,
                    settings: {
                        rows: 3,
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        rows: 3,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        rows: 6,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        rows: 6,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
        });

        $('.full-details-tabs-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }
                }
            ],
        });

        $('.photos-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        rows: 3,
                        dots: true,
                        arrows: false,
                        infinite: false,
                        variableWidth: true
                    }
                }
            ],
        });

        $('.friends-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        rows: 3,
                        dots: true,
                        arrows: false,
                        infinite: false,
                        variableWidth: true
                    }
                }
            ],
        });

        $('.preferences-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        rows: 1,
                        dots: true,
                        arrows: false,
                        infinite: false,
                        variableWidth: true
                    }
                }
            ],
        });

        $('.history-photo-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        rows: 1,
                        dots: true,
                        arrows: false,
                        infinite: false,
                        variableWidth: true
                    }
                }
            ],
        });

        $('.widget-user-slider').slick({
            responsive: [unslick,
                {
                    breakpoint: 1281,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        rows: 5,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        rows: 5,
                        dots: true,
                        arrows: false,
                        infinite: false
                    }
                }
            ],
        });
    });
}

function viewMorePanel() {
    $(document).ready(function () {
        $('.open-more-tab').each(function (e) {
            $(this).click(function () {
                let content = $('.widget-more').eq(e).siblings('.need-shortened').children().clone();
                $('.widget-more').eq(e).children('.widget-more__content').empty().append(content);
                $('.widget-more').eq(e).slideDown(300);
                imageGallery();
            })
        });
        $('.hide-more-tab').each(function (e) {
            $(this).click(function () {
                $('.widget-more').eq(e).slideUp(300);
            })
        });
    });
}

function imageGallery() {
    $(document).ready(function () {
        $('.gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                closeMarkup: '<button title="Close" class="mfp-close"></button>',
                tPrev: 'Previous',
                tNext: 'Next',
                callbacks: {
                    buildControls: function () {
                        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                    },
                    close: function () {
                        rotate_degrees = 0;
                    }
                },
                image: {
                    markup: '<div class="mfp-figure">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mfp-img"></div>' +
                    '<div class="mfp-bottom-bar">' +
                    '<button class="mfp-transform" onclick="rotateImg()"></button>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</div>',
                }
            });
        });
    });
}

let rotate_degrees = 0;

function rotateImg() {
    rotate_degrees += 90;
    $('.mfp-img').css({'transform': 'rotate(' + rotate_degrees + 'deg)', 'transition': 'all .3s ease'})
}

function countryDropdownShow() {
    $(document).ready(function () {
        $('.country-dropdown').each(function () {
            var $dropdown = $(this);

            $('.country-dropdown__selected', $dropdown).click(function (e) {
                e.preventDefault();
                $div = $(".country-dropdown__list", $dropdown);
                $div.width($('.country-dropdown').width() - 3);
                $div.toggle();
                $(".country-dropdown__list").not($div).hide();
                $('.country-dropdown__item', $dropdown).click(function () {
                    $(".country-dropdown__list").not($div).hide();
                    $('.country-dropdown__selected > img', $dropdown).attr('src', $(this).children('img').attr('src'));
                    $('.country-dropdown__input', $dropdown).val($(this).children('span').text());
                });
                return false;
            });
        });
        $('html').click(function () {
            $(".country-dropdown__list").hide();
        });
    });
}

function menuShow() {
    $('.buttons__menu, .mobile-menu__container').click(function () {
        $('.mobile-menu__content').addClass('open');
        $('.mobile-menu__container').show();
        $('.user-menu').show();
    });

    $('.mobile-menu__container').click(function () {
        $('.mobile-menu__content').removeClass('open');
        $('.mobile-menu__container').hide();
        $('.user-menu').hide();
    });
}

function moreMenuShow() {
    $(document).ready(function () {
        $('button.buttons__more-menu').each(function () {
            $(this).click(function () {
                $('.more-menu').toggle();
                $('.more-menu__container').toggle();
            });
        });
        $('.more-menu__container, .more-menu__item').click(function () {
            $(".more-menu").hide();
            $('.more-menu__container').hide();

        });
    });
}

function searchBlockShow() {
    $(document).ready(function () {
        $('button.buttons__search').click(function () {
            $('.targets__search').toggle();
            $('.case__search').toggle();
            $('.audit-trail__search').toggle();
            $('.target-alerts__search').toggle();
            $('.open-case__search').toggle();
        });
    });
}

function modalDisplay() {

    $('[data-popup]').each(function () {

        $(this).click(function (e) {
            e.preventDefault();
            var id = $(this).attr('data-popup');
            $('.popup').hide();
            $('#' + id).show();
            $('.popup__container').fadeIn(300);
        })
    });

    $('.popup__close').click(function () {
        $('.popup__container').fadeOut(300);
    });

    $('.popup__container').click(function (e) {
        if (!$(e.target).closest('.popup').length) {
            $('.popup__container').fadeOut();
        }
    });
}

function windowDisplay() {
    $('.window__minimaze').click(function () {
        $('.window__draggable').css('width', '50%').css('left', '5%').css('top', '40%');
        $('.window-body__scroll-container').css('max-height', '200px');
    });

    $('.window__maximaze').click(function () {
        $('.window__draggable').css('width', '100%').css('left', '0').css('top', '0');
        $('.window-body__scroll-container').css('max-height', '467px');
    });

    $('.window__close').click(function () {
        $('.window__draggable').fadeOut(300);
    });
}
