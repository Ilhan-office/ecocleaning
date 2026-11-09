
(function($){
  function showMessage($form, message, ok){
    var $box = $form.find(".form-message");
    $box.removeClass("success error").addClass(ok ? "success" : "error").text(message);
  }

  $(".menu-toggle").on("click", function(){
    var $nav = $(".main-nav");
    $nav.toggleClass("open");
    $(this).attr("aria-expanded", $nav.hasClass("open") ? "true" : "false");
  });

  $(".main-nav a").on("click", function(){
    $(".main-nav").removeClass("open");
    $(".menu-toggle").attr("aria-expanded","false");
  });

  var dateInput = document.getElementById("bookingDate");
  if(dateInput){
    var today = new Date();
    var y = today.getFullYear();
    var m = String(today.getMonth()+1).padStart(2,"0");
    var d = String(today.getDate()).padStart(2,"0");
    dateInput.min = y+"-"+m+"-"+d;
  }

  $("#bookingForm").on("submit", function(e){
    e.preventDefault();
    if(!this.checkValidity()){
      this.reportValidity();
      showMessage($(this), "Please complete all required booking fields correctly.", false);
      return;
    }
    var data = Object.fromEntries(new FormData(this).entries());
    showMessage($(this), "Booking request received for "+data.service+" ("+data.frequency+"). Demo only — no live booking was created.", true);
    this.reset();
  });

  $("#contactForm").on("submit", function(e){
    e.preventDefault();
    if(!this.checkValidity()){
      this.reportValidity();
      showMessage($(this), "Please complete all required contact fields correctly.", false);
      return;
    }
    showMessage($(this), "Thank you. Your demo enquiry has been validated successfully.", true);
    this.reset();
  });

  $("#registerForm").on("submit", function(e){
    e.preventDefault();
    if(!this.checkValidity()){
      this.reportValidity();
      showMessage($(this), "Please complete all required registration fields correctly.", false);
      return;
    }
    var p = $("#password").val(), c = $("#confirmPassword").val();
    if(p !== c){
      showMessage($(this), "Passwords do not match.", false);
      $("#confirmPassword").trigger("focus");
      return;
    }
    if(!/[A-Za-z]/.test(p) || !/[0-9]/.test(p)){
      showMessage($(this), "Password must contain at least one letter and one number.", false);
      return;
    }
    showMessage($(this), "Registration data validated successfully. Demo account not stored.", true);
    this.reset();
  });
})(jQuery);
