import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

// returns the DayListItem component

export default function DayListItem(props) {


  // Displays spots left for the day based on conditionals
  
  const formatSpots =() => {
    if (props.spots > 1) {
      return props.spots +' spots remaining';
    }
    if (props.spots === 1) {
      return props.spots +' spot remaining';
    }
    return 'no spots remaining';
  };

  const dayClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
    });

  return (
    <li data-testid="day" onClick={() => {props.setDay(props.name)}} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}