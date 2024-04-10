import React, {useEffect, useRef, useState} from 'react'

import DashboardSettingsPassword from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsPassword/DashboardSettingsPassword'
import DashboardSettingsProfile from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsProfile/DashboardSettingsProfile'
import DashboardSettingsUser from '../../../../components/DashboardComponents/DashboardSettingsComponents/DashboardSettingsUser/DashboardSettingsUser'
import {MdArrowDownward} from 'react-icons/md'
import {PiUsersThree} from 'react-icons/pi'
import {TbUserSquareRounded} from 'react-icons/tb'
import {VscKey} from 'react-icons/vsc'

function DashboardSettingsMobile() {
  const user = JSON.parse(localStorage.getItem('rsm_user'))
  const [showProfile, setShowProfile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const handleItemClick = (item) => {
    setActiveItem(item)
  }

  const handleProfileClick = () => {
    setShowProfile(!showProfile)
    setShowPassword(false)
    setShowUser(false)
  }

  const handlePasswordClick = () => {
    setShowPassword(!showPassword)
    setShowProfile(false)
    setShowUser(false)
  }

  const handleUserClick = () => {
    setShowUser(!showUser)
    setShowPassword(false)
    setShowProfile(false)
  }

  return (
    <div className="mobile flex-col md:justify-center items-center h-[100svh]">
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col border border-1 border-main py-2 px-3 rounded-2xl bg-main">
            <p className="text-[#fff] text-[18px]">
              {user.firstName && user.firstName} {user.lastName && user.lastName}
            </p>
            <span className="text-[#fff] text-[12px]">{user.title ? user.title : 'Korisnik'}</span>
          </div>

          <div>
            <div className="mb-3">
              <div
                className={`flex gap-3 justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover dashboard ${
                  activeItem === 'profile' ? 'bg-main' : ''
                }`}
                onClick={() => {
                  handleItemClick('profile')
                  handleProfileClick()
                }}>
                <div className="flex items-center gap-3">
                  <TbUserSquareRounded className="text-5xl text-main bg-[#fff] rounded-xl" />
                  <div className="flex flex-col">
                    <p className={`text-[24px] ${activeItem === 'profile' ? 'text-[#fff]' : 'text-main'}`}>Profil</p>
                    <span className={`text-[12px] ${activeItem === 'profile' ? 'text-[#fff]' : 'text-spanGray'}`}>
                      Slika, Ime, Prezime, Email, Pozicija
                    </span>
                  </div>
                </div>
                <MdArrowDownward
                  className={`text-3xl arrow ${activeItem === 'profile' ? 'text-[#fff]' : 'text-main'}`}
                />
              </div>
            </div>

            {showProfile && <DashboardSettingsProfile />}
          </div>

          <div>
            <div className="mb-3">
              <div
                className={`flex gap-3 justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                  activeItem === 'password' ? 'bg-main' : ''
                }`}
                onClick={() => {
                  handleItemClick('password')
                  handlePasswordClick()
                }}>
                <div className="flex items-center gap-3">
                  <VscKey className="text-5xl text-main bg-[#fff] rounded-xl" />
                  <div className="flex flex-col">
                    <p className={`text-[24px] ${activeItem === 'password' ? 'text-[#fff]' : 'text-main'}`}>Lozinka</p>
                    <span className={`text-[12px] ${activeItem === 'password' ? 'text-[#fff]' : 'text-spanGray'}`}>
                      Zamena Lozinke
                    </span>
                  </div>
                </div>
                <MdArrowDownward
                  className={`text-3xl arrow ${activeItem === 'password' ? 'text-[#fff]' : 'text-main'}`}
                />
              </div>
            </div>

            {showPassword && <DashboardSettingsPassword />}
          </div>

          <div>
            <div className="mb-3">
              <div
                className={`flex gap-3 justify-between border border-1 border-[#D6D9D9] items-center p-3 rounded-3xl divHover ${
                  activeItem === 'user' ? 'bg-main' : ''
                }`}
                onClick={() => {
                  handleItemClick('user')
                  handleUserClick()
                }}>
                <div className="flex items-center gap-3">
                  <PiUsersThree className="text-5xl text-main bg-[#fff] rounded-xl" />
                  <div className="flex flex-col">
                    <p className={`text-[24px] ${activeItem === 'user' ? 'text-[#fff]' : 'text-main'}`}>Korisnici</p>
                    <span className={`text-[12px] ${activeItem === 'user' ? 'text-[#fff]' : 'text-spanGray'}`}>
                      Dodavanje koordinatora/funkcionera
                    </span>
                  </div>
                </div>
                <MdArrowDownward className={`text-3xl arrow ${activeItem === 'user' ? 'text-[#fff]' : 'text-main'}`} />
              </div>
            </div>

            {showUser && <DashboardSettingsUser />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSettingsMobile
