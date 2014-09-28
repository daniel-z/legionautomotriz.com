$(document).ready(function(){
  $.getJSON('data/home-slider-data.json')
    .success(function(data) {
      var backgrounds = data;
      $.vegas('destroy')
      ('slideshow', {
        delay:3000,
        backgrounds: backgrounds
      })('overlay');
    });
});
