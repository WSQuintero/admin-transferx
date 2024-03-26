import React, { useContext, useEffect, useState } from "react"
import PopUp from "../PopUp"
import ConfirmationModal from "../ConfirmationModal"
import { formatDate } from "../../utils/Utils"
import { MyContext } from "../../context/context"
import clsx from "clsx"
import Messages from "../Messages"

function EditModalTickets({
  openModal,
  setOpenModal,
  page,
  actualTicket,
  setActualTicket
}) {
  const { token, $Tickets, setChangeTicket } = useContext(MyContext)
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmTicket, setConfirmTicket] = useState(false)
  const [openConfirmationModalTicket, setOpenConfirmationModalTicket] =
    useState(false)

  if (page === "tickets") {
    const endTicket = () => {
      setOpenConfirmationModalTicket(true)
    }

    const closePopUp = () => {
      setMessage("")
      setError(false)
      setSuccess(false)
    }

    useEffect(() => {
      if (error || success) {
        setTimeout(() => {
          closePopUp()
        }, 3000)
      }
    }, [error, success])

    useEffect(() => {
      setChangeTicket(false)
      if (confirmTicket) {
        const changeStatusTicket = async () => {
          const { status, data } = await $Tickets.closeTicket(token, {
            ticket: actualTicket?.id
          })
          if (status) {
            setChangeTicket(true)
            setSuccess(true)
            setMessage("Ticket cerrado correctamente")
          } else {
            setError(true)
            setMessage("Hubo un error al actualizar el ticket")
          }
        }

        changeStatusTicket()
        setTimeout(() => {
          setConfirmTicket(false)
          setOpenConfirmationModalTicket(false)
          setActualTicket(null)
          setOpenModal(false)
        }, 2000)
      }
    }, [confirmTicket])

    return (
      <>
        {openModal && (
          <div className="fixed z-50 w-full lg:w-[83%] 2xl:w-[87%] h-screen top-0 flex justify-center items-center bg-black/50">
            <div
              id="crud-modal"
              tabIndex="-1"
              aria-hidden="true"
              className="overflow-y-auto overflow-x-hidden dark:bg-[#C3F53C]/50 bg-white rounded-lg shadow flex flex-col justify-center items-center w-full h-full">
              <div className="relative w-[80%] max-h-[80%]">
                <div className="relative bg-black text-white   rounded-lg shadow w-full min-h-full p-4">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute top-5 right-5"
                    data-modal-toggle="crud-modal">
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div>
                    <Messages
                      actualTicket={actualTicket}
                      setActualTicket={setActualTicket}
                    />
                  </div>
                  <div className="mb-4 border flex flex-col border-[#C3F53C] p-2 pl-5">
                    <h3 className="text-[#C3F53C]">{actualTicket.title}</h3>
                    <p>
                      Tipo:{" "}
                      {actualTicket.type === "change_account_bank"
                        ? "Cambio información bancaria"
                        : "Cambio de wallet"}
                    </p>
                    <p>{actualTicket.description}</p>
                    <p>Creacion: {formatDate(actualTicket.createdAt)}</p>
                    <p>
                      última actualización: {formatDate(actualTicket.updatedAt)}
                    </p>
                    <p
                      className={clsx(
                        actualTicket.status === "closed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      )}>
                      {actualTicket.status === "closed" ? "Cerrado" : "Abierto"}
                    </p>

                    <button
                      type="button"
                      onClick={endTicket}
                      className="text-white mt-5 w-[300px] flex justify-center font-bold items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-lg px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
                      Cambiar estado de ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {openConfirmationModalTicket && (
              <ConfirmationModal
                setConfirm={setConfirmTicket}
                setOpenConfirmationModal={setOpenConfirmationModalTicket}
              />
            )}

            <PopUp
              message={message}
              error={error}
              success={success}
              closePopUp={closePopUp}
            />
          </div>
        )}
      </>
    )
  }
}

export default EditModalTickets
