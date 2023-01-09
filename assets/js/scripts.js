/* 
 * Author: Bruno Santana
 * Author Email: bsantana.it@gmail.com
 * Version: 1
 * Updated: 01.04.2023 
 * 
*/


    




var App =(function (jQ, win, doc){
    "use strict";
    var App = {AppInfo: {name: "GENOX", package: "1.3.0", version: "1.3.0", author: "Softnio"} },
        components = {docReady: [], docReadyDefer: [], winLoad: [], winLoadDefer: []};

    jQ(doc).ready(docReady);
    jQ(win).on("load", winLoad);

    function docReady(stmt){
        stmt = (typeof stmt === typeof undefined) ? jQ : stmt;
        components.docReady.concat(components.docReadyDefer).forEach(function(component){ component(stmt); });
    }

    function winLoad(stmt){
        stmt = (typeof stmt === "object") ? jQ : stmt;
        components.winLoad.concat(components.winLoadDefer).forEach(function(component){ component(stmt); });
    }
	
    App.components   = components;
    App.docReady 	= docReady;
    App.winLoad    	= winLoad;

    return App;
}(jQuery, window, document));

App = function (App, $, window, document) {
    "use strict";
	// Defined Variables
    var $win		= $(window), 
		$doc		= $(document),
		$body		= $('body'),
		$header		= $('.header-main'),
		$nav_creative = $('.header-navbar-creative');
 
	var _navBreak	= 992,
		_mobBreak	= 768,
		_mobMenu	= 'menu-mobile',
		_has_fixed	= 'has-fixed',
		_is_shrink	= 'is-shrink',
        _currentURL	= window.location.href,
        _headerHT	= ($header.innerHeight() - 2),
        _splitURL	= _currentURL.split("#");
    
      
	// is exists @v1.0
	$.fn.exists = function () {
        return this.length > 0;
    };

    if($nav_creative.exists()){
        _navBreak	= 576;
    }
	
	// Return Check @v1.0
	App.Win = {};
	App.Win.height = $(window).height();
	App.Win.width = $(window).width();
	
	// getStatus @v1.1
	App.getStatus = {};
	App.getStatus.isRTL = ($body.hasClass('has-rtl') || $body.attr('dir') === 'rtl') ? true : false;
	App.getStatus.isTouch = (("ontouchstart" in document.documentElement)) ? true : false;
	App.getStatus.isMobile = (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i)) ? true : false;
	App.getStatus.asMobile = (App.Win.width < _mobBreak) ? true : false;
	
	// Update on Resize
	$win.on('resize',function(){
		App.Win.height = $(window).height();
		App.Win.width = $(window).width();
		App.getStatus.asMobile = (App.Win.width < _mobBreak) ? true : false;
    });
    
    //// Utilities ////
	///////////////////
	App.Util = {};
	// ClassInit !Util @v1.0
	App.Util.classInit = function() {
		var hastouch = function () {
				if (App.getStatus.isTouch===true) { 
					$body.addClass("has-touch"); 
				} else { 
					$body.addClass("no-touch"); 
				}
			},
			mobileview = function () {
				if (App.getStatus.asMobile===true) { 
					$body.addClass('as-mobile');
				} else {
					$body.removeClass('as-mobile');
				}
			},
            hasrtl = function () {
                if($body.attr('dir') === 'rtl') {
                    $body.addClass('has-rtl');
                    App.getStatus.isRTL = true;
                }
            };
		hastouch(); mobileview(); hasrtl();
		$(window).on('resize', mobileview);
	};
    App.components.docReady.push(App.Util.classInit);
	
    // PreLoader !Util @v1.0
    App.Util.preLoader = function () {
		var $preloader 	= $('.preloader'),
			$spinner 	= $('.spinner');
		
		if ($preloader.exists()) {
            $body.addClass("page-loaded");
            $spinner.addClass('load-done');
            $preloader.delay(600).fadeOut(300);
        }
	};
    App.components.winLoad.push(App.Util.preLoader);
    
    // Browser Check !Util @v1.0
    App.Util.browser = function() {
        var isChrome = (navigator.userAgent.indexOf("Chrome") !== -1) ? 1 : 0, 
        isFirefox = (navigator.userAgent.indexOf("Firefox") !== -1) ? 1 : 0,
        isSafari = (navigator.userAgent.indexOf("Safari") !== -1) ? true : false,
        isIE = ((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode)) ? 1 : 0,
        isEdge = !isIE && !!window.StyleMedia, 
        isOpera = (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) ? 1 : 0;
        
        if(isChrome) {
            $body.addClass('chrome');
        } else if (isFirefox){
            $body.addClass('firefox');
        } else if (isIE){
            $body.addClass('ie');
        } else if (isEdge){
            $body.addClass('edge');
        } else if (isOpera){
            $body.addClass('opera');
        } else if (isSafari){
            $body.addClass('safari');
        }
    };
	App.components.winLoad.push(App.Util.browser);
	
	// HeaderSticky !Util @v1.0
	App.Util.headerSticky = function () {
		var $is_sticky = $('.is-sticky');
        
        var stickyInit = {};
        
        stickyInit.hasFixed = function () {
            if ($is_sticky.exists() ) {
                var navm = $is_sticky.offset();
                $win.on('scroll', function(){
                    var _top = $win.scrollTop();
                    if(_top > navm.top){
                        if(!$is_sticky.hasClass(_has_fixed)) {
                            $is_sticky.addClass(_has_fixed);
                        }
                    }
                     else {
                       
                        if($is_sticky.hasClass(_has_fixed)) {
                            $is_sticky.removeClass(_has_fixed);
                        }
                    }
                });
            }
        };
        stickyInit.hasShrink = function () {
            if($is_sticky.hasClass(_is_shrink)) {
                _headerHT = ($header.height() + 16 - 2);
            }
        };
        stickyInit.hasFixed(); stickyInit.hasShrink();
        $win.on('resize', function() {
            _headerHT = ($is_sticky.hasClass(_is_shrink)) ? ($header.height() + 16 - 2) : ($header.innerHeight() - 2);
        });
        
	};
	App.components.docReady.push(App.Util.headerSticky);
	
	// imageBG !Util @v1.0
	App.Util.imageBG = function () {
		var $imagebg = $(".bg-image");
		
		if($imagebg.exists()) {
			$imagebg.each(function(){
				var $this = $(this), $that = $this.parent(), overlay = $this.data('overlay'), opacity = $this.data('opacity'), image = $this.children('img').attr('src');
				var overlay_type = (typeof overlay!=='undefined' && overlay) ? overlay : false;
				var opacity_value = (typeof opacity!=='undefined' && opacity) ? opacity : false;

				// If image found
				if (typeof image!=='undefined' && image !==''){
					if (!$that.hasClass('has-bg-image')) {
						$that.addClass('has-bg-image');
					}
					if ( overlay_type ) {
						if (!$this.hasClass('overlay-'+overlay_type)) {
							$this.addClass('overlay');
							$this.addClass('overlay-'+overlay_type);
						}
					} else {
						if (!$this.hasClass('overlay-fall')) {
							$this.addClass('overlay-fall');
						}
					}
					if ( opacity_value ) {
						$this.addClass('overlay-opacity-'+opacity_value);
					}
					$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
				}
			});
		}
	};
    App.components.docReady.push(App.Util.imageBG);
    
    App.Util.Ovm = function () {
		var $elm_ovm = $('.nk-ovm'), $elm_ovm_mask = $('.nk-ovm[class*=mask]');
		if($elm_ovm.exists()) {
			$elm_ovm.each(function(){
				if (!$(this).parent().hasClass('has-ovm')) { $(this).parent().addClass('has-ovm');}
			});
		}
        if($elm_ovm_mask.exists()) {
			$elm_ovm_mask.each(function(){
				if (!$(this).parent().hasClass('has-mask')) { $(this).parent().addClass('has-mask');}
			});
		}
	};
	
	App.components.docReady.push(App.Util.Ovm);
	
	// scrollAnimation !Util @v1.0
    App.Util.scrollAnimation = function () {
		var $animated = $('.animated');
		
        if($().waypoint && $animated.exists()){
			$animated.each(function(){
				var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
				aniWay.waypoint(function(){
					aniWay.addClass("animated "+typ).css("visibility", "visible");
					if(dur){ 
						aniWay.css('animation-duration', dur+'s'); 
					}
					if(dly){ 
						aniWay.css('animation-delay', dly+'s'); 
					}
				}, { offset: '93%' });
			});
        }
    };
	App.components.winLoad.push(App.Util.scrollAnimation);

	// Mainmenu/Nav @v1.0
	App.MainMenu = function() {
		var $navbar_toggle       = $('.navbar-toggle'),  
			$main_navbar         = $('.header-navbar'),
			$main_navbar_classic = $('.header-navbar-classic'),
			$menu_toggle         = $('.menu-toggle'),
			$menu_link           = $('.menu-link'),
			_main_menu           = '.header-menu',
			_menu_drop           = '.menu-drop',
			_open_nav            = 'open-nav',
			_nav_overlay         = '.header-navbar-overlay',
			_menu_toggle_alt     = 'menu-toggle-alt',
			_open_menu           = 'menu-shown';
		
		var MenuInit = {};
        
		// navToggle @v1.0
		MenuInit.Overlay = function () {
			if($main_navbar.exists() ){
                $main_navbar.append('<div class="header-navbar-overlay"></div>');
            }
        };
		MenuInit.navToggle = function () {
			if($navbar_toggle.exists() ){
				$navbar_toggle.on('click', function(e){
                    var $self = $(this), _self_toggle = ($self.data('menu-toggle'));
                        $self.toggleClass('active');
                    if($main_navbar_classic.exists()) {
                       $('#' + _self_toggle).slideToggle().toggleClass(_open_menu);
                    }else{
                       $('#' + _self_toggle).parent().toggleClass(_open_menu);
                    }
					e.preventDefault();
				});
			}
		};
		// navClose @v1.0
		MenuInit.navClose = function () {
            $(_nav_overlay).on('click', function(){
                $navbar_toggle.removeClass('');
                $main_navbar.removeClass(_open_menu);
            });
			$doc.on('click', 'body', function(e){
				if (!$menu_toggle.is(e.target) && $menu_toggle.has(e.target).length===0 && !$header.is(e.target) && $header.has(e.target).length===0 && $win.width() < _navBreak)  {
					$navbar_toggle.removeClass('active');
					$main_navbar_classic.find(_main_menu).slideUp();
                    $main_navbar.removeClass(_open_menu);
				}
			});
		};
        
		// menuToggle @v1.0
		MenuInit.menuToggle = function () {
			if ($menu_toggle.exists()) {
				$menu_toggle.on("click",function(e){
					var self = $(this), $parent = self.parent();
					if ($win.width() < _navBreak || self.hasClass(_menu_toggle_alt)) {
						$parent.children(_menu_drop).slideToggle(400);
						$parent.siblings().children(_menu_drop).slideUp(400);
						$parent.toggleClass(_open_nav);
						$parent.siblings().removeClass(_open_nav);
					}
					e.preventDefault();
				});
			}
		};
		// mobileNav @v1.0
		MenuInit.mobileNav = function() {

			if($win.width() < _navBreak){
				$main_navbar.delay(500).addClass(_mobMenu);
			}else{
				$main_navbar.delay(500).removeClass(_mobMenu);
                $navbar_toggle.removeClass('active');
				$main_navbar.removeClass(_open_menu);
			}
		};
		// currentPage @v1.0
		MenuInit.currentPage = function() {
            var url = window.location.href;
			if ($menu_link.exists()) {
				$menu_link.each(function() {
                    if (url === (this.href)) {
                        $(this).closest("li").addClass("active").parent().closest("li").addClass("active");
                    }
				});
            }
		};
		// Initialing
		MenuInit.Overlay(); MenuInit.navToggle(); MenuInit.navClose(); 
        MenuInit.menuToggle(); MenuInit.mobileNav(); MenuInit.currentPage();
        $win.on('resize', function(){
            MenuInit.mobileNav();
        });
	};
	App.components.docReady.push(App.MainMenu);

    // OnePageScroll @v1.0
    App.OnePageScroll = function() {
        var _scroll_tigger = '.menu-link';
        $('a'+ _scroll_tigger +'[href*="#"]:not([href="#"])').on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var toHash = this.hash, toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false;
                var $toHash = toHash.length ? $(toHash) : toHashN;
                if ($toHash.length) {
                    $('.navbar-toggle').removeClass('active');
                    $('.header-navbar').removeClass('menu-shown');
                    $('html, body').delay(150).animate({
                        scrollTop: ($toHash.offset().top - _headerHT)
                    }, 1000, "easeInOutExpo"); 
                    return false;
                }
            }
        });
    };
	App.components.docReady.push(App.OnePageScroll);

    //scrollAct @v1.0
    App.scrollAct = function() {
        $body.scrollspy({ 
            target: '#header-menu',
            offset: (_headerHT + 2),
        });
    };
    App.components.docReady.push(App.scrollAct);

	//// Plugins ////
	/////////////////
	App.Plugins = {};    

    // Validator Form @v1.0
	App.Plugins.validform = function() {
        'use strict';
        window.addEventListener('load', function() {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName('needs-validation');
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
      };
	App.components.docReady.push(App.Plugins.validform);


    // Filter @v1.0
    App.Plugins.filter = function () {

        var $filter_button = $('.filter-button');
        var $filter_1 = $('.f-1');
        var $filter_2 = $('.f-2');
        var $filter_3 = $('.f-3');
        
        $filter_button.on('click',function() { 
            if($(this).hasClass('gallery-button-active')){
                $(this).removeClass('gallery-button-active');
                $('.filter-button img').attr('src','images/adjustments-outlined-filters.svg');
                $('.filters').attr('hidden',true)
            }else{
                $(this).addClass('gallery-button-active');
                $('.filter-button img').attr('src','images/close-outlined-cross.svg');
                $('.filters').removeAttr('hidden');
            }
        });

        $filter_1.on('click',function() { 
            $('.filter-1').html($(this).html() + ' Selected')
        });
        $filter_2.on('click',function() { 
            $('.filter-2').html($(this).html() + ' Selected')
        });
        $filter_3.on('click',function() { 
            $('.filter-3').html($(this).html() + ' Selected')
        });
	};
    App.components.winLoad.push(App.Plugins.filter);

    // Mozaic @v1.0
    App.Plugins.filterz = function () {

        var $filter_project = $('.project');
        var $filter_tiger = $('.project-filter li');
        
        $filter_project.each(function(){
            var $self = $(this),
                f_layout =($self.data('layout')) ? $self.data('layout') : 'packed';
            $(this).filterizr({
                layout: f_layout,
            });
        })
        
        $filter_tiger.on('click',function() { 
            $filter_tiger.removeClass('active');
            $(this).addClass('active');
        });

        $.getJSON( "enterprises.json", function(data) {
            $.each(data.enterprises, function( k, v ) {

                if(k == 0){

                        '<div class="col-sm-6 col-lg-6 filtr-item" >\n' +
						'	<a href="texas-work-single.html">\n' +
						'		<div class="project-item">\n' +
						'			<div class="project-image">\n' +
						'				<img src="images/gallery/'+ v.image +'.jpg" srcset="images/'+ v.image +'@2x.jpg 2x"alt="">\n' +
						'			</div>\n' +
						'			<div class="project-no-over">\n' +
						'				<button type="button" class="btn btn-light">'+ v.type +'</button>\n' +
						'				<h4>'+ v.title +'</h4>\n' +
						'			</div>\n' +
						'			<div class="project-mask"></div>\n' +
						'			<div class="project-over">\n' +
						'				<div class="project-content">\n' +
						'					<button type="button" class="btn btn-light">'+ v.type +'</button>\n' +
						'					<h4>'+ v.title +'</h4>\n' +
						'					<div class="row">\n' +
						'						<div class="col-3">\n' +
						'							<p>Cidade</p>\n' +
						'							<p><b>'+ v.city +'</b></p>\n' +
						'						</div>\n' +
						'						<div class="col-6">\n' +
						'							<p>Bairro</p>\n' +
						'							<p><b>'+ v.neighborhood +'</b></p>\n' +
						'						</div>\n' +
						'					</div>\n' +
						'					<div class="row pt-4">\n' +
						'						<div class="col-12">\n' +
						'							<img class="float-left mr-2" src="images/bedroom.png">\n' +
						'							<p class="float-left">Apartamento com 3 dormitórios sendo 1 suite</p>\n' +
						'						</div>\n' +
						'					</div>\n' +
						'					<div class="row">\n' +
						'						<div class="col-12">\n' +
						'							<img class="float-left mr-2" src="images/video-security.png">\n' +
						'							<p class="float-left mr-2">Condomínio Fechado</p>\n' +
						'						</div>\n' +
						'					</div>\n' +
						'				</div>\n' +
						'			</div>\n' +
						'		</div>\n' +
						'	</a>\n' +
						'</div>\n'
                }else{
                    $( "#project1" ).append(  

                        '<div class="col-sm-6 col-lg-3 filtr-item" >\n' +
                        '    <div class="project-item">\n' +
                        '        <div class="project-image">\n' +
                        '            <img src="images/gallery/'+ v.image +'.jpg" srcset="images/'+ v.image +'@2x.jpg 2x" alt="">\n' +
                        '        </div>\n' +
                        '        <div class="project-mask"></div>\n' +
                        '        <div class="project-title">\n' +
                        '            <h4>'+ v.title +'</h4>\n' +
                        '        </div>\n' +
                        '    </div>\n' +
                        '</div>\n'
    
                     );
                }
                
                        
            });
        });
            


	};
    App.components.winLoad.push(App.Plugins.filterz);

    
}(App, jQuery, window, document);

