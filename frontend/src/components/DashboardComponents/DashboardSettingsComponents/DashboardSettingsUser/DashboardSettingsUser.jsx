import * as Yup from 'yup'

import React, {useState} from 'react'

import {FaUpload} from 'react-icons/fa'
import UserService from '../../../../services/userService'
import {useFormik} from 'formik'

function DashboardSettingsUser() {
  const VALID_TYPE = ['image/jpeg', 'image/jpg', 'image/png']
  const user = JSON.parse(localStorage.getItem('rsm_user'))

  let KB = 1024
  let MB = KB * 1024 * 10

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      title: '',
      phone: '',
      image: ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required('Polje je obavezno...'),
      lastName: Yup.string().required('Polje je obavezno...'),
      email: Yup.string().required('Polje je obavezno...'),
      password: Yup.string().required('Polje je obavezno...'),
      title: Yup.string().required('Polje je obavezno...'),
      phone: Yup.string().required('Polje je obavezno...'),
      image: Yup.mixed()
        .required('Polje je obavezno...')
        .test('fileSize', 'Wrong file size', (value) => !(value && value?.size < MB * 10))
        .test('fileType', 'Wrong file type', (value) => !(value && VALID_TYPE.includes(value?.type)))
    }),

    onSubmit: async (values) => {
      const formData = new FormData()

      formData.append('file', values.image)
      delete values.image

      Object.entries(values).forEach((obj) => formData.append(obj[0], obj[1]))

      UserService.registerUser(formData)
        .then((response) => {
          console.log(response)

          if (response.status === 200) {
            console.log('Uspešna registracija korisnika..')
          } else {
            console.log('Registracija korisnika nije uspela...')
          }
        })
        .catch((error) => {
          console.error('Greška prilikom registracije:', error.message)

          if (error.response) {
            console.error('Detalji greške:', error.response.data)
          }
        })
    }
  })

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

  return (
    <div className="bg-[#fff] p-5 rounded-3xl shadowBorder w-[310px] lg:w-[500px] mx-auto dashboard">
      <div className="w-full">
        <h2 className="text-[22px] text-main">Dodavanje koordinatora/funkcionera</h2>
        <div className="w-1/2">
          <p className="text-[10px] text-spanGray">
            Dodavanje koordinatora/funkcionera možete uraditi ovde ovo je vidljivo samo vama.
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col mt-[30px]">
        <div className="flex mb-[30px] gap-5">
          <label className="relative cursor-pointer bg-white border border-spanGray w-[100px] h-[100px] overflow-hidden rounded-xl">
            <img
              id="image-preview"
              src={formik.values.image ? URL.createObjectURL(formik.values.image) : ''}
              alt="Preview"
              className={`w-full h-full object-cover ${formik.values.image ? '' : 'hidden'}`}
            />
            {!formik.values.image && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <FaUpload />
                <span className="text-gray-400 mt-2 text-[11px]">Otpremi Sliku</span>
              </div>
            )}
            <input
              onChange={(e) => {
                if (e.target.files[0]) {
                  formik.setFieldValue('image', e.target.files[0])
                }
              }}
              type="file"
              name="image"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>

          <div>
            <h3 className="text-[16px]">Slika koordinatora/funkcionera</h3>
            <span className="text-[10px] text-spanGray">
              Slika koordinatora/funkcionera maksimalna veličina do 10MB
            </span>
            <br />
            {/* <span className='text-red italic text-[13px]'>{showError('image')}</span> */}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5 w-[100%]">
            <div className="flex  flex-col gap-4 w-[50%]">
              <div className="flex flex-col items-center xl:items-start justify-between">
                <label>
                  Ime <span className="text-red italic text-[13px]">{showError('firstName')}</span>
                </label>
                <input
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  type="text"
                  name="firstName"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]"
                  placeholder="Unesite Ime..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Prezime <span className="text-red italic text-[13px]">{showError('lastName')}</span>
                </label>
                <input
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  type="text"
                  name="lastName"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]"
                  placeholder="Unesite Prezime..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start justify-between">
                <label>
                  Email <span className="text-red italic text-[13px]">{showError('email')}</span>
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  name="email"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]"
                  placeholder="Unesite Email..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 w-[50%]">
              {user.role === 'admin' && (
                <div className="flex flex-col items-center xl:items-start  justify-between">
                  <label>
                    Pozicija <span className="text-red italic text-[13px]">{showError('title')}</span>
                  </label>
                  <select
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    name="title"
                    className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]">
                    <option value="" disabled>
                      Select Poziciju...
                    </option>
                    <option value="admin">Admin</option>
                    <option value="funkcioner">Funkcioner</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              )}

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Lozinka <span className="text-red italic text-[13px]">{showError('password')}</span>
                </label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  name="password"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]"
                  placeholder="Unesite Lozinku..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Telefon <span className="text-red italic text-[13px]">{showError('phone')}</span>
                </label>
                <input
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  type="text"
                  name="phone"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[200px]"
                  placeholder="Unesite Telefon..."
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-[30px] border border-1 border-main px-5 py-2 rounded-xl text-main hover:bg-main hover:text-[#fff]">
            Dodaj Funkcionera
          </button>
        </div>
      </form>
    </div>
  )
}

export default DashboardSettingsUser
