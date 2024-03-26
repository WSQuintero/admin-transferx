import React, { useContext, useEffect, useState } from "react"
import PopUp from "../PopUp"
import ConfirmationModal from "../ConfirmationModal"
import { MyContext } from "../../context/context"

function EditModalTransactions({ openModal, setOpenModal, page, actualOrder }) {
  const { token, $Orders, setIsRejectTransaction } = useContext(MyContext)
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [file, setFile] = useState(null)
  const [text, setText] = useState("")
  const [confirmOrder, setConfirmOrder] = useState(false)
  const [rejectOrder, setRejectOrder] = useState(false)
  const [actualOptionOrder, setActualOptionOrder] = useState(undefined)
  const [openConfirmationModalOrder, setOpenConfirmationModalOrder] =
    useState(false)
  const [
    openConfirmationModalOrderReject,
    setOpenConfirmationModalOrderReject
  ] = useState(false)

  if (page === "transactions") {
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
    }

    const handleTextChange = (event) => {
      const newText = event.target.value
      setText(newText)
    }

    const closePopUp = () => {
      setMessage("")
      setError(false)
      setSuccess(false)
    }

    const approveOrder = async () => {
      closePopUp()
      setOpenConfirmationModalOrder(true)
    }

    const rejectedOrder = async () => {
      if (actualOrder?.state === "pending") {
        setOpenConfirmationModalOrderReject(true)
      } else {
        setMessage(
          "La orden está en progreso, completada o rechazada; por lo tanto, ya no se puede cancelar"
        )
        setError(true)
        return
      }
    }

    useEffect(() => {
      if (error || success) {
        setTimeout(() => {
          closePopUp()
        }, 3000)
      }
    }, [error, success])

    useEffect(() => {
      if (confirmOrder) {
        const formData = new FormData()
        formData.append("orderP2P", actualOrder?.id)
        formData.append(
          "file",
          new Blob([file.buffer], {
            filename: file.originalname,
            contentType: file.mimetype
          }),
          {
            filename: file.originalname,
            contentType: file.mimetype
          }
        )

        const approveOrder = async () => {
          const { status, data } = await $Orders.approveP2P(token, formData)

          if (status) {
            setMessage("Orden aprobada correctamente")
            setSuccess(true)
          } else {
            setMessage("No fue posible actualizar la orden")
            setError(true)
          }
        }
        approveOrder()
        setTimeout(() => {
          setConfirmOrder(false)
          setOpenConfirmationModalOrder(false)
          setOpenModal(false)
        }, 2000)
      }
    }, [confirmOrder])

    useEffect(() => {
      if (rejectOrder) {
        closePopUp()
        const formData = {
          oderP2P: actualOrder.id,
          description: text
        }

        const sendRejectOrder = async () => {
          setIsRejectTransaction(false)
          const { status, data } = await $Orders.rejectP2P(token, formData)

          if (status) {
            setMessage("Orden rechazada correctamente")
            setSuccess(true)
            setIsRejectTransaction(true)
          } else {
            setMessage("No fue posible actualizar la orden")
            setError(true)
          }
        }
        sendRejectOrder()
        setTimeout(() => {
          setRejectOrder(false)
          setOpenConfirmationModalOrderReject(false)
          setOpenModal(false)
        }, 2000)
      }
    }, [rejectOrder])

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
                  <TabsComponentTransactions
                    setActualOption={setActualOptionOrder}
                    actualOption={actualOptionOrder}
                  />
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
                  {actualOptionOrder === "approve" && (
                    <div className="mb-4">
                      <label
                        className="block text-white text-sm font-bold mb-2 mt-10"
                        for="approve">
                        Aprobar
                      </label>
                      <input
                        type="file"
                        id="approve"
                        name="approve"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-white/80 leading-tight focus:outline-none focus:shadow-outline "
                      />
                      <button
                        type="button"
                        onClick={approveOrder}
                        className="text-white mt-5 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
                        Aprobar
                      </button>
                    </div>
                  )}
                  {actualOptionOrder === "reject" && (
                    <div className="mb-4 mt-10">
                      <label
                        className="block text-white text-sm font-bold mb-2"
                        for="reject">
                        Rechazar
                      </label>
                      <textarea
                        type="text"
                        id="reject"
                        name="reject"
                        onChange={handleTextChange}
                        className="shadow appearance-none border border-[#C3F53C] rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={rejectedOrder}
                        className="text-white mt-5 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {openConfirmationModalOrder && (
              <ConfirmationModal
                setConfirm={setConfirmOrder}
                setOpenConfirmationModal={setOpenConfirmationModalOrder}
              />
            )}
            {openConfirmationModalOrderReject && (
              <ConfirmationModal
                setConfirm={setRejectOrder}
                setOpenConfirmationModal={setOpenConfirmationModalOrderReject}
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

export default EditModalTransactions
