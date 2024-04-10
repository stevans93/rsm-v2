import * as Yup from 'yup'

import React, {useState} from 'react'

import {FaUpload} from 'react-icons/fa'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import MunicipalityService from '../../../../services/municipalityService'
import {useFormik} from 'formik'

function DashboardSettingsInfo({showCloseBtn, setShowEditModal}) {
  const VALID_TYPE = ['image/jpeg', 'image/jpg', 'image/png']
  let KB = 1024
  let MB = KB * 1024 * 10

  const formik = useFormik({
    initialValues: {
      district: '',
      municipality: '',
      fullNameOfThePresident: '',
      profession: '',
      email: '',
      phone: '',
      numberOfOfficials: '',
      fullNumberOfOfficials: '',
      website: '',
      numberOfApplications: '',
      fullNumberOfApplications: '',
      image: ''
    },

    validationSchema: Yup.object({
      district: Yup.string().required('Polje je obavezno...'),
      municipality: Yup.string().required('Polje je obavezno...'),
      fullNameOfThePresident: Yup.string().required('Polje je obavezno...'),
      profession: Yup.string().required('Polje je obavezno...'),
      email: Yup.string().required('Polje je obavezno...'),
      phone: Yup.string().required('Polje je obavezno...'),
      website: Yup.string().required('Polje je obavezno...'),
      image: Yup.mixed()
        .required('Polje je obavezno...')
        .test('fileSize', 'Wrong file size', (value) => value && value.size < MB * 10)
        .test('fileType', 'Wrong file type', (value) => value && VALID_TYPE.includes(value.type))
    }),

    onSubmit: (values) => {
      const formData = new FormData()

      formData.append('file', values.image)

      delete values.image

      Object.entries(values).forEach((obj) => formData.append(obj[0], obj[1]))

      MunicipalityService.addMunicipality(formData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

  return (
    <div className="bg-[#fff] p-5 rounded-3xl shadowBorder w-[310px] lg:w-[650px] mx-auto dashboard">
      {showCloseBtn ? (
        <div className="w-full flex justify-end items-center">
          <button type="button" onClick={() => setShowEditModal(false)}>
            <IoMdCloseCircleOutline className="text-[1.5rem] text-main" />
          </button>
        </div>
      ) : null}
      <div className="w-[40%]">
        <h2 className="text-[22px] text-main">Dodavanje Podataka</h2>
        <p className="text-[10px] text-spanGray">
          Dodavanje Podataka Okruga, Opštine, Grada i Predsednika možete dodati ovde.
        </p>
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
        </div>
        <div>
          <h3 className="text-[16px]">Slika Predsednika</h3>
          <span className="text-[10px] text-spanGray">Profilna slika maksimalna veličina do 10MB</span>
          <br />
          <span className="text-red italic text-[13px]">{showError('image')}</span>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5 w-[100%]">
            <div className="flex  flex-col gap-3 w-[40%]">
              <div className="flex flex-col items-center xl:items-start justify-between">
                <label>
                  Okrug <span className="text-red italic text-[13px]">{showError('district')}</span>
                </label>
                <input
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  type="text"
                  name="district"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Ime Okruga..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Grad/Opština <span className="text-red italic text-[13px]">{showError('municipality')}</span>
                </label>
                <input
                  value={formik.values.municipality}
                  onChange={formik.handleChange}
                  type="text"
                  name="municipality"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Ime Opština..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Email <span className="text-red italic text-[13px]">{showError('email')}</span>
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  name="email"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Email..."
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
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Telefon..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Web Sajt <span className="text-red italic text-[13px]">{showError('website')}</span>
                </label>
                <input
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  type="text"
                  name="website"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Link..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Zanimanje <span className="text-red italic text-[13px]">{showError('profession')}</span>
                </label>
                <input
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  type="text"
                  name="profession"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite zanimanje..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-[60%]">
              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Ime i Prezime Predsednika{' '}
                  <span className="text-red italic text-[13px]">{showError('fullNameOfThePresident')}</span>
                </label>
                <input
                  value={formik.values.fullNameOfThePresident}
                  onChange={formik.handleChange}
                  type="text"
                  name="fullNameOfThePresident"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Ime i Prezime..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Broj Predstavki Gradjana{' '}
                  <span className="text-red italic text-[13px]">{showError('numberOfApplications')}</span>
                </label>
                <input
                  value={formik.values.numberOfApplications}
                  onChange={formik.handleChange}
                  type="text"
                  name="numberOfApplications"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Link..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Ukupan Broj Predstavki Gradjana{' '}
                  <span className="text-red italic text-[13px]">{showError('fullNumberOfApplications')}</span>
                </label>
                <input
                  value={formik.values.fullNumberOfApplications}
                  onChange={formik.handleChange}
                  type="text"
                  name="fullNumberOfApplications"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Ukupan Broj..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Broj Gradskih/Opstinskih Funkcionera{' '}
                  <span className="text-red italic text-[13px]">{showError('numberOfOfficials')}</span>
                </label>
                <input
                  value={formik.values.numberOfOfficials}
                  onChange={formik.handleChange}
                  type="text"
                  name="numberOfOfficials"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Link..."
                />
              </div>

              <div className="flex flex-col items-center xl:items-start  justify-between">
                <label>
                  Ukupan Broj Gradskih/Opstinskih Funkcionera{' '}
                  <span className="text-red italic text-[13px]">{showError('fullNumberOfOfficials')}</span>
                </label>
                <input
                  value={formik.values.fullNumberOfOfficials}
                  onChange={formik.handleChange}
                  type="text"
                  name="fullNumberOfOfficials"
                  className="border border-1 border-main rounded-xl px-4 py-2 w-auto lg:w-full"
                  placeholder="Unesite Ukupan Broj..."
                />
              </div>
            </div>
          </div>

          <button className="mt-[30px] border border-1 border-main px-5 py-2 rounded-xl text-main hover:bg-main hover:text-[#fff]">
            Dodaj Podatke
          </button>
        </div>
      </form>
    </div>
  )
}

export default DashboardSettingsInfo
