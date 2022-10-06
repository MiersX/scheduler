import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";



export default function InterviewerList(props) {

  const interviewersArr = props.interviewers.map((e) => {
    return (
      <InterviewerListItem
        key={e.id}
        name={e.name}
        avatar={e.avatar}
        selected={e.id === props.interviewer}
        setInterviewer={() => {props.setInterviewer(e.id)}}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersArr}</ul>
    </section>
  );
};


