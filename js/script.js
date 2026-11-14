(function ($) {
  "use strict";
  function showMessage($form, message, ok) {
    $form.find(".form-message").removeClass("success error").addClass(ok ? "success" : "error").text(message);
  }
  // Keep a jump to the tracker on this document from dropping query parameters
  // and inadvertently reloading the in-memory schedule.
  if (window.location.pathname.endsWith("/booking.html")) {
    $("a[href='booking.html#staff-tracking']").attr("href", "#staff-tracking");
  }
  function syncMobile() {
    $(".slicknav_btn").attr("aria-expanded", String($(".slicknav_btn").hasClass("slicknav_open")));
    $(".slicknav_item").each(function () {
      $(this).attr("aria-expanded", String($(this).closest(".slicknav_parent").hasClass("slicknav_open")));
    });
  }
  // Initialize the required plugin before adding controls to the desktop list.
  if ($.fn.slicknav) {
    $("#main-menu").slicknav({appendTo:"#mobile-menu", label:"Menu", closeOnClick:true,
      allowParentLinks:true, nestedParentLinks:false, removeClasses:true, duration:0,
      afterOpen:syncMobile, afterClose:syncMobile});
    document.documentElement.classList.add("slicknav-ready");
    $(".slicknav_btn").attr({"aria-label":"Toggle navigation", "aria-controls":"mobile-pages"});
    $(".slicknav_nav").attr({"aria-label":"Mobile pages", id:"mobile-pages"});
    $(".slicknav_item").each(function (i) {
      var $item=$(this), $parent=$item.closest(".slicknav_parent"), id="mobile-submenu-"+i;
      $parent.children("ul").attr("id",id);
      $item.attr({"aria-label":"Toggle "+$item.siblings("a").text()+" submenu", "aria-controls":id});
      $item.siblings("a").attr("role","menuitem");
    });
    syncMobile();
  }
  function closeSubmenu($item) {
    $item.removeClass("expanded").addClass("menu-dismissed").children("button").attr("aria-expanded", "false");
  }
  $(".main-nav .sub-menu").each(function (i) {
    var $list = $(this), $item = $list.parent(), name = $item.children("a").text();
    $list.attr("id", "submenu-"+i);
    $("<button>", {type:"button", "class":"submenu-toggle", text:"\u25be",
      "aria-label":"Toggle "+name+" submenu", "aria-expanded":"false", "aria-controls":"submenu-"+i})
      .insertBefore($list).on("click", function () {
        var open = !$item.hasClass("expanded");
        $item.toggleClass("expanded",open).toggleClass("menu-dismissed",!open);
        $(this).attr("aria-expanded",String(open));
      });
    $item.on("mouseenter focusin", function (e) {
      if (!$(e.target).hasClass("submenu-toggle")) {
        $item.removeClass("menu-dismissed").children("button").attr("aria-expanded","true");
      }
    }).on("mouseleave", function () {
      if (!$item[0].contains(document.activeElement)) closeSubmenu($item);
    }).on("focusout", function (e) {
      if (!$item[0].contains(e.relatedTarget)) closeSubmenu($item);
    });
  });
  $(document).on("keydown", function (e) {
    if (e.key !== "Escape") return;
    var $item = $(document.activeElement).closest(".main-nav>ul>li");
    if ($item.find(".sub-menu").length) { $item.children("button").trigger("focus"); closeSubmenu($item); }
    if ($.fn.slicknav && $(".slicknav_btn").attr("aria-expanded") === "true") {
      $("#main-menu").slicknav("close"); $(".slicknav_btn").trigger("focus");
    }
  }).on("click", function (e) {
    if (!$(e.target).closest(".main-nav").length) $(".main-nav>ul>li").each(function () { closeSubmenu($(this)); });
  });
  function localISO(date) {
    return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");
  }
  function updateMinimumDate() {
    var input = document.getElementById("bookingDate");
    if (input) input.min = localISO(new Date());
  }
  updateMinimumDate();
  var params = new URLSearchParams(window.location.search);
  function selectKnown(formId, name, value) {
    var input = document.querySelector(formId+' [name="'+name+'"]');
    if (input && Array.from(input.options).some(function (option) { return option.value === value; })) input.value=value;
  }
  selectKnown("#bookingForm","package",params.get("plan"));
  selectKnown("#bookingForm","service",params.get("service"));
  selectKnown("#registerForm","interest",params.get("interest"));
  function updateRecurrence() {
    var form = document.getElementById("bookingForm");
    if (!form) return;
    var repeat = form.elements.frequency.value !== "One-time";
    document.getElementById("occurrences-field").hidden=!repeat;
    form.elements.occurrences.disabled=!repeat;
    form.elements.occurrences.required=repeat;
  }
  $("#bookingForm [name=frequency]").on("change",updateRecurrence);
  updateRecurrence();
  function validate(form) {
    var fields=Array.from(form.querySelectorAll("input, select, textarea"));
    fields.forEach(function (field) {
      field.setCustomValidity(""); field.removeAttribute("aria-invalid");
      if (field.disabled) return;
      if (field.type !== "password" && field.tagName !== "SELECT" && !["checkbox","date","number"].includes(field.type)) field.value=field.value.trim();
      if (field.required && field.value.trim().length===0 && field.type!=="checkbox") field.setCustomValidity("Please complete this field.");
      if (field.value && field.minLength>0 && field.value.length<field.minLength) field.setCustomValidity("Please enter at least "+field.minLength+" characters.");
      if (field.maxLength>0 && field.value.length>field.maxLength) field.setCustomValidity("Please use no more than "+field.maxLength+" characters.");
      if (field.type==="tel" && field.value && (!/^[0-9 +()\-]{7,20}$/.test(field.value) || (field.value.match(/[0-9]/g)||[]).length<7)) field.setCustomValidity("Enter at least 7 digits using only digits, spaces, +, parentheses or hyphens (maximum 20 characters).");
    });
    if (form.id==="registerForm") {
      var password=form.elements.password, confirmation=form.elements.confirmPassword;
      if (password.value && (!/[A-Za-z]/.test(password.value)||!/[0-9]/.test(password.value))) password.setCustomValidity("Password must contain at least one letter and one number.");
      if (confirmation.value && password.value!==confirmation.value) confirmation.setCustomValidity("Passwords do not match.");
    }
    var firstInvalid=fields.find(function (field) { return !field.disabled && !field.checkValidity(); });
    fields.forEach(function (field) { if (!field.disabled && !field.validity.valid) field.setAttribute("aria-invalid","true"); });
    if (firstInvalid) {
      showMessage($(form),firstInvalid.validationMessage,false);
      firstInvalid.focus(); firstInvalid.reportValidity(); return false;
    }
    return true;
  }
  // In-memory state only: personal contact details never enter the tracker.
  var appointments=[], nextReference=1;
  var staff=["Unassigned","Hannah Lee - Director & Founder","Marcus Hill - Operations Supervisor","Chloe Walters - Customer Care Coordinator"];
  var statuses=["Planned","Assigned","Completed","Cancelled"];
  function appointmentDates(start,frequency,count) {
    var parts=start.split("-").map(Number), dates=[];
    for (var i=0;i<count;i++) {
      var date;
      if (frequency==="Monthly") {
        var month=new Date(parts[0],parts[1]-1+i,1);
        var lastDay=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
        date=new Date(month.getFullYear(),month.getMonth(),Math.min(parts[2],lastDay));
      } else date=new Date(parts[0],parts[1]-1,parts[2]+i*(frequency==="Weekly"?7:frequency==="Fortnightly"?14:0));
      dates.push(localISO(date));
    }
    return dates;
  }
  function renderSchedule() {
    var $rows=$("#schedule-rows").empty();
    appointments.forEach(function (appointment) {
      var $row=$("<tr>");
      $("<th>",{scope:"row",text:appointment.reference}).appendTo($row);
      $("<td>",{text:appointment.service+" / "+appointment.plan+" / "+appointment.frequency}).appendTo($row);
      $("<td>",{text:appointment.date+" "+appointment.time}).appendTo($row);
      [["staff",staff],["status",statuses]].forEach(function (pair) {
        var $cell=$("<td>"), $select=$("<select>",{"aria-label":(pair[0]==="staff"?"Responsible staff for ":"Status for ")+appointment.reference});
        pair[1].forEach(function (value) { $("<option>",{value:value,text:value}).appendTo($select); });
        $select.val(appointment[pair[0]]).on("change",function () {
          appointment[pair[0]]=this.value;
          if (pair[0]==="staff" && ["Planned","Assigned"].includes(appointment.status)) appointment.status=this.value==="Unassigned"?"Planned":"Assigned";
          if (appointment.status==="Assigned" && appointment.staff==="Unassigned") {
            appointment.status="Planned";
            $("#tracking-message").text("Choose a responsible staff member before marking the appointment as assigned.");
          } else $("#tracking-message").text(appointment.reference+" updated: "+appointment.status+"; "+appointment.staff+".");
          $row.find("select").eq(1).val(appointment.status);
        });
        $select.appendTo($cell); $cell.appendTo($row);
      });
      $row.appendTo($rows);
    });
    $("#schedule-empty").prop("hidden",appointments.length>0);
    $("#schedule-table").prop("hidden",appointments.length===0);
    $("#clear-schedule").prop("disabled",appointments.length===0);
  }
  $("#clear-schedule").on("click",function () { appointments=[]; renderSchedule(); $("#tracking-message").text("Demo schedule cleared."); });
  $("#bookingForm, #contactForm, #registerForm").each(function () {
    this.noValidate=true; $(this).find("button[type=submit]").prop("disabled",false);
  }).on("input change","input, select, textarea",function () {
    this.setCustomValidity(""); this.removeAttribute("aria-invalid");
    if (this.name==="password") { var confirm=this.form.elements.confirmPassword; confirm.setCustomValidity(""); confirm.removeAttribute("aria-invalid"); }
    $(this.form).find(".form-message").removeClass("success error").empty();
  }).on("submit",function (e) {
    e.preventDefault(); updateMinimumDate();
    if (!validate(this)) return;
    if (this.id==="bookingForm") {
      var data=Object.fromEntries(new FormData(this).entries());
      var count=data.frequency==="One-time"?1:Number(data.occurrences);
      appointmentDates(data.date,data.frequency,count).forEach(function (date) {
        appointments.push({reference:"DEMO-"+nextReference++,service:data.service,plan:data.package,frequency:data.frequency,date:date,time:data.time,staff:"Unassigned",status:"Planned"});
      });
      renderSchedule();
      showMessage($(this),count+" demo appointment"+(count>1?"s":"")+" added to the schedule below. No live booking was created.",true);
    } else if (this.id==="registerForm") showMessage($(this),"Your interest has been validated. Demo only: no registration, account or subscription was stored or sent.",true);
    else showMessage($(this),"Your enquiry has been validated. Demo only: no message was sent.",true);
    this.reset(); updateRecurrence(); $(this).find(".form-message").trigger("focus");
  });
})(jQuery);
