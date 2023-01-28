
export function getAppointmentsForDay(state, day) {
  const results = [];
  for (const element of state.days) {
    if(element.name === day){
      for (const value of element.appointments) {
        results.push(state.appointments[value])
  }}}
  return results;
};


export function getInterviewersForDay(state, day) {
  const findDay = state.days.find(stateDay => stateDay.name === day);
  let result = [];
  if (!state.days.length) {
    return result;
  }
  if (findDay === undefined) {
    return result;
  }
  for (const id of findDay.interviewers) {
    result.push(state.interviewers[id])
  }
  return result;
};


export function getInterview(state, interview) {
  const results = {};
  if (!interview) {
    return null;
  }
  results.student = interview.student;
  results.interviewer = state.interviewers[interview.interviewer];
  return results;
};
