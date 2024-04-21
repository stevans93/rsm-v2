import {RxCross1} from 'react-icons/rx'

function InfoAboutTheCity({closeModal, cityInfo}) {
  const cityInfoObj = Array.isArray(cityInfo) ? cityInfo[0] : cityInfo;

  return (
    <div className="bg-[#fff] w-[980px] h-[380px] rounded-2xl shadow p-[30px] relative mx-auto  ">
      <div className="flex flex-col h-[100%] justify-between">
        <div className="flex w-full">
          <div className="flex flex-col gap-1">
            <h2 className="text-main text-[35px] font-bold">{cityInfoObj?.municipality}</h2>
            <p className="text-[12px] text-spanGray">Okrug: {cityInfoObj?.district}</p>
          </div>
          <div className="absolute top-5 right-5">
            <div className="border border-2 p-1 rounded-2xl text-spanGray hover:text-main" onClick={closeModal}>
              <RxCross1 />
            </div>
          </div>
        </div>

        <div className="flex gap-10 pt-6">
          <div>
            <img src={import.meta.env.VITE_IMAGE_URL + cityInfoObj?.image} alt="img" className="rounded-2xl shadow" />
          </div>

          <div className="flex w-[60%] flex-col gap-3 ">
            <p className="text-[14px]">
              Gradonačelnik/Predsednik opštine:{' '}
              <span className="text-spanGray">{cityInfoObj?.fullNameOfThePresident}</span>{' '}
            </p>
            <p className="text-[14px]">
              Zanimanje: <span className="text-spanGray">{cityInfoObj?.profession}</span>{' '}
            </p>
            <p className="text-[14px]">
              Email: <span className="text-spanGray">{cityInfoObj?.email}</span>{' '}
            </p>
            <p className="text-[14px]">
              Telefon: <span className="text-spanGray">{cityInfoObj?.phone}</span>{' '}
            </p>
            <p className="text-[14px]">
              Broj Gradskih/opštinskih funkcionera:{' '}
              <span className="text-spanGray">{cityInfoObj?.fullNumberOfOfficials}</span>{' '}
            </p>
            <p className="text-[14px]">
              Broj evidentiranih predstavki građana:{' '}
              <span className="text-spanGray">{cityInfoObj?.fullNumberOfApplications}</span>{' '}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center">
            <a
              target="_blank"
              href={`${cityInfoObj?.numberOfOfficials}`}
              className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]"
              rel="noreferrer">
              Gradski/Opštinski funkcioneri – Baza
            </a>
            <a
              target="_blank"
              href={`${cityInfoObj?.numberOfOfficials}`}
              rel="noreferrer"
              className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]">
              Predsetavke građana – Baza
            </a>
            <a
              target="_blank"
              href={cityInfoObj.website}
              className=" border-2 border-main px-[30px] py-[10px] text-main text-[14px] rounded-2xl hover:bg-main hover:border-main hover:text-[#fff]"
              rel="noreferrer">
              Sajt opštine – Link
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoAboutTheCity
