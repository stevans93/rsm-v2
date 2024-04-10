import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {FaUserCircle} from 'react-icons/fa'
import {TfiMenu} from 'react-icons/tfi'
import {logOutUser} from '../../store/userSlice'
import logo from '../../assets/Logo-compress.png'
import {toast} from 'react-toastify'

function Navigation() {
  const user = JSON.parse(localStorage.getItem('rsm_user'))
  const [dropDown, setDropDown] = useState(false)
  const dropDownRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const dropDownRefNew = useRef()

  const handleDropDown = () => {
    setDropDown(!dropDown)
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
    toast.success('Korisnik se uspešno odjavio...', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
    navigate('/')
  }

  useEffect(() => {
    if (dropDownRef.current) {
      dropDownRef.current.style.maxHeight = dropDown ? `${dropDownRef.current.scrollHeight}px` : 0
    }

    const handleClickOutside = (event) => {
      if (dropDownRefNew.current && !dropDownRefNew.current.contains(event.target)) {
        setDropDown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [dropDown])

  if (location.pathname === '/') {
    return null
  }

  return (
    <div ref={dropDownRefNew} className="rounded-2xl shadow bg-[#fff] px-[20px] py-[10px] mx-[20px] mt-[20px]">
      <div>
        <div className="flex justify-center md:hidden">
          <TfiMenu className="text-3xl cursor-pointer" onClick={handleDropDown} />
        </div>

        <div
          ref={dropDownRef}
          className="flex  flex-col text-center overflow-hidden transition-max-h duration-300 ease-in md:hidden mt-4 gap-3">
          <button
            onClick={handleLogOut}
            className="border border-2 rounded-2xl px-[30px] py-[10px] border-red text-red hover:bg-red hover:text-[#fff]">
            Odjavi se
          </button>
          <NavLink
            onClick={handleDropDown}
            to="/dashboard"
            className="border border-2 border-main bg-main px-[30px] py-[10px] text-[#fff] rounded-2xl hover:bg-secondMain hover:border-secondMain btn">
            Kontrolna tabla
          </NavLink>
          <div>
            <FaUserCircle className="text-main text-[50px] mx-auto" />
            <p className="text-main font-bold">
              {user.firstName} {user.lastName}
            </p>
            <span className="text-[12px] text-grey">{user.title ? user.title : 'Korisnik'}</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={handleLogOut}
            className="border border-2 rounded-2xl px-[30px] py-[10px] border-red text-red hover:bg-red hover:text-[#fff]">
            Odjavi se
          </button>
          <NavLink
            to="/dashboard"
            className="border border-2 border-main bg-main px-[30px] py-[10px] text-[#fff] rounded-2xl hover:bg-secondMain hover:border-secondMain btn">
            Kontrolna tabla
          </NavLink>
        </div>

        <div>
          <img src={logo} alt="logo" className="w-[70px]" />
        </div>

        <div className="flex gap-3">
          {user.profileImage ? (
            <label className="relative  bg-white border border-spanGray  h-[50px] overflow-hidden rounded-full">
              <img
                id="image-preview"
                src={user.profileImage ? import.meta.env.VITE_IMAGE_URL + user.profileImage : ''}
                alt="Preview"
                className={`w-full h-full object-cover ${user.profileImage ? '' : 'hidden'}`}
              />
            </label>
          ) : (
            <FaUserCircle className="text-main text-[50px] mx-auto" />
          )}
          <div>
            <p className="text-main font-bold">
              {user.firstName} {user.lastName}
            </p>
            <span className="text-[12px] text-grey">{user.title ? user.title : 'Korisnik'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
