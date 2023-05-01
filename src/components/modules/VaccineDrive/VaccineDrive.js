import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DriveDrive from "../DriveData/DriveData";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import DriveData from "../DriveData/DriveData";

const StudentDetailschema = Yup.object().shape({
  driveDate: Yup.date().required("Student name required"),
  numberOfVaccines: Yup.number().required("Vaccine name is required"),
});

const VaccineDrive = () => {
  const { appActionDispatch } = useContext(AppStore);
  const getAllDriveData = async () => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    try {
      const data = await axios.get("http://localhost:4800/vaccineDrive");
      if (data) {
        appActionDispatch({
          type: appActionTypes.setVaccineData,
          payload: data.data.data,
        });
        appActionDispatch({
          type: appActionTypes.setLoader,
          payload: false,
        });
      }
      console.log("#DD>", data);
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  };
  const handleSubmit = async (payload) => {
    try {
      const data = await axios.post(
        "http://localhost:4800/vaccineDrive",
        payload
      );
      if (data) {
        // getAllStudentsData();
        getAllDriveData();
        const notify = () => toast("Drive Added Successfully 😲!");
        notify();
      }
      console.log("#DD>", data);
      // setStudent({
      //   studentName: "",
      //   vaccineName: "",
      // });
      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  };
  return (
    <div className='dashboard-main'>
      <h1 className='display-6'> Add/Manage Drive </h1>
      <Formik
        initialValues={{
          driveDate: "",
          numberOfVaccines: "",
        }}
        // validationSchema={StudentDetailschema}
        className='student-form '
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values);
          resetForm();
          // alert("Form is validated! Submitting the form...");
        }}
      >
        {({ touched, errors, isSubmitting, values }) => {
          console.log("#TTTT", errors, values);
          return (
            <Form>
              <div className='col-6 mb-4'>
                <label htmlFor='driveDate' className='mb-2'>
                  Vaccination Drive Date
                </label>
                <Field
                  type='date'
                  className='form-control'
                  id='driveDate'
                  name='driveDate'
                  placeholder=' Vaccination Drive Date'
                />
                <ErrorMessage
                  component='div'
                  name='driveDate'
                  className='error'
                />
              </div>
              <div className='col-6 mb-4'>
                <label htmlFor='vaccineName' className='mb-2'>
                  Number of vaccine available
                </label>
                <Field
                  type='number'
                  className='form-control'
                  id='numberOfVaccines'
                  name='numberOfVaccines'
                  placeholder='Number of Vaccines'
                />
                <ErrorMessage
                  component='div'
                  name='numberOfVaccines'
                  className='error'
                />
              </div>
              <div className='col-6 mb-3'>
                <button type='submit' className='btn btn-primary mb-3'>
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <DriveData getAllDriveData={getAllDriveData} />
    </div>
  );
};

export default VaccineDrive;
