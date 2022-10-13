import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  
  const setDay = day => setState({...state, day});


  const selectDay = (day) => {
    const week = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    }
    return week[day];
  }


  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayInWeek = selectDay(state.day);

    let day = {
      ...state.days[dayInWeek],
      spots: state.days[dayInWeek]
    }
  
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


    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {setState({...state, appointments})})
    .then(() => {setState({...state, appointments, days})})
  };






  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayInWeek = selectDay(state.day);

    let day = {
      ...state.days[dayInWeek],
      spots: state.days[dayInWeek].spots + 1
    }

    let days = state.days
    days[dayInWeek] = day;
  

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {setState({...state, appointments})})
    .then(() => {setState({...state, appointments, days})})

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







