import axios from "axios";
import React, { useContext } from "react";
import { appActionTypes, AppStore } from "../../../context/AppContext";
import StudentData from "../StudentData/StudentData";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const StudentDetailschema = Yup.object().shape({
  studentName: Yup.string().required("Student name required"),
  vaccineName: Yup.string().required("Vaccine name is required"),
});

const StudentDetails = () => {
  const { appActionDispatch } = useContext(AppStore);
  const getAllStudentsData = async () => {
    appActionDispatch({
      type: appActionTypes.setLoader,
      payload: true,
    });
    try {
      const data = await axios.get("http://localhost:4000/api/v1/student");
      if (data) {
        appActionDispatch({
          type: appActionTypes.setStudentData,
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
        "http://localhost:4000/api/v1/student",
        payload
      );
      if (data) {
        getAllStudentsData();
        const notify = () => toast("Student Added Successfully 😲!");
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
      <h1 className='display-6 mb-4'>Add/Manage Student Details</h1>
      <Formik
        initialValues={{
          studentName: "",
          vaccineName: "",
        }}
        validationSchema={StudentDetailschema}
        className='student-form '
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ touched, errors, isSubmitting, values }) => {
          return (
            <Form>
              <div className='col-6 mb-4'>
                <label htmlFor='studentName' className='mb-2'>
                  Student Name
                </label>
                <Field
                  type='text'
                  className='form-control'
                  id='studentName'
                  name='studentName'
                  placeholder='Student Name'
                  autoComplete='off'
                  autofocus
                />
                <ErrorMessage
                  component='div'
                  name='studentName'
                  className='error'
                />
              </div>
              <div className='col-6 mb-4'>
                <label htmlFor='vaccineName' className='mb-2'>
                  Vaccine
                </label>
                <Field
                  type='text'
                  className='form-control'
                  id='vaccineName'
                  name='vaccineName'
                  placeholder='Vaccine Name'
                  autoComplete='off'
                />
                <ErrorMessage
                  component='div'
                  name='vaccineName'
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

      <StudentData getAllStudentsData={getAllStudentsData} />
    </div>
  );
};

export default StudentDetails;
