import React from "react";
import axios from "axios";

import {
  render,
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  prettyDOM, 
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  queryByAltText,
 } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => { 


  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });



  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);

    await waitForElement(() =>  getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones"}
    });

    fireEvent.click(getByAltText(appointment,"Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving Appointment...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving Appointment..."))

    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    const dayNode = getAllByTestId(container, "day").find(day => 
                    queryByText(day, "Monday"));

    expect(getByText(dayNode, "Monday")).toBeInTheDocument();
    expect(getByText(dayNode, "no spots remaining")).toBeInTheDocument();
    });






    it("loads data, cancels an interview, and increases the spots remaining for Monday by 1", async () => {

      const { container, debug } = render (<Application />);

      await waitForElement(() =>  getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );


      fireEvent.click(queryByAltText(appointment, "Delete"));


      expect(getByText(appointment, "Delete this interview?")).toBeInTheDocument();


      fireEvent.click(queryByText(appointment, "Confirm"));


      expect(getByText(appointment, "Deleting...")).toBeInTheDocument();


      await waitForElementToBeRemoved(() => getByText(appointment, "Deleting..."));
      expect(getByAltText(appointment, "Add")).toBeInTheDocument();


      const dayNode = getAllByTestId(container, "day").find(
        day => queryByText(day, "Monday"));


      expect(getByText(dayNode, "Monday")).toBeInTheDocument();
        
      expect(getByText(dayNode, "1 spot remaining")).toBeInTheDocument();

    });



    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
       
      // 1. Render the Application.

      const { container, debug } = render (<Application />);


      // 2. Wait until the text "Archie Cohen" is displayed.

      await waitForElement(() =>  getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );


     // 3. Click the "Edit" button on the booked appointment.

     fireEvent.click(queryByAltText(appointment, "Edit"));

     // 4. Change the student target value in the appointment

     fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "Lydia Miller-Jones"}
    });

      // 5. Click the "save" button

      fireEvent.click(queryByText(appointment, "Save"));


      // 6. Check that the element with the text "Saving etc" is displayed.

      expect(getByText(appointment, "Saving Appointment...")).toBeInTheDocument();

      // 7. Wait until the element with the appointment and student name is displayed.

      await waitForElementToBeRemoved(() => getByText(appointment, "Saving Appointment..."));
      expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();


      // 8. Check that the DayListItem with the text "Monday" also has the same number of spots remaining.

      const dayNode = getAllByTestId(container, "day").find(
        day => queryByText(day, "Monday"))

        expect(getByText(dayNode, "Monday")).toBeInTheDocument();
        expect(getByText(dayNode, "1 spot remaining")).toBeInTheDocument();

    });




    it("shows the save error when failing to save an appointment", async () => {
      axios.put.mockRejectedValueOnce();

      const { container, debug } = render (<Application />);

      await waitForElement(() =>  getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(queryByAltText(appointment, "Edit"));

      fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
        target: { value: "Lydia Miller-Jones"}
      });

      fireEvent.click(queryByText(appointment, "Save"));

      await waitForElementToBeRemoved(() => getByText(appointment, "Saving Appointment..."));

      expect(getByText(appointment, "There was an error saving the interview.")).toBeInTheDocument();

      fireEvent.click(queryByAltText(appointment, "Close"));

      expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    });

    it("shows the delete error when failing to delete an existing appointment", async () => {
      axios.delete.mockRejectedValueOnce();

      const { container, debug } = render (<Application />);

      await waitForElement(() =>  getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );

      fireEvent.click(queryByAltText(appointment, "Delete"));

      fireEvent.click(getByText(appointment, "Confirm"));

      await waitForElementToBeRemoved(() => getByText(appointment, "Deleting..."));

      expect(getByText(appointment, "There was an error deleting the interview.")).toBeInTheDocument();

      fireEvent.click(queryByAltText(appointment, "Close"));

      expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
    });





});