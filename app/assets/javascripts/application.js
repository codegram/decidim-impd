// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .
  //= require decidim
//= require decidim-elections_census

function hideProposalsComponentsEleccions() {
  var pages = ['Consulta les candidatures', 'Consulta las candidaturas'];

  if ( window.location.href.match(/eleccions-consell-rector-impd-2021/) )  {
    $('.process-nav__more').hide();
    $(".process-nav__link").each( function(){
      var $el = $(this);
      var title = $el.html().trim();
      if ( pages.includes(title) ) {
        $el.hide();
      }
    });
  }
}

$(document).ready(function() {
  hideProposalsComponentsEleccions();

  $('input, select').on('keyup', function(e) {
      switch (e.which) {
          case 39:
              $(e.target).closest('.field').next().find('input, select').first().focus(); break;
          case 37:
              $(e.target).closest('.field').prev().find('input, select').first().focus(); break;
          case 40:
              $(e.target).closest('.field').next().find('input, select').first().focus(); break;
          case 38:
              $(e.target).closest('.field').prev().find('input, select').first().focus(); break;
      }
  });
});