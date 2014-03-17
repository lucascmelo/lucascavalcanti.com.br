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
		__this.translate()
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