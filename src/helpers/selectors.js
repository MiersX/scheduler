export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(specificDay => specificDay.name === day);

  if (filteredDays.length === 0) {
    return [];
  }

  const apptArr = filteredDays[0].appointments.map(appt => state.appointments[appt]);
  return apptArr;
}


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