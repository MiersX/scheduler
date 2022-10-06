import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  
  const daysArr = props.days.map((e) => {
    return(
      <DayListItem
        key={e.id}
        name={e.name}
        spots={e.spots}
        selected={e.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return(
    <ul>{daysArr}</ul>
  );
};

