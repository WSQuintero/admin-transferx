import React, { useContext, useEffect, useState } from "react"
import ConfirmationModal from "../ConfirmationModal"
import ModalChangeInformationBank from "../ModalChangeInformationBank"
import TabsComponent from "../TabsComponent"
import { MyContext } from "../../context/context"
import PopUp from "../PopUp"

function EditModalUser({
  openModal,
  setOpenModal,
  setList,
  list,
  page,
  thisUser
}) {
  const [actualData, setActualData] = useState(null)
  const {
    $User,
    token,
    actualDataUser,
    setActualDataUser,
    actualUser,
    setActualUser
  } = useContext(MyContext)
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openModalTwo, setOpenModalTwo] = useState()
  const [confirm, setConfirm] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [actualOption, setActualOption] = useState(undefined)
  const [statusUser, setStatusUser] = useState(undefined)
  const [actualFormUser, setActualFormUser] = useState(null)
  const [validateEmail, setValidateEmail] = useState(false)
  const handleUpdateStatus = (event) => {
    const value = event.target.value
    setStatusUser(value)
  }
  if (page === "users") {
    const closePopUp = () => {
      setMessage("")
      setError(false)
      setSuccess(false)
      setValidateEmail(false)
    }
    const handleChangeUser = async (event) => {
      event.preventDefault()
      setActualFormUser(event)
      setOpenConfirmationModal(true)
    }

    useEffect(() => {
      if (error || success) {
        setTimeout(() => {
          closePopUp()
        }, 2000)
      }
    }, [error, success])

    useEffect(() => {
      setActualDataUser(null)
      setStatusUser(undefined)
      if (actualUser) {
        setActualDataUser({
          role: actualUser?.role,
          rate: actualUser?.rate,
          status: actualUser?.status,
          sarlaft: actualUser?.sarlaft_validated,
          address_wallet_transfer_in: actualUser?.address_wallet_transfer_in,
          email: actualUser?.email
        })
      }
      setValidateEmail(actualUser?.email_validated === 1 ? true : false)
    }, [actualUser])

    useEffect(() => {
      if (confirm) {
        closePopUp()
        const role = actualFormUser.target.elements.role.value
        const rate = actualFormUser.target.elements.rate.value
        const sarlaft = actualFormUser.target.elements.sarlaft.value
        const wallet = actualFormUser.target.elements.wallet.value
        if (Number(sarlaft) !== Number(actualUser.sarlaft_validated)) {
          const changeSarlaft = async () => {
            try {
              const { status, data } = await $User.changeStatusSarlaft(token, {
                sarlaft: Number(sarlaft),
                status: Number(sarlaft) === 1 ? "approved" : "rejected",
                comment_reject: ""
              })
              if (status) {
                setMessage("Sarlaft status actualizado correctamente")
                setSuccess(true)
                const finalSarlaft = {
                  ...actualUser,
                  sarlaft_validated: Number(sarlaft)
                }
                const updatedList = list.map((objeto) =>
                  objeto.id === actualUser.id ? finalSarlaft : objeto
                )
                setList(updatedList)
                setActualUser((prev) => ({
                  ...prev,
                  sarlaft_validated: Number(sarlaft)
                }))
              } else {
                setMessage(
                  "Hubo un problema al actualizar el estado del sarlaft, inténtalo nuevamente"
                )
                setError(true)
              }
            } catch (error) {
              console.error("Error al cambiar el rol:", error)
            }
          }
          changeSarlaft()
        }
        if (Number(role) !== actualDataUser?.role) {
          const changeRole = async () => {
            try {
              const { status, data } = await $User.changeRole(token, {
                email: actualUser.email,
                role: Number(role)
              })
              if (status) {
                setMessage("Role actualizado correctamente")
                setSuccess(true)
                const finalRole = { ...actualUser, role: Number(role) }
                const updatedList = list.map((objeto) =>
                  objeto.id === actualUser.id ? finalRole : objeto
                )
                setList(updatedList)
                setActualUser((prev) => ({ ...prev, role: Number(role) }))
              } else {
                setMessage(
                  "Hubo un problema al actualizar el role, inténtalo nuevamente"
                )
                setError(true)
              }
            } catch (error) {
              console.error("Error al cambiar el rol:", error)
            }
          }
          changeRole()
        }
        if (rate.trim() !== "") {
          const formattedRate = rate.replace(",", ".")

          const changeRate = async () => {
            try {
              const { status, data } = await $User.changeRate(token, {
                email: actualUser.email,
                rate: String(formattedRate)
              })
              if (status) {
                setMessage("Rate actualizado correctamente")
                setSuccess(true)
              } else {
                setMessage(
                  "Hubo un problema al actualizar el rate, inténtalo nuevamente"
                )
                setError(true)
              }
            } catch (error) {
              console.error("Error al cambiar la tasa:", error)
            }
          }
          changeRate()
        }
        if (
          wallet !== actualUser?.address_wallet_transfer_in &&
          wallet !== "" &&
          wallet !== undefined &&
          wallet !== null
        ) {
          function validateTronWalletAddress(direccion) {
            const patron = /^T[1-9A-HJ-NP-Za-km-z]{33}$/

            if (patron.test(direccion)) {
              return true
            } else {
              return false
            }
          }
          const validate = validateTronWalletAddress(wallet)
          if (validate) {
            const { status, data } = $User.updateWallet(token, {
              address_wallet_transfer_in: wallet,
              email: actualUser.email
            })

            setActualUser((prev) => ({
              ...prev,
              address_wallet_transfer_in: wallet
            }))
            setActualDataUser((prev) => ({
              ...prev,
              address_wallet_transfer_in: wallet
            }))
            setSuccess(true)
            setMessage("Wallet actualizada correctamente")
          } else {
            setMessage("La dirección de la billetera TRON no es válida")
            setError(true)
          }
        }
        if (statusUser) {
          const updateStatus = async () => {
            const { status, data } = await $User.changeStatus(
              token,
              actualDataUser.email
            )
            if (status) {
              setSuccess(true)
              setMessage("Estatus actualizado correctamente")
              if (statusUser === 0) {
                setActualDataUser((prev) => ({
                  ...prev,
                  status: 0
                }))
                setActualUser((prev) => ({
                  ...prev,
                  status: 0
                }))
              } else if (statusUser === 1) {
                setActualDataUser((prev) => ({
                  ...prev,
                  status: 1
                }))
                setActualUser((prev) => ({
                  ...prev,
                  status: 1
                }))
              }
            } else {
              setError(true)
              setMessage("Estatus no pudo ser actualizado correctamente")
            }
          }
          updateStatus()
        }
        if (validateEmail !== actualUser?.email_validated) {
          //enviar lógica para validar email
        }
      }
      setTimeout(() => {
        setConfirm(false)
        setOpenConfirmationModal(false)
        setActualFormUser(null)
        setOpenModal(false)
      }, 2000)
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
                  <div className="flex ">
                    <TabsComponent
                      setActualOption={setActualOption}
                      actualOption={actualOption}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setActualDataUser(null)
                        setOpenModal(false)
                      }}
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
                  {actualOption === "edit-user" ? (
                    <>
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Editar usuario
                        </h3>
                        <button
                          type="button"
                          onClick={() => {
                            setActualDataUser(null)
                            setOpenModal(false)
                          }}
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
                      <form className="p-4 md:p-5" onSubmit={handleChangeUser}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                          <>
                            {thisUser.role === 1 ? (
                              <>
                                {" "}
                                <div className="col-span-2">
                                  <label
                                    for="role"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                  </label>
                                  <select
                                    id="role"
                                    value={actualDataUser?.role}
                                    onChange={(event) =>
                                      setActualDataUser((prev) => ({
                                        ...prev,
                                        role: event.target.value
                                      }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="" disabled>
                                      Seleccione role
                                    </option>
                                    <option value="1" className="text-black">
                                      Administrador
                                    </option>
                                    <option value="2" className="text-black">
                                      Compliance
                                    </option>
                                    <option value="0" className="text-black">
                                      Usuario
                                    </option>
                                  </select>
                                </div>
                                <div className="col-span-2">
                                  <label
                                    for="rate"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nuevo rate
                                  </label>
                                  <input
                                    type="number"
                                    name="rate"
                                    id="rate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Rate"
                                    min="0"
                                    max="99"
                                    onKeyDown={(e) => {
                                      // Evitar la entrada de la letra "e"
                                      if (e.key === "e" || e.key === "E") {
                                        e.preventDefault()
                                      }
                                    }}
                                    onChange={(e) => {
                                      const value = parseInt(e.target.value)
                                      // Verificar si el valor está fuera del rango y ajustarlo si es necesario
                                      if (value < 0 || value > 99) {
                                        e.target.value = Math.min(
                                          99,
                                          Math.max(0, value)
                                        )
                                      }
                                    }}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label
                                    for="validate"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Validar correo{" "}
                                    <span className="ml-10">
                                      <input
                                        type="checkbox"
                                        name="valid"
                                        id="valid"
                                        onChange={(event) => {
                                          setValidateEmail(event.target.checked)
                                        }}
                                        checked={validateEmail}
                                        className={`h-6 w-6 appearance-none rounded-full bg-transparent border-2 border-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400`}
                                      />
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    name="validate"
                                    id="validate"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Validar correo"
                                    min="0"
                                    max="99"
                                    value={actualDataUser?.email}
                                    disabled={true}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label
                                    for="sarlaft"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Estatus Sarlaft
                                  </label>
                                  <select
                                    id="sarlaft"
                                    value={actualDataUser?.sarlaft}
                                    onChange={(event) =>
                                      setActualDataUser((prev) => ({
                                        ...prev,
                                        sarlaft: event.target.value
                                      }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option
                                      selected=""
                                      className="text-black"
                                      disabled>
                                      Seleccione
                                    </option>
                                    <option value="0" className="text-black">
                                      Pendiente
                                    </option>
                                    <option value="1" className="text-black">
                                      Completado
                                    </option>
                                  </select>
                                </div>
                                <div className="col-span-2">
                                  <label
                                    for="status"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Estatus usuario
                                  </label>
                                  <select
                                    id="status"
                                    value={statusUser || actualDataUser?.status}
                                    onChange={handleUpdateStatus}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option
                                      selected=""
                                      className="text-black"
                                      disabled>
                                      Seleccione
                                    </option>
                                    <option value="1" className="text-black">
                                      Activo
                                    </option>
                                    <option value="0" className="text-black">
                                      Bloqueado
                                    </option>
                                  </select>
                                </div>
                                <div className="col-span-2">
                                  <label
                                    for="wallet"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nuevo wallet
                                  </label>
                                  <input
                                    type="text"
                                    name="wallet"
                                    id="wallet"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Wallet"
                                    value={
                                      actualDataUser?.address_wallet_transfer_in
                                    }
                                    onChange={(event) =>
                                      setActualDataUser((prev) => ({
                                        ...prev,
                                        address_wallet_transfer_in:
                                          event.target.value
                                      }))
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-span-2">
                                  <label
                                    for="sarlaft"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Estatus Sarlaft
                                  </label>
                                  <select
                                    id="sarlaft"
                                    value={actualData?.sarlaft}
                                    onChange={(event) =>
                                      setActualData((prev) => ({
                                        ...prev,
                                        sarlaft: event.target.value
                                      }))
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-transparent  dark:border-[#C3F53C] dark:placeholder-gray-400 dark:text-[#C3F53C] dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option
                                      selected=""
                                      className="text-black"
                                      disabled>
                                      Seleccione
                                    </option>
                                    <option value="0" className="text-black">
                                      Rechazado
                                    </option>
                                    <option value="1" className="text-black">
                                      Aprobado
                                    </option>
                                  </select>
                                </div>
                              </>
                            )}
                          </>
                        </div>

                        <button
                          type="submit"
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
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
                          Modificar datos
                        </button>
                      </form>
                    </>
                  ) : actualOption === "edit-info-bank" ? (
                    <div className="col-span-2 flex gap-5 p-5 justify-start items-center border border-[#C3F53C]">
                      <button
                        type="button"
                        onClick={() => setOpenModalTwo(true)}
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#C3F53C] dark:hover:bg-[#C3F53C]/50 dark:focus:ring-blue-800 dark:text-[#10231D]">
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
                        Cambiar información bancaria
                      </button>
                    </div>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {openConfirmationModal && (
          <ConfirmationModal
            setConfirm={setConfirm}
            setOpenConfirmationModal={setOpenConfirmationModal}
          />
        )}
        {openModalTwo && (
          <ModalChangeInformationBank
            openModal={openModalTwo}
            setOpenModal={setOpenModalTwo}
            actualUser={actualUser}
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
}

export default EditModalUser
