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


  /*const updateSpots = () => {

    let availableDays = 5;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        for (let id of state.days[day].appointments) {
          if (state.appointments[id].interview !== null) {
            availableDays --;
          }
        }
      }
    }
    return state.days.map(day => {
      if (day.name !== state.day) {
        return day;
      }
      return {
        ...day,
        spots: availableDays,
      }
    })
  };
*/
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {setState({...state, appointments})})
    //.then(() => {console.log(updateSpots())})
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {setState({...state, appointments})})
    //.then(() => {console.log(updateSpots())})

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







