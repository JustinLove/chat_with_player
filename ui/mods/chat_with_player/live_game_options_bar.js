// From PA-Chat
if (!handlers.alertSocial) {
  handlers.alertSocial = function() {
    console.log("social alert");
    if (!model.uberBar()) {
      $('.div_uberbar_toggle_cont:first').addClass("social-activity");
    }
  };

  model.uberBar.subscribe(function(v) {
    if (v) {
      $('.div_uberbar_toggle_cont:first').removeClass("social-activity");
    }
  });
}
