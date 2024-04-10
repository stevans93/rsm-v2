import * as Yup from 'yup'

import React, {useEffect} from 'react'

import {FaPlus} from 'react-icons/fa6'
import {FaUpload} from 'react-icons/fa'
import {IoSearch} from 'react-icons/io5'
import {TfiExport} from 'react-icons/tfi'
import UserService from '../../services/userService'
import {useFormik} from 'formik'
import {useState} from 'react'

function SearchUser({setPageSize, getData}) {
  const VALID_TYPE = ['image/jpeg', 'image/jpg', 'image/png']
  const user = JSON.parse(localStorage.getItem('rsm_user'))

  let KB = 1024
  let MB = KB * 1024 * 10

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10)
    setPageSize(newSize)
  }

  useEffect(() => {
    getData(search)
  }, [search])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      title: '',
      phone: '',
      image: ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required('Polje je obavezno...'),
      lastName: Yup.string().required('Polje je obavezno...'),
      email: Yup.string().required('Polje je obavezno...'),
      title: Yup.string().required('Polje je obavezno...'),
      phone: Yup.string().required('Polje je obavezno...'),
      image: Yup.mixed()
        .required('Polje je obavezno...')
        .test('fileSize', 'Wrong file size', (value) => value && value.size < MB * 10)
        .test('fileType', 'Wrong file type', (value) => value && VALID_TYPE.includes(value.type))
    }),

    onSubmit: async (values) => {
      console.log(values)
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
          setOpen(false)
          formik.resetForm()
          getData()
        })
        .catch((error) => {
          console.error('Greška prilikom registracije:', error.message)

          if (error.response) {
            console.error('Detalji greške:', error.response.data)
          }
          setOpen(false)
        })
    }
  })

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

  return (
    <div className="w-[100%] bg-[#fff] rounded-lg shadowBorder">
      <div className="w-full items-center md:justify-between flex flex-col gap-3 md:flex-row text-[13px] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h3>Koordinatori/Funkcioneri</h3>
            {user.role === 'admin' && (
              <button
                onClick={handleOpen}
                className="flex items-center gap-2 border border-main px-3 py-1 rounded-md bg-main text-[#fff]">
                <FaPlus /> Dodaj Novog Koordinatori/Funkcioneri
              </button>
            )}
            <div className="flex flex-row items-center gap-2 ">
              <span className="text-[13px]">Show</span>

              <select
                className="border border-1 rounded-full text-center bg-[#fff] px-3 py-1"
                onChange={handlePageSizeChange}
                defaultValue={12}>
                <option value={5}>5</option>
                <option value={12}>12</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative flex">
            <input
              type="text"
              className="border border-1 rounded-full px-2"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ime..."
            />
            <IoSearch className="absolute top-[6px] right-3" />
          </div>
          {/* <button className="flex items-center gap-2 border border-main px-3 py-1 rounded-md bg-main text-[#fff]">
            <TfiExport /> Izvezi
          </button> */}
        </div>
      </div>

      {open && (
        <>
          <div onClick={handleOpen} className="bg-lightGray absolute top-0 w-full h-full opacity-70"></div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col absolute top-[10%] left-[10%] right-[10%] md:left-[40vw]  bg-white z-10 shadow-lg rounded-lg p-5">
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
                <h3 className="text-[16px]">Profilna Slika</h3>
                <span className="text-[10px] text-spanGray">Profilna slika maksimalna veličina do 10MB</span>
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

                  <div className="flex flex-col items-center xl:items-start  justify-between">
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
                Dodaj Korisnika
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default SearchUser
