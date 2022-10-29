import React from "react";

const StudentDetails = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("F", e);
  };

  return (
    <div className='dashboard-main'>
      <form className='student-form ' onSubmit={handleSubmit}>
        <div className='col-6 mb-3'>
          <label htmlFor='inputPassword2' className='visually-hidden'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='inputPassword2'
            placeholder='Name'
          />
        </div>
        <div className='col-6 mb-3'>
          <label htmlFor='inputPassword2' className='visually-hidden'>
            Age
          </label>
          <input
            type='text'
            className='form-control'
            id='inputPassword2'
            placeholder='Age'
          />
        </div>
        <div className='col-6 mb-3'>
          <button type='submit' className='btn btn-primary mb-3'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentDetails;
