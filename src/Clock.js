import React from "react";
import { useState } from "react";
import "./styles.css";
import { useTimer } from "react-timer-hook";

export default function Clock() {
  const [sessionT, sessionTSetter] = useState(25);
  const [breakT, breakTSetter] = useState(5);
  const [startT, startTSetter] = useState(false);
  const [titleT, titleTSetter] = useState("Session");
  const numToMins = (num) => {
    const time = new Date();
    time.setSeconds(num * 60 + time.getSeconds());
    return time;
  };
  function breakDecrementer() {
    if (breakT > 1) {
      breakTSetter(breakT - 1);
    }
  }
  function breakIncrementer() {
    breakTSetter(breakT + 1);
  }
  function sessionDecrementer() {
    if (sessionT > 1) {
      sessionTSetter(sessionT - 1);
      restart(numToMins(sessionT - 1), false);
    }
  }
  function sessionIncrementer() {
    sessionTSetter(sessionT + 1);
    restart(numToMins(sessionT + 1), false);
  }

  function timeToggler() {
    if (startT) {
      pause();
      startTSetter(!startT);
    } else {
      resume();
      startTSetter(!startT);
    }
  }
  function resetHandler() {
    restart(numToMins(25), false);
    startTSetter(false);
    titleTSetter("Session");
    breakTSetter(5);
    sessionTSetter(25);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }
  const alarm = document.getElementById("beep");
  function finish() {
    if (titleT === "Session") {
      titleTSetter("Break");
      alarm.play();
      setTimeout(() => restart(numToMins(breakT)), 1000);
    } else if (titleT === "Break") {
      titleTSetter("Session");
      alarm.play();
      setTimeout(() => restart(numToMins(sessionT)), 1000);
    }
  }

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp: numToMins(sessionT),
    onExpire: () => finish(),
    autoStart: false
  });
  const formatTimer = (timeNum) => {
    return timeNum < 10 ? "0" + timeNum.toString() : timeNum;
  };
  return (
    <div className="body">
      <div className="container">
        <div className="header">25 + 5 Clock</div>
        <div className="sessionBreak">
          <div className="breakPart">
            <div className="titlePart">
              <p className="title" id="break-label">
                Break Length
              </p>
              <div className="controlers">
                <button id="break-decrement" onClick={breakDecrementer}>
                  <i className="fa fa-arrow-down fa-2x"></i>
                </button>
                <p className="timeShow" id="break-length">
                  {breakT}
                </p>
                <button id="break-increment" onClick={breakIncrementer}>
                  <i className="fa fa-arrow-up fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="sessionPart">
            <div className="titlePart">
              <p className="title" id="session-label">
                Session Length
              </p>
              <div className="controlers">
                <button id="session-decrement" onClick={sessionDecrementer}>
                  <i className="fa fa-arrow-down fa-2x"></i>
                </button>
                <p className="timeShow" id="session-length">
                  {sessionT}
                </p>
                <button id="session-increment" onClick={sessionIncrementer}>
                  <i className="fa fa-arrow-up fa-2x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="timerPart">
          <p className="timerTitle" id="timer-label">
            {titleT}
          </p>
          <div className="timer" id="time-left">
            {formatTimer(minutes)} : {formatTimer(seconds)}
          </div>
        </div>
        <div className="actionPart">
          <button className="play" id="start_stop" onClick={timeToggler}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button className="reset" id="reset" onClick={resetHandler}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
        <div className="author">
          {" "}
          Coded by <br />
          <p>Shahin Movazzaf</p>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    </div>
  );
}
