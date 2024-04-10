import * as Yup from 'yup'

import {FaUpload, FaUserCircle} from 'react-icons/fa'

import UserService from '../../../../services/userService'
import {toast} from 'react-toastify'
import {useFormik} from 'formik'

function DashboardSettingsProfile() {
  const user = JSON.parse(localStorage.getItem('rsm_user'))

  const VALID_TYPE = ['image/jpeg', 'image/jpg', 'image/png']
  let KB = 1024
  let MB = KB * 1024 * 10

  // const [eventImage, setEventImage] = useState(null)

  const formik = useFormik({
    initialValues: {
      firstName: '' || user?.firstName,
      lastName: '' || user?.lastName,
      email: '' || user?.email,
      title: '' || user?.title,
      phone: '' || user?.phone,
      profileImage: '' || user?.profileImage
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Polje je obavezno...'),
      lastName: Yup.string().required('Polje je obavezno...'),
      email: Yup.string().required('Polje je obavezno...'),
      title: Yup.string().required('Polje je obavezno...'),
      phone: Yup.string().required('Polje je obavezno...')
      // profileImage: Yup.mixed()
      //   .test('fileSize', 'Wrong file size', (value) => !(value && value?.size < MB * 2))
      //   .test('fileType', 'Wrong file type', (value) => !(value && VALID_TYPE.includes(value?.type)))
    }),

    onSubmit: (values) => {
      const {profileImage, ...newValues} = values

      const formData = new FormData()
      formData.append('file', profileImage)
      Object.entries(newValues).forEach((obj) => formData.append(obj[0], obj[1]))

      UserService.editUser(formData)
        .then((res) => {
          toast.success('Podaci uspešno ažurirana')
          localStorage.setItem('rsm_user', JSON.stringify(res.data))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

  const getImage = (image) => {
    if (typeof image === 'object') return URL.createObjectURL(image)
    if (typeof image === 'string') return import.meta.env.VITE_IMAGE_URL + image
  }

  return (
    <div className={`!bg-[#fff] p-5 rounded-3xl shadowBorder w-[310px] lg:w-[500px] mx-auto dashboard`}>
      <div className="w-[50%]">
        <h2 className="text-[22px] text-main">{user?.role === 'admin' ? 'Administrator' : 'Profil'}</h2>
        <p className="text-[10px] text-spanGray">
          Podešavanja vaseg profila možete uraditi ovde ovo je vidljivo samo vama.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-[30px] text-center">
        <div className="flex flex-col items-start">
          <div className="flex text-left mb-[30px] gap-5">
            <label className="relative cursor-pointer bg-white border border-spanGray w-[100px] h-[100px] overflow-hidden rounded-xl">
              <img
                id="image-preview"
                src={formik.values?.profileImage ? getImage(formik.values?.profileImage) : ''}
                alt="Preview"
                className={`w-full h-full object-cover ${formik.values?.profileImage ? '' : 'hidden'}`}
              />
              {!formik.values?.profileImage && (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <FaUpload />
                  <span className="text-gray-400 mt-2 text-[11px]">Otpremi Sliku</span>
                </div>
              )}
              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    console.log('e.target.files')
                    console.log(e.target.files)
                    formik.setFieldValue('profileImage', e.target.files[0])
                  }
                }}
                type="file"
                name="profileImage"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </label>
            <div>
              <h3 className="text-[16px]">Slika {user?.role === 'admin' ? 'Administratora' : 'Profila'} </h3>
              <span className="text-[10px] text-spanGray">
                Slika {user?.role === 'admin' ? 'administratora' : 'profila'} maksimalna veličina do 10MB
              </span>
              <span className="text-red italic text-[13px]">{showError('image')}</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-5 w-[60%] lg:w-[80%]">
            <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
              <label>
                Ime <span className="text-red italic text-[13px]">{showError('firstName')}</span>
              </label>
              <input
                value={formik.values?.firstName}
                onChange={formik.handleChange}
                name="firstName"
                type="text"
                className="border border-1 border-main rounded-xl px-3 py-2"
                placeholder="Ime..."
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
              <label>
                Prezime <span className="text-red italic text-[13px]">{showError('lastName')}</span>
              </label>
              <input
                value={formik.values?.lastName}
                onChange={formik.handleChange}
                name="lastName"
                type="text"
                className="border border-1 border-main rounded-xl px-3 py-2"
                placeholder="Prezime..."
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
              <label>
                Email <span className="text-red italic text-[13px]">{showError('email')}</span>
              </label>
              <input
                value={formik.values?.email}
                onChange={formik.handleChange}
                name="email"
                type="email"
                className="border border-1 border-main rounded-xl px-3 py-2"
                placeholder="Email..."
              />
            </div>

            {user?.role === 'admin' && (
              <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
                <label>
                  Pozicija <span className="text-red italic text-[13px]">{showError('title')}</span>
                </label>
                <select
                  value={formik.values?.title}
                  onChange={formik.handleChange}
                  name="title"
                  className="border border-1 border-main rounded-xl px-3 py-2 w-auto lg:w-[49%]">
                  <option value="" disabled>
                    Select Poziciju...
                  </option>
                  <option value="admin">Admin</option>
                  <option value="funkcioner">Funkcioner</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            )}
            <div className="flex flex-col lg:flex-row items-center w-[100%] justify-between">
              <label>
                Telefon <span className="text-red italic text-[13px]">{showError('phone')}</span>
              </label>
              <input
                value={formik.values?.phone}
                onChange={formik.handleChange}
                name="phone"
                type="text"
                className="border border-1 border-main rounded-xl px-3 py-2"
                placeholder="Telefon..."
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-[30px] border border-1 border-main px-10 py-2 rounded-xl text-main hover:bg-main hover:text-[#fff]">
          Sačuvaj
        </button>
      </form>
    </div>
  )
}

export default DashboardSettingsProfile
