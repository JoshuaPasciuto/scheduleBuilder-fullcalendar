document.addEventListener('DOMContentLoaded', function () {

    var eventContents = [];

    $('div.fc-event').each(function () {
        eventContents.push($(this).text());
    });


    var Calendar = FullCalendar.Calendar;
    var Draggable = FullCalendarInteraction.Draggable;

    var containerEl = document.getElementById('external-events');
    var calendarEl = document.getElementById('calendar');
    var checkbox = document.getElementById('drop-remove');

    // initialize the external events

    $('#external-events').draggable();

    // new Draggable(containerEl, {

    //     itemSelector: '.fc-event',
    //     eventData: function (eventEl) {
    //         return {
    //             title: eventEl.innerText
    //         };
    //     }
    // });

    // initialize the calendar

    var calendar = new Calendar(calendarEl, {
        columnHeaderText: function (date) {
            if (date.getDay() === date.getDay()) {
                return 'Your Childs Day!';
            } else {
                return mom.format('LLL');
            }
        },

        plugins: ['interaction', 'dayGrid', 'timeGrid'],

        defaultView: 'timeGridDay',

        duration: '00:15:00',

        slotDuration: '00:15',

        slotLabelInterval: '00:30',

        minTime: '06:00:00)',

        longPressDelay: 250,
        selectLongPressDelay: 250,
        eventLongPressDelay: 250,

        allDaySlot: false,
        businessHours: false,
        eventOverlap: false,
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        slotEventOverlap: false,


        header: {
            right: 'none',
            center: 'none',
            left: 'none'

        },

        drop: function (info) {
            // is the "remove after drop" checkbox checked?
            // info.draggedEl.parentNode.append(info.draggedEl);
        },

        eventClick: function (info) {
            // info.event.remove();
            var iframe = "../public/iframePopup.html"
            showiframe();
        },

    });

    //builds calendar
    calendar.render();

    //scheduler submit
    var button = document.getElementById('submit');
    var events = [];
    var startTime = [];

    //start time
    var wakeTime = "12:01 AM";
    var breakfastTime = "12:01 AM";
    var school1Time = "12:01 AM";
    var school2Time = "12:01 AM";
    var school3Time = "12:01 AM";
    var lunchTime = "12:01 AM";
    var snackTime = "12:01 AM";
    var exercise1Time = "12:01 AM";
    var exercise2Time = "12:01 AM";
    var exercise3Time = "12:01 AM";
    var choreTime = "12:01 AM";
    var talkTime = "12:01 AM";
    var dinnerTime = "12:01 AM";
    var open1Time = "12:01 AM";
    var open2Time = "12:01 AM";
    var open3Time = "12:01 AM";
    var bedtimePrepTime = "12:01 AM";
    var bedtimeTime = "12:01 AM";
    var custom1Time = "12:01 AM";
    var custom2Time = "12:01 AM";
    var custom3Time = "12:01 AM";
    var nonETime = "12:01 AM";
    var eTime = "12:01 AM";
    var morningWalkTime = "12:01 AM";

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

    //submit function
    cell.addTouch();

    button.onclick = function () {

        //needed arrays
        events = [];
        startTime = [];

        //pushes title text to events[]
        $('.fc-title').each(function () {
            events.push($(this).text())
        })

        //
        $('div.fc-time').each(function () {
            // var timeSub = (($(this).attr("data-full").substring(0, 7)))
            startTime.push($(this).attr("data-full").substring(0, 8).split(' ').join(''))
        })

        //check if array contains 'activity' sets activitySubscibed to 1 if yes, 0 if no. Sets activityTime to the value of the element in the position of the
        //startTime[] as in the events[]
        if ($.inArray("Wake-Up Time", events) >= 0) {
            wakeSubscribed = 1;
            wakeTime = startTime[($.inArray("Wake-Up Time", events))]

            console.log("Wake: " + wakeSubscribed, wakeTime)
        }

        if ($.inArray("Breakfast Time", events) >= 0) {
            breakfastSubscribed = 1;
            breakfastTime = startTime[($.inArray("Breakfast Time", events))]

            console.log("Breakfast: " + breakfastSubscribed, breakfastTime)
        }

        if ($.inArray("Online School 1", events) >= 0) {
            school1Subscribed = 1;
            school1Time = startTime[($.inArray("Online School 1", events))]

            console.log("Online School 1: " + school1Subscribed, school1Time)
        }

        if ($.inArray("Online School 2", events) >= 0) {
            school2Subscribed = 1;
            school2Time = startTime[($.inArray("Online School 2", events))]

            console.log("Online School 2: " + school2Subscribed, school2Time)
        }

        if ($.inArray("Online School 3", events) >= 0) {
            school3Subscribed = 1;
            school3Time = startTime[($.inArray("Online School 3", events))]

            console.log("Online School 3: " + school3Subscribed, school3Time)
        }

        if ($.inArray("Lunch Time", events) >= 0) {
            lunchSubscribed = 1;
            lunchTime = startTime[($.inArray("Lunch Time", events))]

            console.log("Lunch Time: " + wakeSubscribed, wakeTime)
        }

        if ($.inArray("Snack Time", events) >= 0) {
            snackSubscribed = 1;
            snackTime = startTime[($.inArray("Snack Time", events))]

            console.log("Snack Time: " + snackSubscribed, snackTime)
        }

        if ($.inArray("Exercise Time 1", events) >= 0) {
            exercise1Subscribed = 1;
            exercise1Time = startTime[($.inArray("Exercise Time 1", events))]

            console.log("Exercise Time 1: " + exercise1Subscribed, exercise1Time)
        }

        if ($.inArray("Exercise Time 2", events) >= 0) {
            exercise2Subscribed = 1;
            exercise2Time = startTime[($.inArray("Exercise Time 2", events))]

            console.log("Exercise Time 2: " + exercise2Subscribed, exercise2Time)
        }

        if ($.inArray("Exercise Time 3", events) >= 0) {
            exercise3Subscribed = 1;
            exercise3Time = startTime[($.inArray("Exercise Time 3", events))]

            console.log("Exercise Time 3: " + exercise3Subscribed, exercise3Time)
        }

        if ($.inArray("Chore Time", events) >= 0) {
            choreSubscribed = 1;
            choreTime = startTime[($.inArray("Chore Time", events))]

            console.log("Chore Time: " + choreSubscribed, choreTime)
        }

        if ($.inArray("Family Talk Time", events) >= 0) {
            talkSubscribed = 1;
            talkTime = startTime[($.inArray("Family Talk Time", events))]

            console.log("Family Talk Time: " + talkSubscribed, talkTime)
        }

        if ($.inArray("Dinner Time", events) >= 0) {
            dinnerSubscribed = 1;
            dinnerTime = startTime[($.inArray("Dinner Time", events))]

            console.log("Dinner Time: " + dinnerSubscribed, dinnerTime)
        }

        if ($.inArray("Open Time 1", events) >= 0) {
            open1Subscribed = 1;
            open1Time = startTime[($.inArray("Open Time 1", events))]

            console.log("Open Time 1:" + open1Subscribed, open1Time)
        }

        if ($.inArray("Open Time 2", events) >= 0) {
            open2Subscribed = 1;
            open2Time = startTime[($.inArray("Open Time 2", events))]

            console.log("Open Time 2:" + open2Subscribed, open2Time)
        }

        if ($.inArray("Open Time 3", events) >= 0) {
            open3Subscribed = 1;
            open3Time = startTime[($.inArray("Open Time 3", events))]

            console.log("Open Time 3:" + open3Subscribed, open3Time)
        }

        if ($.inArray("Bedtime Prep", events) >= 0) {
            bedtimePrepSubscribed = 1;
            bedtimePrepTime = startTime[($.inArray("Bedtime Prep", events))]

            console.log("Bedtime Prep: " + bedtimePrepSubscribed, bedtimePrepTime)
        }

        if ($.inArray("Bedtime", events) >= 0) {
            bedtimeSubscribed = 1;
            bedtimeTime = startTime[($.inArray("Bedtime", events))]

            console.log("Bedtime: " + bedtimeSubscribed, bedtimeTime)
        }

        if ($.inArray("Custom 1", events) >= 0) {
            custom1Subscribed = 1;
            custom1Time = startTime[($.inArray("Custom 1", events))]

            console.log("Custom 1: " + custom2Subscribed, custom2Time)
        }

        if ($.inArray("Custom 2", events) >= 0) {
            custom2Subscribed = 1;
            custom2Time = startTime[($.inArray("Custom 2", events))]

            console.log("Custom 2: " + custom2Subscribed, custom2Time)
        }

        if ($.inArray("Custom 3", events) >= 0) {
            custom3Subscribed = 1;
            custom3Time = startTime[($.inArray("Custom 3", events))]

            console.log("Custom 3: " + custom2Subscribed, custom2Time)
        }

        if ($.inArray("Non-E-Time", events) >= 0) {
            nonESubscribed = 1;
            nonETime = startTime[($.inArray("Non-E-Time", events))]

            console.log("Non-E-Time: " + nonESubscribed, nonETime)
        }

        if ($.inArray("E-Time", events) >= 0) {
            eSubscribed = 1;
            eTime = startTime[($.inArray("E-Time", events))]

            console.log("E-Time: " + eSubscribed, eTime)
        }

        if ($.inArray("Morning Walk", events) >= 0) {
            morningWalkSubscribed = 1;
            morningWalkTime = startTime[($.inArray("Morning Walk", events))]

            console.log("Morning Walk: " + morningWalkSubscribed, morningWalkTime)
        }


        console.log(startTime);

        console.log(events);

    }

});