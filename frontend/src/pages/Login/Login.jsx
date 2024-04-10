import * as Yup from 'yup'

import {Link, useNavigate} from 'react-router-dom'
import React, {useEffect, useState} from 'react'

import {BounceLoader} from 'react-spinners'
import {IoIosLock} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'
import {MdOutlineVisibility} from 'react-icons/md'
import {MdOutlineVisibilityOff} from 'react-icons/md'
import UserService from '../../services/userService'
import {loginUser} from '../../store/userSlice'
import logo from '../../assets/Logo-compress.png'
import mapa from '../../assets/map icon-min.png'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'

function Login() {
  const [isVisible, setSsVisible] = useState(true)
  let [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  const handleVisibility = () => {
    setSsVisible(!isVisible)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: ''
    },

    validationSchema: Yup.object({
      email: Yup.string().required('Polje je obavezno...'),
      password: Yup.string().required('Polje je obavezno...'),
      rememberMe: Yup.string().required('Polje je obavezno...')
    }),

    onSubmit: (values) => {
      UserService.loginUser(values)
        .then((res) => {
          if (res.status === 200) {
            toast.success('Korisnik se uspešno prijavio...', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })

            setIsLoading(true)

            setTimeout(() => {
              localStorage.setItem('rsm_token', res.data.token)
              dispatch(loginUser(res.data.user))
              navigate('/map')
              setIsLoading(false)
            }, 3000)
          } else {
            toast.warning('Korisnik nije prijavljen...', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light'
            })
          }
        })
        .catch((err) => {
          toast.error(err.response.data.msg, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        })

      formik.resetForm()
    }
  })

  const showError = (name) => formik.errors[name] && formik.touched[name] && formik.errors[name]

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[100vh]">
          <BounceLoader color="#222477" className="spin" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center h-[100vh] gap-5 md:gap-[100px] xl:gap-[200px] iPSE">
          <div className='w-[400px]'>
            {/* <img src={mapa} alt="" className="w-[400px] logo" /> */}
          </div>

          <div className="px-[80px] pt-[50px] pb-[100px] rounded-xl shadowBorder iPSep bg-[#fff]">
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
              <div className="flex justify-center">
                <img src={logo} alt="" className="w-[250px] map" />
              </div>

              <div className="flex flex-col relative">
                <label>
                  E-mail Adresa: <span className="text-red italic text-[14px]">{showError('email')}</span>
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  type="email"
                  name="email"
                  placeholder="Unesite vašu e-mail adresu..."
                  className="border border-2 border-[#0000000D] shadow-lg rounded py-2 pl-[40px]"
                />
                <MdEmail className="absolute top-[45%] left-4 translate-y-[50%] text-main" />
              </div>

              <div className="flex flex-col relative">
                <label>
                  Lozinka <span className="text-red italic text-[14px]">{showError('password')}</span>
                </label>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type={isVisible ? 'password' : 'text'}
                  name="password"
                  placeholder="Unesite vašu lozinku..."
                  className="border border-2 border-[#0000000D] shadow-lg rounded py-2 pl-[40px]"
                />
                <IoIosLock className="absolute top-[45%] left-4 translate-y-[50%] text-main" />
                {isVisible ? (
                  <MdOutlineVisibility
                    onClick={handleVisibility}
                    className="absolute top-[45%] right-4 translate-y-[50%] text-main"
                  />
                ) : (
                  <MdOutlineVisibilityOff
                    onClick={handleVisibility}
                    className="absolute top-[45%] right-4 translate-y-[50%] text-main"
                  />
                )}
              </div>

              <div>
                <input
                  value={formik.values.checkbox}
                  onChange={formik.handleChange}
                  type="checkbox"
                  name="rememberMe"
                />
                <span>
                  {' '}
                  Zapamti me! <span className="text-red italic text-[14px]">{showError('rememberMe')}</span>
                </span>
              </div>

              <button
                type="submit"
                className="py-2 rounded-full bg-primary text-[#fff] hover:bg-secondMain hover:border-secondMain">
                Prijavite se
              </button>
              <div className="text-center">{/* <Link><span>Zaboravili ste lozinku?</span></Link> */}</div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
