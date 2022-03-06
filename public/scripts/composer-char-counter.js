$(document).ready(function() {

  $("textarea").on('input',function() {

    const $counter = $(this).parent().siblings(".button-Counter").children(".counter");

    $counter.text(140 - $(this).val().length);
    if ($counter.text() < 0 || $counter.text() === '') {
      return $(".counter").addClass('charLimit');
    }
    $(".counter").removeClass('charLimit');
  });
});