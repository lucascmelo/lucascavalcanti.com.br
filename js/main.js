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