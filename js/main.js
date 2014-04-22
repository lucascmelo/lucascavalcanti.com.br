var lang = {
	pt: {
		talk_to_me: 'fale comigo'
	},
	en: {
		talk_to_me: 'talk to me'
	}
}

var lucascavalcanti = {
	setup: function(){
		var __this = this;
		__this.translate();
		__this.Projects.setup();
		__this.Services.setup();
		__this.Nav.setup();

		$("#btn-menu").on('click', function(event) {
			event.preventDefault();
			var _this = $(this),
				box = _this.parent('div');

			if (_this.hasClass('active')) {
				box.animate({
					'padding-right': 0
				});

				$("#menu").animate({
					'width': 0
				});
			}else{
				box.animate({
					'padding-right': 136
				});

				$("#menu").animate({
					'width': 126
				});
			}
			_this.toggleClass('active');

		});


		$("#menu").on('click', '.btn-menu', function(event) {
			event.preventDefault();
			var btn = $("#menu .btn-menu");

			btn.stop().animate({
				'top': -80
			},'fast',function(){
				btn.fadeOut();
				$("#btn-menu").click();
			});
		});

		$(window).scroll(function(event) {
			var _this = $(this),
				y = _this.scrollTop();

			__this.Nav.menu(y,__this.Nav.menu_flag);
		});
	},
	Nav: {
		setup: function(){
			var __this = this;
			__this.scrollTo(__this.getHash());

			jQuery(".header-container").on("change", "#nav-main select", function(){
				var _this = jQuery(this),
					hash = _this.val(),
					res = hash.replace("#!/", "#");

					window.location.hash = hash;

				__this.scrollTo(res);
			});

			jQuery(document).on("click", "#menu a, .footer-container ol a", function(){
				var _this = jQuery(this),
					hash = _this.attr("href"),
					res = hash.replace("#!/", "#");

				__this.scrollTo(res);
			});

			jQuery("#home").on("click", "#btn-port", function(){
				__this.scrollTo('#portfolio');
			});

			jQuery(document).on("click", ".logotipo", function(){
				__this.scrollTo('#content');
			});
		},
		menu_flag: false,
		menu: function(y,flag){
			var __this = this;
			if ($("#btn-menu").hasClass('active')) {
				var btn = $("#menu .btn-menu");
				if (y>80 && !flag) {
					btn.stop().fadeIn(function() {
						btn.stop().animate({
							'top': 0
						},'fast');
					});

					__this.menu_flag = true;
				};

				if (y<80) {
					btn.stop().animate({
						'top': -80
					},'fast',function(){
						btn.fadeOut();
					});


					__this.menu_flag = false;
				};
			};
		},
		scrollTo: function(hash){
			if (hash=="" || hash=="#home"){
				hash = "#content";
				window.location.hash = "#!/home";
			}

			// if (hash=="#edr" || hash=="#dpvat") {
			// 	jQuery(hash).find('select option:first').attr('selected','');
			// 	jQuery(hash).find('.tabs li:first a').click();
			// 	jQuery.uniform.update('select');
			// };

			jQuery(document).stop().scrollTo(hash, 500, {offset: {top:0, left:0} });
			jQuery("#menu a").removeClass("active");

			active = hash.replace("#","#!/");

			if (hash=="#content") {
				active = "#!/home";
			};

			jQuery("#menu a[href='"+active+"']").addClass("active");
			// jQuery("#nav-main option[value='"+active+"']").attr('selected','');
		},
		getHash: function(){
			get = window.location.hash;
			get = get.replace("#!/", "#");
			return get;
		}
	},
	Projects: {
		setup: function () {
			var __this = this;
			__this.gallery();
			__this.close();
			var project_open = jQuery('#project-open');

			jQuery('.list-projects a').on('click', function(event) {
				event.preventDefault();
				var folder = jQuery(this).attr('data-folder');
				jQuery(this).parent().addClass('active');
				__this.load(project_open, folder);
			});

			jQuery("#nav-list-projects").on('click', 'div', function(event) {
				event.preventDefault();
				var _this = jQuery(this),
					item = jQuery('.list-projects li.active');
				if(jQuery("#portfolio").hasClass('list-open')){

				}else{
					if (_this.hasClass('left')) {
						__this.prevOpen(project_open, item);
					}else{
						__this.nextOpen(project_open, item);
					};
				}
			});
		},
		load: function(selector, folder){
			var __this = this;
			jQuery.ajax(folder)
				.done(function(code){
					selector.html(code);
					jQuery('#portfolio').attr('class','project-open');
					selector.fadeIn(function(){
						__this.gallery();
					});
				});
		},
		gallery: function(){
			jQuery('.gallery').galleria({
				height: 450,
				showInfo: false,
				lightbox: true,
				autoplay: 5000,
				transition: 'slide'
			});
		},
		close: function(){
			jQuery("#project-open").on('click', '.close', function(event) {
				jQuery('.list-projects li').removeClass('active');
				jQuery("#project-open").fadeOut(function() {
					jQuery('#portfolio').attr('class','list-open');
				});
			});
		},
		nextOpen: function(project_open, item){
			jQuery('.list-projects li').removeClass('active');

			var folder = item.next().find('a').attr('data-folder'),
				selector = project_open;

			item.next().addClass('active');

			this.load(project_open, folder);
		},
		prevOpen: function(project_open, item){
			jQuery('.list-projects li').removeClass('active');

			var folder = item.prev().find('a').attr('data-folder'),
				selector = project_open;

			item.prev().addClass('active');

			this.load(project_open, folder);
		}
	},
	Services: {
		setup: function(){
			var __this = this;

			__this.closeService();

			jQuery('#list-services a').on('click', function(event) {
				event.preventDefault();

				var _this = $(this),
					hash = _this.attr('href'),
					item = hash.replace("#!/servicos/#!/", "#");

					console.log(item)

				__this.openService(item);
			});
		},
		openService: function(item){
			$("#list-services").fadeOut(function() {
				$("#servicos").addClass('services-open');
				$(item).show()
				$("#services-open").fadeIn();
			});
		},
		closeService: function(){
			$("#services-open").on('click', '.close', function(event) {
				event.preventDefault();

				$("#services-open").fadeOut(function() {
					$("#servicos").removeClass('services-open');
					$("#list-services").fadeIn();
				});
			});
		}
	},
	translate: function () {
		var language = 'pt';
        jQuery.getJSON('http://freegeoip.net/json/', function(location) {
          if (location.country_code != 'BR') {
            language = 'en';
          }
        });

		jQuery('[data-translate]').each(function(index, el) {
			var item = jQuery(el),
				translate = item.attr('data-translate'),
				result = lang[language][translate];

			item.text(result);
		});
	}
}


jQuery(document).ready(function($) {
	lucascavalcanti.setup();
});