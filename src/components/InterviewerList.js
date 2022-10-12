import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from "prop-types";



export default function InterviewerList(props) {

  const interviewersArr = props.interviewers.map((e) => {
    return (
      <InterviewerListItem 
        key={e.id}
        name={e.name}
        avatar={e.avatar}
        selected={e.id === props.value}
        setInterviewer={() => props.onChange(e.id)}   
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

