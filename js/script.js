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
  function labelOf(field) {
    var label=field.closest("label"), text=label&&label.childNodes[0]?label.childNodes[0].textContent:"";
    return (text||field.name||"this field").replace(/\(optional\)|\(demo\)/g,"").trim();
  }
  function validate(form) {
    var fields=Array.from(form.querySelectorAll("input, select, textarea")), today=localISO(new Date());
    fields.forEach(function (field) {
      field.setCustomValidity(""); field.removeAttribute("aria-invalid");
      if (field.disabled) return;
      var name=labelOf(field);
      if (!["checkbox","date","number"].includes(field.type) && field.tagName!=="SELECT") field.value=field.value.trim();
      if (field.type==="checkbox") { if (field.required && !field.checked) field.setCustomValidity("Tick the box to confirm you understand how this demonstration works."); return; }
      if (field.required && field.value.trim().length===0) { field.setCustomValidity(field.tagName==="SELECT"?"Choose an option for "+name+".":"Enter your "+name.toLowerCase()+" to continue."); return; }
      if (field.value && field.minLength>0 && field.value.length<field.minLength) field.setCustomValidity(name+" needs at least "+field.minLength+" characters; add "+(field.minLength-field.value.length)+" more.");
      if (field.maxLength>0 && field.value.length>field.maxLength) field.setCustomValidity(name+" can have at most "+field.maxLength+" characters; shorten it.");
      if (field.type==="email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value)) field.setCustomValidity("Enter a valid email address in the form name@example.com.");
      if (field.type==="tel" && field.value && (!/^[0-9 +()\-]{7,20}$/.test(field.value) || (field.value.match(/[0-9]/g)||[]).length<7)) field.setCustomValidity("Enter a telephone number with at least 7 digits, using only digits, spaces, +, parentheses or hyphens (e.g. +44 7700 900123).");
      if (field.type==="date" && field.value && field.value<today) field.setCustomValidity("That date has passed. Choose today or a future date.");
      if (field.type==="number" && field.value!=="" && (Number(field.value)<Number(field.min) || Number(field.value)>Number(field.max) || !Number.isInteger(Number(field.value)))) field.setCustomValidity("Enter a whole number of appointments between "+field.min+" and "+field.max+".");
    });
    var firstInvalid=fields.find(function (field) { return !field.disabled && !field.checkValidity(); });
    fields.forEach(function (field) { if (!field.disabled && !field.validity.valid) field.setAttribute("aria-invalid","true"); });
    if (firstInvalid) {
      showMessage($(form),firstInvalid.validationMessage,false);
      firstInvalid.focus(); return false;
    }
    return true;
  }
  // Records are kept in this browser's localStorage (no server), so they survive a reload.
  function load(key,fallback) { try { var v=JSON.parse(window.localStorage.getItem(key)); return v===null?fallback:v; } catch (e) { return fallback; } }
  function save(key,value) { try { window.localStorage.setItem(key,JSON.stringify(value)); return true; } catch (e) { return false; } }
  // Appointment records hold booking details only; contact details are not stored in the tracker.
  var appointments=load("ecoCleaningAppointments",[]), nextReference=Number(load("ecoCleaningNextRef",1))||1;
  function persist() { return save("ecoCleaningAppointments",appointments) && save("ecoCleaningNextRef",nextReference); }
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
          persist();
        });
        $select.appendTo($cell); $cell.appendTo($row);
      });
      $row.appendTo($rows);
    });
    $("#schedule-empty").prop("hidden",appointments.length>0);
    $("#schedule-table").prop("hidden",appointments.length===0);
    $("#clear-schedule").prop("disabled",appointments.length===0);
  }
  $("#clear-schedule").on("click",function () { appointments=[]; persist(); renderSchedule(); $("#tracking-message").text("Saved schedule cleared."); });
  renderSchedule();
  // Registration records (name, address, email, telephone, interest, comments).
  var signups=load("ecoCleaningSignups",[]);
  function renderSignups() {
    var $list=$("#signup-list").empty();
    signups.forEach(function (item) {
      $("<li>",{text:item.reference+": "+item.firstName+" "+item.lastName+" signed up for "+item.interest+" ("+item.recorded+")."}).appendTo($list);
    });
    $("#signup-record").prop("hidden",signups.length===0);
  }
  $("#clear-signups").on("click",function () { signups=[]; save("ecoCleaningSignups",signups); renderSignups(); $("#registerForm .form-message").text("Recorded signups cleared.").removeClass("error").addClass("success"); });
  renderSignups();
  $("#bookingForm, #contactForm, #registerForm").each(function () {
    this.noValidate=true; $(this).find("button[type=submit]").prop("disabled",false);
  }).on("input change","input, select, textarea",function () {
    this.setCustomValidity(""); this.removeAttribute("aria-invalid");
    $(this.form).find(".form-message").removeClass("success error").empty();
  }).on("submit",function (e) {
    e.preventDefault(); updateMinimumDate();
    if (!validate(this)) return;
    if (this.id==="bookingForm") {
      var data=Object.fromEntries(new FormData(this).entries());
      var count=data.frequency==="One-time"?1:Number(data.occurrences);
      appointmentDates(data.date,data.frequency,count).forEach(function (date) {
        appointments.push({reference:"EC-"+nextReference++,service:data.service,plan:data.package,frequency:data.frequency,date:date,time:data.time,staff:"Unassigned",status:"Planned"});
      });
      var kept=persist();
      renderSchedule();
      showMessage($(this),count+" appointment"+(count>1?"s":"")+" saved to the schedule below"+(kept?" and kept in this browser.":", but this browser blocked storage so they will be lost on reload.")+" No live booking or payment was made.",kept);
    } else if (this.id==="registerForm") {
      var info=Object.fromEntries(new FormData(this).entries()), ref="SIGNUP-"+(signups.length?Number(signups[signups.length-1].reference.split("-")[1])+1:1);
      signups.push({reference:ref,firstName:info.firstName,lastName:info.lastName,address:info.address,email:info.email,phone:info.phone,interest:info.interest,comments:info.comments||"",recorded:new Date().toLocaleString()});
      var stored=save("ecoCleaningSignups",signups);
      renderSignups();
      showMessage($(this),stored?"Thank you, "+info.firstName+". Your signup for "+info.interest+" has been recorded as "+ref+" in this browser. It is not sent to EcoCleaning.":"Your details are valid, but this browser blocked storage, so the signup could not be recorded.",stored);
    }
    else showMessage($(this),"Your enquiry has passed validation. Demo only: this form does not send messages, so please use another channel to contact EcoCleaning.",true);
    this.reset(); updateRecurrence(); $(this).find(".form-message").trigger("focus");
  });
})(jQuery);
