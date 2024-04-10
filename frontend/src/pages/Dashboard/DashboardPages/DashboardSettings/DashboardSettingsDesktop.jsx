import React, {useState} from 'react'

import DashboardSettingsInfo from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsInfo/DashboardSettingsInfo'
import DashboardSettingsPassword from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsPassword/DashboardSettingsPassword'
import DashboardSettingsProfile from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsProfile/DashboardSettingsProfile'
import DashboardSettingsUser from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsUser/DashboardSettingsUser'
import {FaInfo} from 'react-icons/fa'
import {MdArrowForward} from 'react-icons/md'
import {PiUsersThree} from 'react-icons/pi'
import {TbUserSquareRounded} from 'react-icons/tb'
import {VscKey} from 'react-icons/vsc'

function DashboardSettingsDesktop() {
  const user = JSON.parse(localStorage.getItem('rsm_user'))
  const [showProfile, setShowProfile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const handleProfileClick = () => {
    setShowProfile(true)
    setShowPassword(false)
    setShowUser(false)
    setShowInfo(false)
  }

  const handlePasswordClick = () => {
    setShowPassword(true)
    setShowProfile(false)
    setShowUser(false)
    setShowInfo(false)
  }

  const handleUserClick = () => {
    setShowUser(true)
    setShowPassword(false)
    setShowProfile(false)
    setShowInfo(false)
  }

  const handleInfoClick = () => {
    setShowInfo(true)
    setShowUser(false)
    setShowPassword(false)
    setShowProfile(false)
  }

  const handleItemClick = (item) => {
    setActiveItem(item)
  }

  return (
    <div className="desktop">
      <h2 className="text-[40px] font-bold mb-[50px]">Podešavanja</h2>
      <div className="flex gap-10">
        <div className="flex flex-col gap-10">
          <div className="border border-1 border-main w-[350px] items-center p-4 rounded-2xl bg-main shadowBorder">
            <p className="text-[#fff] text-[22px]">
              {user.firstName && user.firstName} {user.lastName && user.lastName}
            </p>
            <span className="text-[#fff] text-[16px]">{user.title ? user.title : 'Korisnik'}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div
                className={`flex w-[350px] justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                  activeItem === 'profile' ? 'bg-main' : ''
                }`}
                onClick={() => {
                  handleItemClick('profile')
                  handleProfileClick()
                }}>
                <div className="flex items-center gap-5">
                  <TbUserSquareRounded className="text-5xl text-main bg-[#fff] rounded-xl" />
                  <div className="flex flex-col">
                    <p className={`text-[24px] ${activeItem === 'profile' ? 'text-[#fff]' : 'text-main'}`}>
                      {user.role === 'admin' ? 'Administrator' : 'Profil'}
                    </p>
                    <span className={`text-[12px] ${activeItem === 'profile' ? 'text-[#fff]' : 'text-spanGray'}`}>
                      Slika, Ime, Prezime, Email, Pozicija
                    </span>
                  </div>
                </div>
                <MdArrowForward
                  className={`text-3xl arrow ${activeItem === 'profile' ? 'text-[#fff]' : 'text-main'}`}
                />
              </div>
              <div
                className={`flex w-[350px] justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                  activeItem === 'password' ? 'bg-main' : ''
                }`}
                onClick={() => {
                  handleItemClick('password')
                  handlePasswordClick()
                }}>
                <div className="flex items-center gap-5">
                  <VscKey className="text-5xl text-main bg-[#fff] rounded-xl" />
                  <div>
                    <p className={`text-[24px] ${activeItem === 'password' ? 'text-[#fff]' : 'text-main'}`}>Lozinka</p>
                    <span className={`text-[12px] ${activeItem === 'password' ? 'text-[#fff]' : 'text-spanGray'}`}>
                      Zamena Lozinke
                    </span>
                  </div>
                </div>
                <MdArrowForward
                  className={`text-3xl arrow ${activeItem === 'password' ? 'text-[#fff]' : 'text-main'}`}
                />
              </div>
              {user.role === 'admin' && (
                <>
                  <div
                    className={`flex w-[350px] justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                      activeItem === 'user' ? 'bg-main' : ''
                    }`}
                    onClick={() => {
                      handleItemClick('user')
                      handleUserClick()
                    }}>
                    <div className="flex items-center gap-5">
                      <PiUsersThree className="text-5xl text-main bg-[#fff] rounded-xl" />
                      <div>
                        <p className={`text-[24px] ${activeItem === 'user' ? 'text-[#fff]' : 'text-main'}`}>
                          Funkcioneri
                        </p>
                        <span className={`text-[12px] ${activeItem === 'user' ? 'text-[#fff]' : 'text-spanGray'}`}>
                          Dodavanje koordinatora/funkcionera
                        </span>
                      </div>
                    </div>
                    <MdArrowForward
                      className={`text-3xl arrow ${activeItem === 'user' ? 'text-[#fff]' : 'text-main'}`}
                    />
                  </div>

                  <div
                    className={`flex w-[350px] justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                      activeItem === 'info' ? 'bg-main' : ''
                    }`}
                    onClick={() => {
                      handleItemClick('info')
                      handleInfoClick()
                    }}>
                    <div className="flex items-center gap-5">
                      <FaInfo className="text-5xl text-main bg-[#fff] rounded-xl" />
                      <div>
                        <p className={`text-[24px] ${activeItem === 'info' ? 'text-[#fff]' : 'text-main'}`}>
                          Unos podataka
                        </p>
                        <span className={`text-[12px] ${activeItem === 'info' ? 'text-[#fff]' : 'text-spanGray'}`}>
                          Dodavanje Podataka
                        </span>
                      </div>
                    </div>
                    <MdArrowForward
                      className={`text-3xl arrow ${activeItem === 'info' ? 'text-[#fff]' : 'text-main'}`}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {showProfile && <DashboardSettingsProfile />}
        {showPassword && <DashboardSettingsPassword />}
        {showUser && <DashboardSettingsUser />}
        {showInfo && <DashboardSettingsInfo />}
      </div>
    </div>
  )
}

export default DashboardSettingsDesktop
