import React from "react"

function ConfirmationModal({ setConfirm, setOpenConfirmationModal }) {
  return (
    <div className=" z-50 w-full h-full flex justify-center xl:pr-[100px] items-center fixed  top-0 bg-black/80">
      <div className="w-[50%] h-[50%] ">
        <article className="border border-[#C3F53C] p-10 bg-black  gap-5 ">
          <p className="text-center  text-white font-bold mb-16 text-lg">
            ¿Deseas confirmar la operación?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setOpenConfirmationModal(false)
              }}
              className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl">
              Rechazar
            </button>
            <button
              className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
              onClick={() => setConfirm(true)}>
              Confirmar
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ConfirmationModal
