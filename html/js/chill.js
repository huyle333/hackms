/* jQuery to listen too the size of window and adjust accordingly
$(function() {
    $(window).on('resize', function resize()  {
        $(window).off('resize', resize);
        setTimeout(function () {
            var content = $('#content');
            var top = (window.innerHeight - content.height()) / 2;
            content.css('top', Math.max(0, top) + 'px');
            $(window).on('resize', resize);
        }, 50);
    }).resize();
});
*/

"use strict";

$(function() {
  var animationEndPrefixes = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";

  function setupTimer() {
    var timeIntervals = [5, 10, 15, 20, 25, 30];
    var relaxation = ["Put away that phone", "Don't pay attention to those notifications", "Stop everything that you're doing", "A real break is a nice start and end of the day", "Close your eyes and breathe"];
    var selectedTimeInterval = parseInt(window.localStorage.defaultTimeInterval);
    if ($.inArray(selectedTimeInterval, timeIntervals) < 0) {
      selectedTimeInterval = 5;
    }
    var meditationProgressTimer = null;
    var lock = null;

    $("#content").html(ich.meditationDialog({ 'duration': selectedTimeInterval }));
    $("#meditation-dialog").fadeIn('fast');

    $("#time-options").append(ich.timeOptionButtons({'timeIntervals': timeIntervals.map(function v(val) { return { "value": val } }) }));

    function intervalSelected(timeInterval) {
      selectedTimeInterval = timeInterval;
      window.localStorage.defaultTimeInterval = selectedTimeInterval;
      $("#meditation-text").html(timeInterval + " minutes");
      $(".time-selector-btn").removeClass('btn-link-selected');
      $("#time-button-" + timeInterval).addClass('btn-link-selected');
    };
    timeIntervals.forEach(function(timeInterval) {
      $("#time-button-" + timeInterval).click(function() {
        intervalSelected(timeInterval);
      });
    });
    intervalSelected(selectedTimeInterval);

    function reset() {
      $("#music").off();

      if (lock) {
        lock.unlock();
        lock = null;
      }
      window.clearTimeout(meditationProgressTimer);
      meditationProgressTimer = null;
      intervalSelected(selectedTimeInterval);
      $("#about-link").show();
      $("#start-button").html("Start");
    }

    $("#start-button").click(function() {
      $('#day').fadeOut(10000);
      if (window.navigator.requestWakeLock) {
        // currently only works on FirefoxOS :(
        lock = window.navigator.requestWakeLock('screen');
      }
      if (meditationProgressTimer) {
        $("#music").get(0).pause(); // stop music if playing
        reset();
        return;
      }

      $("#start-button").html("Cancel");
      $("#about-link").hide();
      $("#meditation-text").html("<p style='color:#2A6496'>Sit back and clear your head.</p>" +
                                 "<span class='blink'>♫</span>");
      var startTime = null;

      meditationProgressTimer = window.setTimeout(function() {
        if (!startTime) {
          startTime = Date.now();
        }
        function timerFired() {
          var elapsed = parseInt((Date.now() - startTime) / 1000.0);
          var timeRemaining = (selectedTimeInterval * 60) - elapsed;

          var minutesRemaining = parseInt(timeRemaining / 60);
          var secondsRemaining = timeRemaining % 60;
          function doubleDigits(num) {
            if (num < 10) {
              return "0" + num;
            }
            return num;
          }

          $("#meditation-text").html(doubleDigits(minutesRemaining) + ":" +
                                     doubleDigits(secondsRemaining));
          if (timeRemaining > 0) {
            meditationProgressTimer = window.setTimeout(timerFired, 1000);
          } else {
            // we're done
            $("#meditation-text").html("<span class='blink'>00:00</span>");
            // $("#music").get(0).currentTime = 0;
            // $("#music").get(0).play();

            $("#music").get(0).pause();
            reset();
            return;
            // $("#music").on("ended", reset);
          }
        }
        $("#music").get(0).play();
        timerFired();
      }, 10*1000);
    });

    $("#about-link").click(function() {
      $("#meditation-dialog").fadeOut("fast", function() {
        $("#content").html(ich.aboutDialog());
        $("#about-dialog").fadeIn('fast');
        $("#return-button").click(function() {
          $("#about-dialog").fadeOut("fast", function() {
            setupTimer();
          });
        })
      });
    });
  }
  setupTimer();
});
