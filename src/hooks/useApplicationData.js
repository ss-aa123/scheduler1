import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  function updateSpots(appointments, appointmentId) {
    const dayObj = state.days.find(
      day => { day.appointments.includes(appointmentId)})
    const spots = dayObj.appointments.filter(
      id => { appointments[id].interview === null }).length
    
      return state.days.map(day => {day.appointments.includes(appointmentId) ? { ...day, spots } : day})
    };

  
  const setDay = day => setState(prev => ({ ...prev, day }));
  

  function bookInterview(id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview } };
    const appointments = {...state.appointments, [id]: appointment };

    return axios.put(`/api/appointments/${id}`,{interview}).then(() => {
      setState({...state, appointments, days: updateSpots(appointments, id)
      });
})};

  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview: null }; 
    const appointments = {...state.appointments, [id]: appointment };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({...state, appointments, days: updateSpots(appointments, id)
      });
})};


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers:all[2].data
      }));
    })
  }, []);

  return {
      state, setDay, bookInterview, cancelInterview
    }
}

