import React, { useContext, useEffect, useState } from "react"
import PopUp from "./PopUp"
import { MyContext } from "../context/context"
import { json } from "react-router-dom"
import { banks } from "../utils/constants"
import ConfirmationModal from "./ConfirmationModal"

function ModalChangeInformationBank({ openModal, setOpenModal, actualUser }) {
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [actualData, setActualData] = useState({
    email: "",
    id_bank_transfer_out: "",
    type_account_bank_transfer: "",
    id_type_owner_account_bank_transfer: "",
    id_number_owner_account_bank_transfer: "",
    number_account_bank_transfer: "",
    owner_account_bank_transfer: ""
  })
  const { $User, token } = useContext(MyContext)
  const [confirm, setConfirm] = useState(false)
  const [reject, setReject] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [actualFormUser, setActualFormUser] = useState(false)

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
    if (actualUser) {
      setActualData((prev) => ({
        ...prev,
        email: actualUser.email,
        id_bank_transfer_out: actualUser.id_bank_transfer_out || "",
        type_account_bank_transfer: actualUser.type_account_bank_transfer || "",
        id_type_owner_account_bank_transfer:
          actualUser.id_type_owner_account_bank_transfer || "",
        id_number_owner_account_bank_transfer:
          actualUser.id_number_owner_account_bank_transfer || "",
        number_account_bank_transfer:
          actualUser.number_account_bank_transfer || "",
        owner_account_bank_transfer:
          actualUser.owner_account_bank_transfer || ""
      }))
    }
  }, [actualUser])

  const handleChangeInformationBank = async (event) => {
    event.preventDefault()
    setActualFormUser(event)
    setOpenConfirmationModal(true)
    closePopUp()
  }

  useEffect(() => {
    if (confirm) {
      const element = actualFormUser?.target.elements
      // const email = element.email.value
      const id_bank_transfer_out = element.idBank.value
      const type_account_bank_transfer = element.typeAccount.value
      const id_type_owner_account_bank_transfer = element.idOwner.value
      const id_number_owner_account_bank_transfer = element.idNumber.value
      const number_account_bank_transfer = element.numAccount.value
      const owner_account_bank_transfer = element.bankTitularName.value

      const informationBank = {
        email: actualUser?.email,
        id_bank_transfer_out,
        type_account_bank_transfer,
        id_type_owner_account_bank_transfer,
        id_number_owner_account_bank_transfer,
        number_account_bank_transfer,
        owner_account_bank_transfer
      }
      if (
        !id_bank_transfer_out ||
        !type_account_bank_transfer ||
        !id_type_owner_account_bank_transfer ||
        !id_number_owner_account_bank_transfer ||
        !number_account_bank_transfer ||
        !owner_account_bank_transfer
      ) {
        setError(true)
        setMessage("Todos los campos deben estar llenos")
        return
      }
      const changeInformationBank = async () => {
        const { status, data } = await $User.changeInformationBank(
          token,
          informationBank
        )
        if (status) {
          setSuccess(true)
          setMessage("Información bancaria actualizada correctamente")
        } else {
          setError(true)
          setMessage("No fue posible actualizar la información bancaria")
        }
      }
      changeInformationBank()
      setTimeout(() => {
        setConfirm(false)
        setOpenConfirmationModal(false)
        setActualFormUser(null)
        setOpenModal(false)
      }, 2000)
    }
  }, [confirm])
  return (
    <>
      {openModal && (
        <div className="fixed z-50 w-full lg:w-[83%] 2xl:w-[87%] h-screen top-0 flex justify-center items-center bg-black/50">
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow dark:bg-[#C3F53C]/50 flex flex-col justify-center items-center w-full  h-full">
            <div className="relative  w-[80%] max-h-[80%]">
              <div className="relative bg-white rounded-lg shadow dark:bg-black">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Editar información bancaria
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                </div>
                <form
                  className="p-4 md:p-5"
                  onSubmit={handleChangeInformationBank}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        for="idOwner"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de identificación titular
                      </label>
                      <select
                        id="idOwner"
                        value={actualData?.id_type_owner_account_bank_transfer}
                        name={"idOwner"}
                        onChange={(event) =>
                          setActualData((prev) => ({
                            ...prev,
                            id_type_owner_account_bank_transfer:
                              event.target.value
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="" value="" disabled>
                          Seleccione tipo de identificación titular
                        </option>
                        <option value="passport" className="text-black">
                          Pasaporte
                        </option>
                        <option value="id" className="text-black">
                          Cedula de ciudadanía
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <label
                      for="idNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Número de documento titular
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      id="idNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Número de documento"
                      value={actualData?.id_number_owner_account_bank_transfer}
                      onChange={(event) =>
                        setActualData((prev) => ({
                          ...prev,
                          id_number_owner_account_bank_transfer:
                            event.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="col-span-2 mt-2">
                    <label
                      for="bankTitularName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nombre de titular
                    </label>
                    <input
                      type="text"
                      name="bankTitularName"
                      id="bankTitularName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Nombre de titular"
                      value={actualData?.owner_account_bank_transfer}
                      onChange={(event) =>
                        setActualData((prev) => ({
                          ...prev,
                          owner_account_bank_transfer: event.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2 mt-2">
                    <div className="col-span-2">
                      <label
                        for="typeAccount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de cuenta
                      </label>
                      <select
                        id="typeAccount"
                        name={"typeAccount"}
                        value={actualData?.type_account_bank_transfer}
                        onChange={(event) =>
                          setActualData((prev) => ({
                            ...prev,
                            type_account_bank_transfer: event.target.value
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="" value="" disabled>
                          Seleccione tipo de cuenta
                        </option>
                        <option value="debit" className="text-black">
                          Ahorros
                        </option>
                        <option value="current" className="text-black">
                          Corriente
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-4 mb-4 grid-cols-2 mt-2">
                    <div className="col-span-2">
                      <label
                        for="idBank"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Seleccione banco
                      </label>
                      <select
                        id="idBank"
                        name={"idBank"}
                        value={actualData?.id_bank_transfer_out}
                        onChange={(event) =>
                          setActualData((prev) => ({
                            ...prev,
                            id_bank_transfer_out: event.target.value
                          }))
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected="" value="" disabled>
                          Seleccione banco
                        </option>

                        {Object.entries(banks).map((bank) => (
                          <option
                            key={bank[1]}
                            value={bank[1]}
                            className="text-black">
                            {bank[0]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <label
                      for="numAccount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nuevo número de cuenta
                    </label>
                    <input
                      type="text"
                      name="numAccount"
                      id="numAccount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Número de cuenta"
                      value={actualData?.number_account_bank_transfer}
                      onChange={(event) =>
                        setActualData((prev) => ({
                          ...prev,
                          number_account_bank_transfer: event.target.value
                        }))
                      }
                    />
                  </div>
                  {/* <div className="col-span-2 mt-2">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Correo electrónico"
                      value={actualData?.email}
                      onChange={(event) =>
                        setActualData((prev) => ({
                          ...prev,
                          email: event.target.value
                        }))
                      }
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="text-white mt-10 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"></path>
                    </svg>
                    Modificar datos bancarios
                  </button>
                </form>
                <div className="col-span-2 flex gap-5 p-5 justify-start items-center border border-[#C3F53C]"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {openConfirmationModal && (
        <ConfirmationModal
          setConfirm={setConfirm}
          setReject={setReject}
          setOpenConfirmationModal={setOpenConfirmationModal}
        />
      )}
      <PopUp
        message={message}
        error={error}
        success={success}
        closePopUp={closePopUp}
      />
    </>
  )
}

export default ModalChangeInformationBank
