
// Returns an array of appointments based on day

export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(specificDay => specificDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const apptArr = filteredDays[0].appointments.map(appt => state.appointments[appt]);
  return apptArr;
}

// returns an interview object that contains the interviewers info

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  const interviewData = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer]},
  };
  return interviewData;
};

// returns an array of interviewers available for a day

export function getInterviewersForDay(state, day) {

  const filteredDays = state.days.filter(specificDay => specificDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const interviewersArr = filteredDays[0].interviewers.map(interviewer => state.interviewers[interviewer]);
  return interviewersArr;


};