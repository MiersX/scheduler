import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./appointments/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


  // Renders the Application

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // Creates an array of appointments for the day

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

   const scheduledAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduledAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
