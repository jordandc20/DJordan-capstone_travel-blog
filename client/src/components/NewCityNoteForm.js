import React from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios"

import { useFormik } from "formik";
import * as yup from "yup";

const NewCityNoteForm = ({ city_id, onFormClose, onNewNote }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();



  const formik = useFormik({
    initialValues: {
      note_body: '',
      note_type: 'Other',
      city_id: Number(city_id)
    },
    validationSchema: yup.object({
      note_body: yup.string().required("Must enter a Note").min(3, 'Must be at least 3 characters')
        .max(50, 'Must be less  than 50 characters'),
      note_type: yup.string()
    }),
    onSubmit: values => {
      axios.post(`/citynotes`, values)
        .then(r => {
          onNewNote(r.data)
        })
        .then(onFormClose())
    },
  });


  if (isLoading) { return <div>Loading ...</div>; }

  return (
    <div className="grid place-items-center  bg-yellow-50 ">

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <h1>Add City Note</h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>

          <label htmlFor="note_body" className="block mb-2 text-sm font-medium text-gray-900 ">Note Text</label>
          <input id='note_body' type="text" name="note_body" placeholder="note text" {...formik.getFieldProps('note_body')}
          />
          {formik.touched.note_body && formik.errors.note_body ? (
            <div>{formik.errors.note_body}</div>
          ) : null}


          <label htmlFor="note_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select id='note_type' as="select" name="note_type"  {...formik.getFieldProps('note_type')} >
            <option value="Other">Select a Category</option>
            <option value="Communication">Communication</option>
            <option value="Safety">Safety</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.note_type && formik.errors.note_type ? (
            <div>{formik.errors.note_type}</div>
          ) : null}








          <button type="submit" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
          <button type="reset" className="w-full text-white-100 bg-emerald-400 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " value="Cancel" onClick={() => {
            // formik.resetForm();
            onFormClose()
          }}>Cancel</button>
        </form>

      </div>

    </div>
  )
}

export default withAuthenticationRequired(NewCityNoteForm)