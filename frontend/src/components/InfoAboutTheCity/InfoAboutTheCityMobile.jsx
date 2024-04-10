import React from 'react'
import {RxCross1} from 'react-icons/rx'

function InfoAboutTheCityMobile({closeModal, cityInfo}) {
  return (
    <div className="flex flex-col w-[340px] gap-5 p-3 shadow rounded-2xl bg-[#fff]">
      <div className="flex justify-between">
        <div>
          <h2 className="text-main text-[35px] font-bold">{cityInfo?.municipality}</h2>
          <p className="text-[12px] text-spanGray">Okrug: {cityInfo?.district}</p>
        </div>
        <div>
          <div className="border border-2 p-1 rounded-2xl text-spanGray hover:text-main" onClick={closeModal}>
            <RxCross1 />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <img
            src={import.meta.env.VITE_IMAGE_URL + cityInfo.image}
            alt="img"
            className="w-[140px] h-[140px] rounded-2xl shadow"
          />
        </div>

        <div className="flex flex-col gap-3 mr-14">
          <p className="text-[14px]">
            Gradonačelnik/Predsednik opštine: <span className="text-spanGray">{cityInfo?.fullNameOfThePresident}</span>{' '}
          </p>
          <p className="text-[14px]">
            Zamimanje: <span className="text-spanGray">{cityInfo?.profession}</span>{' '}
          </p>
          <p className="text-[14px]">
            Email: <span className="text-spanGray">{cityInfo?.email}</span>{' '}
          </p>
          <p className="text-[14px]">
            Telefon: <span className="text-spanGray">{cityInfo?.phone}</span>{' '}
          </p>
          <p className="text-[14px]">
            Broj Gradskih/opštinskih funkcionera:{' '}
            <span className="text-spanGray">{cityInfo?.fullNumberOfOfficials}</span>{' '}
          </p>
          <p className="text-[14px]">
            Broj evidentiranih predstavki građana:{' '}
            <span className="text-spanGray">{cityInfo?.fullNumberOfApplications}</span>{' '}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <a
            target="_blank"
            href={`${import.meta.env.VITE_IMAGE_URL}${cityInfo?.numberOfOfficials}`}
            className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]"
            rel="noreferrer">
            Gradski/Opštinski funkcioneri – Baza
          </a>
          <a
            target="_blank"
            href={`${import.meta.env.VITE_IMAGE_URL}${cityInfo?.numberOfOfficials}`}
            rel="noreferrer"
            className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]">
            Predsetavke građana – Baza
          </a>
          <a
            target="_blank"
            href={cityInfo.website}
            className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]"
            rel="noreferrer">
            Sajt opštine – Link
          </a>
        </div>
      </div>
    </div>
  )
}

export default InfoAboutTheCityMobile
