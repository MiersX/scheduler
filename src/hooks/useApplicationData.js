import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


// returns the functions setDay, bookInterview, cancelInterview as well as the state. 

export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Sets the day property of state

  const setDay = day => setState((prev) => ({...prev, day}));

  // returns KVP based on input day

  function selectDay(day) {
    const dayInWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return dayInWeek[day]
  }

  // Books an interview

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Finds day based on state 

    const dayInWeek = selectDay(state.day);

    // Create new day object and updates the spots property

    let day = {
      ...state.days[dayInWeek],
      spots: state.days[dayInWeek]
    }
    // if an interview exists, reduces available spots

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayInWeek],
        spots: state.days[dayInWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayInWeek],
        spots: state.days[dayInWeek].spots
      }
    }

    let days = state.days
    days[dayInWeek] = day;

    // Make update request to server, set state

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
    .then(() => setState({...state, appointments, days}));
  };


  // Cancels an existing interview

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Finds day based on state 

    const dayInWeek = selectDay(state.day);

    // Creates day object, updates spots available for that day by 1

    const day = {
      ...state.days[dayInWeek],
      spots: state.days[dayInWeek].spots + 1
    }

    let days = state.days
    days[dayInWeek] = day;

    // Make delete request to server, set state

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments, days}));

  };



  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
      .catch(err => {
      console.log(err.message)
    })}, [])


    return {state, setDay, bookInterview, cancelInterview};
}







