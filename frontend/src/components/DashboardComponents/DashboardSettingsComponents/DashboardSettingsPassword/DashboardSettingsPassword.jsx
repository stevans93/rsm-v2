import * as Yup from 'yup'

import React from 'react'
import UserService from '../../../../services/userService'
import {toast} from 'react-toastify'
import {useFormik} from 'formik'

function DashboardSettingsPassword() {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Polje je obavezno...'),
      newPassword: Yup.string().required('Polje je obavezno...'),
      newPasswordConfirm: Yup.string()
        .required('Polje je obavezno...')
        .oneOf([Yup.ref('newPassword'), null], 'Lozinke se ne podudaraju')
    }),
    onSubmit: async (values) => {
      try {
        await UserService.changePassword(values)
        toast.success('Lozinka uspješno promijenjena')
        formik.resetForm()
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className="bg-[#fff] p-5 rounded-3xl shadowBorder w-[310px] lg:w-[500px] mx-auto dashboard">
      <div className="w-[50%]">
        <h2 className="text-[22px] text-main">Lozinka</h2>
        <p className="text-[10px] text-spanGray">
          Podešavanja vaseg profila možete uraditi ovde ovo je vidljivo samo vama.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center mt-[30px]">
        <div className="flex flex-col items-start gap-5 w-[100%]">
          <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
            <label>Stara Lozinka</label>
            <input
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              name="oldPassword"
              type="password"
              className="border border-1 border-main rounded-xl px-3 py-2"
              placeholder="Stara Lozinka..."
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
            <label>Nova Lozinka</label>
            <input
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              name="newPassword"
              type="password"
              className="border border-1 border-main rounded-xl px-3 py-2"
              placeholder="Nova Lozinka..."
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
            <label>Ponovi Novu Lozinku</label>
            <input
              value={formik.values.newPasswordConfirm}
              onChange={formik.handleChange}
              name="newPasswordConfirm"
              type="password"
              className="border border-1 border-main rounded-xl px-3 py-2"
              placeholder="Ponovi Novu Lozinku..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-[30px] border border-1 border-main px-5 py-2 rounded-xl text-main hover:bg-main hover:text-[#fff]">
          Promeni Lozinku
        </button>
      </form>
    </div>
  )
}

export default DashboardSettingsPassword
