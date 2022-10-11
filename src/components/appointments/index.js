import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";






export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";



  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);




  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
          .then(() => transition(SHOW))
          .catch(error => transition(ERROR_SAVE))   
  }


  const destroyConfirmation = () => {
    transition(CONFIRM);
  }

  const destroy = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
          .then(() => transition(EMPTY))
          .catch(error => transition(ERROR_DELETE))
    }

    const editInterview = () => {
      transition(EDIT);
    }



  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={destroyConfirmation}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form  interviewers={props.interviewers} onCancel={back} onSave={save}/>
      )}
      {mode === SAVING && (
        <Status message="Saving Appointment..."/>
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={destroy} message="Delete this interview?"/>
      )}
      {mode === DELETING && (
        <Status message="Deleting..."/>
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
  