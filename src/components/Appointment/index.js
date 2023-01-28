import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)})
      .catch(() => {transition(ERROR_SAVE, true)});
  };

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)})
    .catch(() => {transition(ERROR_DELETE, true)});
  }; 
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

        {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
        
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />)} 

        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />)}

        {mode === SAVING && (<Status message={"Saving"} />)}

        {mode === DELETING && (<Status message={"Deleting"} />)}

        {mode === CONFIRM && ( 
          <Confirm
            message={"Are you sure you want to delete this appointment?"}
            onCancel={back}
            onConfirm={deleteInterview}
          />)}

        {mode === EDIT && (
          <Form
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            student={props.interview.student}
            onCancel={back}
            onSave={save}
          />)}  

        {mode === ERROR_SAVE && (<Error onClose={back} message="Saving error..." />)}
     
        {mode === ERROR_DELETE && (<Error onClose={back} message="Deleting error..." />)}

    </article>
  );
};