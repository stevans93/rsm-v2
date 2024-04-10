import {FaCity, FaUserCircle} from 'react-icons/fa'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useEffect, useRef, useState} from 'react'

import {IoIosArrowBack} from 'react-icons/io'
import {IoSettingsOutline} from 'react-icons/io5'
import {PiUsersThree} from 'react-icons/pi'
import {TfiMenu} from 'react-icons/tfi'
import {logOutUser} from '../../../store/userSlice'
import logo from '../../../assets/Logo-compress.png'
import {useDispatch} from 'react-redux'

function DashboardSidebar() {
  const user = JSON.parse(localStorage.getItem('rsm_user'))
  const [dropDown, setDropDown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dropDownRef = useRef(null)
  const handleDropDown = () => {
    setDropDown(!dropDown)
  }

  const handleLogOut = () => {
    dispatch(logOutUser())
    navigate('/')
  }

  useEffect(() => {
    if (dropDownRef.current) {
      dropDownRef.current.style.maxHeight = dropDown ? `${dropDownRef.current.scrollHeight}px` : 0
    }
  }, [dropDown])

  return (
    <div className="bg-[#F0F0F0] md:bg-[#fff] sm:w-[30%] md:w-[40%] lg:w-[20%] sm:fixed">
      <div className="h-[100svh] px-5 py-10 hidden md:flex md:flex-col items-center md:justify-between">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <Link
              to="/map"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-[#F0F0F0] hover:bg-[#A8A8A8] rounded-full px-5 py-1 text-center">
              <IoIosArrowBack /> Mapa
            </Link>
            <img src={logo} alt="logo" className="w-[70px]" />
          </div>
          <div>
            <p className="text-main text-center text-2xl font-bold">KONTROLNA TABLA</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <NavLink
              to="/dashboard/"
              className="flex justify-start items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]">
              <IoSettingsOutline /> Podešavanja
            </NavLink>
            <NavLink
              to="/dashboard/userList"
              className="flex justify-start items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]">
              <PiUsersThree /> Koordinatori/Funkcioneri
            </NavLink>
            <NavLink
              to="/dashboard/cityList"
              className="flex justify-start items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]">
              <FaCity /> Gradovi/Opštine
            </NavLink>
            <NavLink
              to="/dashboard/cityBelgrade"
              className="flex justify-start items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]">
              <FaCity /> Beogradske Opštine
            </NavLink>
            {/* <a
              target="_blank"
              href="https://cloud.digitalhousepower.rs/index.php/s/fJjkGSo6L2qf86d"
              className="flex justify-center text-center items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]"
              rel="noreferrer">
              Beograd Gradski Funkcioneri
            </a> */}
            <a
              target="_blank"
              href="https://cloud.digitalhousepower.rs/index.php/s/fmmDe3fL47ge9KS"
              className="flex justify-start items-center text-main gap-3 text-[20px] border border-2 rounded-full w-[100%] py-2 px-2 border-main text-main hover:bg-main hover:text-[#fff]"
              rel="noreferrer">
              <FaCity />
              RSG Baza
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-3">
            {user.profileImage ? (
              <label className="relative  bg-white border border-spanGray  h-[70px] overflow-hidden rounded-full">
                <img
                  id="image-preview"
                  src={user.profileImage ? import.meta.env.VITE_IMAGE_URL + user.profileImage : ''}
                  alt="Preview"
                  className={`w-full h-full object-cover ${user.profileImage ? '' : 'hidden'}`}
                />
              </label>
            ) : (
              <FaUserCircle className="text-main text-[70px] mx-auto" />
            )}
            <div className="flex flex-col justify-center">
              <p className="text-main font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-[12px] text-grey">{user.title ? user.title : 'Korisnik'}</span>
            </div>
          </div>
          <div className="flex text-center">
            <button
              onClick={handleLogOut}
              className="border border-2 w-[100%] rounded-2xl py-[2px] text-red hover:bg-red hover:text-[#fff]">
              Odjavi se
            </button>
          </div>
        </div>
      </div>

      <div
        onClick={handleDropDown}
        className="md:hidden flex flex-col text-center rounded-2xl shadow bg-[#fff] px-[20px] py-[10px] mx-[20px] mt-[20px] gap-5">
        <div className="flex justify-center md:hidden mt-4">
          <TfiMenu className="text-3xl cursor-pointer" />
        </div>
        <div
          ref={dropDownRef}
          className="flex flex-col gap-3 overflow-hidden transition-max-h duration-300 ease-in md:hidden">
          <Link
            to="/map"
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center items-center bg-[#F0F0F0] hover:bg-[#A8A8A8] rounded-full px-5 py-[5px] text-center">
            <IoIosArrowBack /> Mapa
          </Link>
          <NavLink
            to="/dashboard/"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]">
            Podešavanja
          </NavLink>
          <NavLink
            to="/dashboard/userList"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]">
            Koordinatori/Funkcioneri
          </NavLink>
          <NavLink
            to="/dashboard/cityList"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]">
            Gradovi/Opštine
          </NavLink>
          <NavLink
            to="/dashboard/cityBelgrade"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]">
            Beogradske Opštine
          </NavLink>
          {/* <a
            target="_blank"
            href="https://cloud.digitalhousepower.rs/index.php/s/fJjkGSo6L2qf86d"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]"
            rel="noreferrer">
            Beograd Gradski Funkcioneri
          </a> */}
          <a
            target="_blank"
            href="https://cloud.digitalhousepower.rs/index.php/s/fmmDe3fL47ge9KS"
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-main text-main hover:bg-main hover:text-[#fff]"
            rel="noreferrer">
            RSG Baza
          </a>
          <button
            onClick={handleLogOut}
            className="border border-2 rounded-2xl px-[30px] py-[5px] border-red text-red hover:bg-red hover:text-[#fff]">
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
