document.addEventListener("DOMContentLoaded", function () {
  var eventContents = [];
  var externalEventCheck = [];
  var userId = 2;

  Array.prototype.remove = function () {
    var what,
      a = arguments,
      L = a.length,
      ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  function checkIfOrder(n) {
    if (
      n.innerHTML.search("2") != -1 &&
      $(n).prev().hasClass("disabled") == false
    ) {
      alert("Please select the first event for this actvity");
    } else if (
      n.innerHTML.search("3") != -1 &&
      $(n).prev().hasClass("disabled") == false
    ) {
      alert("Please select the first event for this actvity");
    }
  }

  function getOccurrence(array, value) {
    return array.filter((v) => v === value).length;
  }

  function sendSchedule() {
    var settings = {
      url: "https://insertRealURLhere",
      method: "POST",
      timeout: 0,
      headers: {
        Accept: "application/json",
        "X-Api-Token": "b417e2d7547949638b52c208aa7291ed",
        "Content-Type": "application/json",
      },
      data: `{\"type\": \"GRD\", \"userId\": ${userId}, \"customData\": {\"wakeSubscribed\": ${wakeSubscribed}, \"wakeTime\": ${wakeTime}, \"breakfastSubscribed\": ${breakfastSubscribed}, \"breakfastTime\": ${breakfastTime}, \"school1Subscribed\": ${school1Subscribed}, \"school1Time\": ${school1Time}, \"school2Subscribed\": ${school2Subscribed}, \"school2Time\": ${school2Time}, \"school3Subscribed\": ${school3Subscribed}, \"school3Time\": ${school3Time}, \"lunchSubscribed\": ${lunchSubscribed}, \"lunchTime\": ${lunchTime}, \"snackSubscribed\": ${snackSubscribed}, \"snackTime\": ${snackTime}, \"exercise1Subscribed\": ${exercise1Subscribed}, \"exercise1Time\": ${exercise1Time}, \"exercise2Subscribed\": ${exercise2Subscribed}, \"exercise2Time\": ${exercise2Time}, \"exercise3Subscribed\": ${exercise3Subscribed}, \"exercise3Time\": ${exercise3Time}, \"choreSubscribed\": ${choreSubscribed}, \"choreTime\": ${choreTime}, \"talkSubscribed\": ${talkSubscribed}, \"talkTime\": ${talkTime}, \"dinnerSubscribed\": ${dinnerSubscribed}, \"dinnerTime\": ${dinnerTime}, \"open1Subscribed\": ${open1Subscribed}, \"open1Time\": ${open1Time}, \"open2Subscribed\": ${open2Subscribed}, \"open2Time\": ${open2Time}, \"open3Subscribed\": ${open3Subscribed}, \"open3Time\": ${open3Time}, \"bedtimePrepSubscribed\": ${bedtimePrepSubscribed}, \"bedtimePrepTime\": ${bedtimePrepTime}, \"bedtimeSubscribed\": ${bedtimeSubscribed}, \"bedtimeTime\": ${bedtimeTime}, \"custom1Subscribed\": ${custom1Subscribed}, \"custom1Time\": ${custom1Time}, \"custom2Subscribed\": ${custom2Subscribed}, \"custom2Time\": ${custom2Time}, \"custom3Subscribed\": ${custom3Subscribed}, \"custom3Time\": ${custom3Time}, \"nonESubscribed\": ${nonESubscribed}, \"nonETime\": ${nonETime}, \"eSubscribed\": ${eSubscribed}, \"eTime\": ${eTime}, \"morningWalkTime\": ${morningWalkTime}, \"morningWalkSubscribed\": ${morningWalkSubscribed}, \"custom1Title\": \"${custom1Title}\", \"custom2Title\": \"${custom2Title}\", \"custom3Title\": \"${custom3Title}\", \"custom1Desc\": \"${custom1Desc}\", \"custom2Desc\": \"${custom2Desc}\", \"custom3Desc\": \"${custom3Desc}\"}}`,
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  const removeEvent = (title, array) => {
    var removePosInExt = $.inArray(title, array);
    removePosInExt = removePosInExt + 1;
    $(".fc-event:nth-child(" + removePosInExt + ")")
      .css({
        "pointer-events": "all",
        color: "white",
        "background-color": "#5d58af",
        "border-color": "#95A5A6",
      })
      .removeClass("disabled");

    console.log(title);

    externalEventCheck.remove(title);

    // $('eventNames').prepend("<div id='div' class='fc-event'>" + title + "</div>")
  };

  $("div.fc-event").each(function () {
    eventContents.push($(this).text());
  });

  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendarInteraction.Draggable;

  var containerEl = document.getElementById("external-events");
  var calendarEl = document.getElementById("calendar");
  var checkbox = document.getElementById("drop-remove");

  // initialize the external events

  new Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });

  // initialize the calendar
  var calendar = new Calendar(calendarEl, {
    columnHeaderText: function (date) {
      if (date.getDay() === date.getDay()) {
        return "Your Child's Day!";
      } else {
        return mom.format("LLL");
      }
    },
    plugins: ["interaction", "dayGrid", "timeGrid"],

    defaultView: "timeGridDay",

    duration: "00:15:00",

    longPressDelay: 50,

    defaultTimedEventDuration: "00:30",

    slotDuration: "00:15",

    slotLabelInterval: "00:30",

    minTime: "06:00:00",

    allDaySlot: false,
    businessHours: false,
    eventOverlap: false,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    slotEventOverlap: false,

    header: {
      right: "none",
      center: "none",
      left: "none",
    },

    drop: function (info) {
      if ($.inArray(info.draggedEl.innerText, externalEventCheck) <= -1) {
        externalEventCheck.push(info.draggedEl.innerText);
        var posInExt = $.inArray(info.draggedEl.innerText, eventContents);
        posInExt = posInExt + 1;
        $(".fc-event:nth-child(" + posInExt + ")")
          .css({
            "pointer-events": "none",
            color: "#95A5A6",
            "background-color": "#BDC3C7",
            "border-color": "#95A5A6",
          })
          .addClass("disabled");
      }
    },

    eventClick: function (info) {
      console.log("clicked");
      removeEvent(info.event.title, eventContents);
      info.event.remove();

      //   $(".fc-event").each(function () {
      //     $(this).draggable();
      //   });
    },
  });
  //builds calendar
  calendar.render();

  //   $(".fc-event").each(function () {
  //     $(this).draggable();
  //   });

  $(".fc-time-grid-event").touchstart(function () {
    console.log("tapped");
    console.log($("fc-time-grid-event").innerText);
    removeEvent();
  });

  $(".fc-event").mousedown(function () {
    //Check if in order
    checkIfOrder(this);
  });

  $(".fc-event").touchstart(function () {
    var cln = this.cloneNode(true);
    $(cln).draggable();

    console.log(cln);
    $(".fc-event").touchmove(function () {
      console.log("touch move");
    });

    //Check if in order
    checkIfOrder(this);
  });

  function setAll(array1, array2) {
    if ($.inArray("Wake-Up Time", array1) >= 0) {
      wakeSubscribed = 1;
      wakeTime = array2[$.inArray("Wake-Up Time", array1)];

      console.log("Wake: " + wakeSubscribed, wakeTime);
    }

    if ($.inArray("Breakfast Time", array1) >= 0) {
      breakfastSubscribed = 1;
      breakfastTime = array2[$.inArray("Breakfast Time", array1)];

      console.log("Breakfast: " + breakfastSubscribed, breakfastTime);
    }

    if ($.inArray("Online School 1", array1) >= 0) {
      school1Subscribed = 1;
      school1Time = array2[$.inArray("Online School 1", array1)];

      console.log("Online School 1: " + school1Subscribed, school1Time);
    }

    if ($.inArray("Online School 2", array1) >= 0) {
      school2Subscribed = 1;
      school2Time = array2[$.inArray("Online School 2", array1)];

      console.log("Online School 2: " + school2Subscribed, school2Time);
    }

    if ($.inArray("Online School 3", array1) >= 0) {
      school3Subscribed = 1;
      school3Time = array2[$.inArray("Online School 3", array1)];

      console.log("Online School 3: " + school3Subscribed, school3Time);
    }

    if ($.inArray("Lunch Time", array1) >= 0) {
      lunchSubscribed = 1;
      lunchTime = array2[$.inArray("Lunch Time", array1)];

      console.log("Lunch Time: " + lunchSubscribed, lunchTime);
    }

    if ($.inArray("Snack Time", array1) >= 0) {
      snackSubscribed = 1;
      snackTime = array2[$.inArray("Snack Time", array1)];

      console.log("Snack Time: " + snackSubscribed, snackTime);
    }

    if ($.inArray("Exercise Time 1", array1) >= 0) {
      exercise1Subscribed = 1;
      exercise1Time = array2[$.inArray("Exercise Time 1", array1)];

      console.log("Exercise Time 1: " + exercise1Subscribed, exercise1Time);
    }

    if ($.inArray("Exercise Time 2", array1) >= 0) {
      exercise2Subscribed = 1;
      exercise2Time = array2[$.inArray("Exercise Time 2", array1)];

      console.log("Exercise Time 2: " + exercise2Subscribed, exercise2Time);
    }

    if ($.inArray("Exercise Time 3", array1) >= 0) {
      exercise3Subscribed = 1;
      exercise3Time = array2[$.inArray("Exercise Time 3", array1)];

      console.log("Exercise Time 3: " + exercise3Subscribed, exercise3Time);
    }

    if ($.inArray("Chore Time", array1) >= 0) {
      choreSubscribed = 1;
      choreTime = array2[$.inArray("Chore Time", array1)];

      console.log("Chore Time: " + choreSubscribed, choreTime);
    }

    if ($.inArray("Family Talk Time", array1) >= 0) {
      talkSubscribed = 1;
      talkTime = array2[$.inArray("Family Talk Time", array1)];

      console.log("Family Talk Time: " + talkSubscribed, talkTime);
    }

    if ($.inArray("Dinner Time", array1) >= 0) {
      dinnerSubscribed = 1;
      dinnerTime = array2[$.inArray("Dinner Time", array1)];

      console.log("Dinner Time: " + dinnerSubscribed, dinnerTime);
    }

    if ($.inArray("Open Time 1", array1) >= 0) {
      open1Subscribed = 1;
      open1Time = array2[$.inArray("Open Time 1", array1)];

      console.log("Open Time 1:" + open1Subscribed, open1Time);
    }

    if ($.inArray("Open Time 2", array1) >= 0) {
      open2Subscribed = 1;
      open2Time = array2[$.inArray("Open Time 2", array1)];

      console.log("Open Time 2:" + open2Subscribed, open2Time);
    }

    if ($.inArray("Open Time 3", array1) >= 0) {
      open3Subscribed = 1;
      open3Time = array2[$.inArray("Open Time 3", array1)];

      console.log("Open Time 3:" + open3Subscribed, open3Time);
    }

    if ($.inArray("Bedtime Prep", array1) >= 0) {
      bedtimePrepSubscribed = 1;
      bedtimePrepTime = array2[$.inArray("Bedtime Prep", array1)];

      console.log("Bedtime Prep: " + bedtimePrepSubscribed, bedtimePrepTime);
    }

    if ($.inArray("Bedtime", array1) >= 0) {
      bedtimeSubscribed = 1;
      bedtimeTime = array2[$.inArray("Bedtime", array1)];

      console.log("Bedtime: " + bedtimeSubscribed, bedtimeTime);
    }

    if ($.inArray("Custom 1", array1) >= 0) {
      custom1Subscribed = 1;
      custom1Time = array2[$.inArray("Custom 1", array1)];

      console.log("Custom 1: " + custom1Subscribed, custom1Time);
    }

    if ($.inArray("Custom 2", array1) >= 0) {
      custom2Subscribed = 1;
      custom2Time = array2[$.inArray("Custom 2", array1)];

      console.log("Custom 2: " + custom2Subscribed, custom2Time);
    }

    if ($.inArray("Custom 3", array1) >= 0) {
      custom3Subscribed = 1;
      custom3Time = array2[$.inArray("Custom 3", array1)];

      console.log("Custom 3: " + custom3Subscribed, custom3Time);
    }

    if ($.inArray("Non-E-Time", array1) >= 0) {
      nonESubscribed = 1;
      nonETime = array2[$.inArray("Non-E-Time", array1)];

      console.log("Non-E-Time: " + nonESubscribed, nonETime);
    }

    if ($.inArray("E-Time", array1) >= 0) {
      eSubscribed = 1;
      eTime = array2[$.inArray("E-Time", array1)];

      console.log("E-Time: " + eSubscribed, eTime);
    }

    if ($.inArray("Morning Walk", array1) >= 0) {
      morningWalkSubscribed = 1;
      morningWalkTime = array2[$.inArray("Morning Walk", array1)];

      console.log("Morning Walk: " + morningWalkSubscribed, morningWalkTime);
    }
  }
  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  //scheduler submit
  var button = document.getElementById("submit");
  var events = [];
  var startTime = [];

  //start time
  var wakeTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var breakfastTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var school1Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var school2Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var school3Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var lunchTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var snackTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var exercise1Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var exercise2Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var exercise3Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var choreTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var talkTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var dinnerTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var open1Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var open2Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var open3Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var bedtimePrepTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var bedtimeTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var custom1Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var custom2Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var custom3Time = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var nonETime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var eTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );
  var morningWalkTime = Date.parse(
    "01 Jan 1970 " + (convertTime12to24("12:01 AM") + ":00 GMT")
  );

  //subscribed
  var wakeSubscribed = 0;
  var breakfastSubscribed = 0;
  var school1Subscribed = 0;
  var school2Subscribed = 0;
  var school3Subscribed = 0;
  var lunchSubscribed = 0;
  var snackSubscribed = 0;
  var exercise1Subscribed = 0;
  var exercise2Subscribed = 0;
  var exercise3Subscribed = 0;
  var choreSubscribed = 0;
  var talkSubscribed = 0;
  var dinnerSubscribed = 0;
  var open1Subscribed = 0;
  var open2Subscribed = 0;
  var open3Subscribed = 0;
  var bedtimePrepSubscribed = 0;
  var bedtimeSubscribed = 0;
  var custom1Subscribed = 0;
  var custom2Subscribed = 0;
  var custom3Subscribed = 0;
  var nonESubscribed = 0;
  var eSubscribed = 0;
  var morningWalkSubscribed = 0;

  var custom1Title = "";
  var custom2Title = "";
  var custom3Title = "";

  var custom1Desc = "";
  var custom2Desc = "";
  var custom3Desc = "";

  //submit function
  button.onclick = function () {
    console.log("submit pressed");

    console.log("Variable Layout");
    console.log("Event: (subscribed) (time in Unix)");

    var countOcc = 0;
    var customFormHTML =
      '<div id="customForm" class="custom1"><h3>Custom Event 1</h3><div id="close" class="popupCloseButton">&times;</div><input type="text" id="eventTitle1" name="title" placeholder="Title"><br><br><input type="text" id="description1" name="description" placeholder="Description"><br><hr><br></div>';
    var buttonHTML =
      '<button id="submitCustomEvents" class="update1">Update Custom Event</button>';
    var custom2HTML =
      '<h3>Custom Event 2</h3><input type="text" id="eventTitle2" name="title" placeholder="Title"><br><br><input type="text" id="description2" name="description" placeholder="Description"><br><hr><br>';
    var custom3HTML =
      '<h3>Custom Event 3</h3><input type="text" id="eventTitle3" name="title" placeholder="Title"><br><br><input type="text" id="description3" name="description" placeholder="Description"><br><hr><br>';

    events = [];
    startTime = [];

    $(".fc-title").each(function () {
      events.push($(this).text());
    });

    $("div.fc-time").each(function () {
      var tempTime = convertTime12to24(
        $(this).attr("data-full").substring(0, 8).split(" ").join(" ")
      );
      var tempUnix = Date.parse("01 Jan 1970 " + tempTime + ":00 GMT");
      startTime.push(tempUnix);
    });

    for (let i = 1; i < 4; i++) {
      var tempIncludesBoolean;
      if (getOccurrence(events, "Custom " + i) > 0) {
        countOcc = countOcc + 1;
      }
    }

    setTimeout(function () {
      if (countOcc >= 1) {
        $(".hover_bkgr_fricc1").show();
        $("#customForm").replaceWith(customFormHTML);
        $(".custom1").show();
        if (countOcc >= 2) {
          $("#customForm").append(custom2HTML);
          if (countOcc >= 3) {
            $("#customForm").append(custom3HTML);
          }
        }
      }
      $("#customForm").append(buttonHTML);

      $("#close").click(function () {
        $("#hover_bkgr_fricc").hide();
        $("#customForm").hide();
      });

      $("#submitCustomEvents").click(function () {
        if (countOcc >= 1) {
          if (
            ($("#eventTitle1").val() == "") &
            ($("#description1").val() == "")
          ) {
            alert("Please fill out all fields below");
            return;
          }
          custom1Title = $("#eventTitle1").val();
          custom1Desc = $("#description1").val();
          console.log("Custom 1 Title: " + custom1Title);
          console.log("Custom 1 Desc: " + custom1Desc);
          if (countOcc >= 2) {
            if (
              ($("#eventTitle2").val() == "") &
              ($("#description2").val() == "")
            ) {
              alert("Please fill out all fields below");
              return;
            }
            custom2Title = $("#eventTitle2").val();
            custom2Desc = $("#description2").val();
            console.log("Custom 2 Title: " + custom2Title);
            console.log("Custom 2 Desc: " + custom2Desc);
            if (countOcc >= 3) {
              if (
                ($("#eventTitle3").val() == "") &
                ($("#description3").val() == "")
              ) {
                alert("Please fill out all fields below");
              }
              custom3Title = $("#eventTitle3").val();
              custom3Desc = $("#description3").val();
              console.log("Custom 3 Title: " + custom3Title);
              console.log("Custom 3 Desc: " + custom3Desc);
            }
          }
        }

        setTimeout(function () {
          if (countOcc >= 1) {
            setAll(events, startTime);
            sendSchedule();
          }
        }, 15);
      });
    }, 50);
    setTimeout(function () {
      if (countOcc == 0) {
        setAll(events, startTime);
        sendSchedule();
      }
    }, 15);
  };
});
