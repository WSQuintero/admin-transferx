import React, { useContext, useEffect, useState } from "react"
import { MyContext } from "../context/context"
import PopUp from "./PopUp"
import ConfirmationModal from "./ConfirmationModal"
const trasnlates = {
  AdministratorPEPStatus: "Administrador PEP Status",
  AffirmativeResponseDetails: "Detalles Respuesta Afirmativa",
  InternationalOrgLegalRep: "Representante Legal Organización Internacional",
  ResourceSourceDetails: "Detalles Fuente Recurso",
  address: "Dirección",
  assets: "Activos",
  birthCountryAndCity: "País Y ciudad Nacimiento",
  birthDate: "Fecha Nacimiento",
  branchOfficeAddress: "Dirección Sucursal",
  businessName: "Nombre Comercial",
  cellPhone: "Teléfono Celular",
  ciiuCode: "código CIIU",
  citybranchOfficeAddress: "Dirección Sucursal Ciudad",
  citymainOfficeAddress: "Dirección Oficina Principal Ciudad",
  companyName: "Nombre Empresa",
  companyType: "Tipo Empresa",
  companyTypeTexto: null,
  conductsForeignCurrencyTransactions:
    "Realiza Transacciones Moneda Extranjera",
  conductsForeignCurrencyTransactionsType:
    "Tipo Transacciones Moneda Extranjera",
  economicActivityDescription: "Descripción Actividad Económica",
  email: "correo Electrónico",
  equity: "patrimonio",
  firstName: "Primer Nombre",
  fullNameDeclarations: "Detalles Declaraciones Nombre Completo",
  hasPermanentResidencyInAnotherCountry:
    "Tiene Residencia Permanente En Otro País",
  hasPermanentResidencyInAnotherCountryTexto:
    "Tiene Residencia Permanente En Otro País ",
  hasTaxObligationsInAnotherCountry: "Tiene Obligaciones Fiscales En Otro País",
  hasTaxObligationsInAnotherCountryTexto:
    "Tiene Obligaciones Fiscales En Otro País ",
  id: "Id",
  id_user: "Id del usuario",
  id_user_rejected: null,
  identificationNumber: "Número Identificación",
  identificationNumberDeclarations: "Declaraciones Número Identificación",
  identificationTypeDeclarations: "Declaraciones Tipo Identificación",
  internationalOperationsType: "Tipo Operaciones Internacionales",
  internationalOperationsTypeText: "Tipo Operaciones Internacionales",
  issuePlaceAndDate: "Lugar Y fecha Expedición",
  jobTitle: "Cargo",
  lastName: "Apellido",
  liabilities: "Pasivos",
  mainOfficeAddress: "Dirección Oficina Principal",
  maritalStatus: "Estado Civil",
  monthlyExpenses: "Gastos Mensuales",
  monthlyIncome: "Ingresos Mensuales",
  names: "Nombres",
  nationality: "Nacionalidad",
  nit: "Nit",
  occupation: "Ocupación",
  occupation2PersonalNatural: "Ocupación Persona Natural",
  otherIncome: "Otros Ingresos",
  otherIncomeDetails: "Detalles Otros Ingresos",
  phonebranchOfficeAddress: "Teléfono Sucursal",
  phonemainOfficeAddress: "Teléfono Oficina Principal",
  politicallyExposedPerson: "Persona Politicamente Expuesta",
  rejected_comment: "Comentario Rechazado",
  residenceAddressAndCity: "Dirección Y ciudad Residencia",
  state_second_form: "Estado Segundo Formulario",
  state_second_form_validocus: "Estado Segundo Formulario Validocus",
  status: "Estado",
  urlSeconFromValidocus: "Url Segundo Formulario Validocus",
  usStayDetails: "Detalles Permanencia EEUU",
  usesFinancialProductsAbroad: "Utiliza Productos Financieros Extranjero",
  bankAccounts: "Cuentas bancárias",
  internationalOperationsDetails: "Detalle operaciones internacionales",
  shareholdersIdentification: "Identificación de accionistas"
}
function SarlaftModal({
  sarlafts,
  actualSarlaft,
  setActualSarlaft,
  setOpenSarlaft,
  setSarlafts,
  actualUser,
  setActualUser
}) {
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [rejectMessage, setRejectMessage] = useState("")
  const [confirm, setConfirm] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [reject, setReject] = useState(false)
  const [openConfirmationModalReject, setOpenConfirmationModalReject] =
    useState(false)

  const closePopUp = () => {
    setMessage("")
    setError(false)
    setSuccess(false)
  }
  const { $User, token } = useContext(MyContext)
  const handleAproveSarlaft = async () => {
    setOpenConfirmationModal(true)
  }
  useEffect(() => {
    if (confirm) {
      const approveSarlaft = async () => {
        try {
          const { status, data } = await $User.changeStatusSarlaft(token, {
            sarlaft: Number(actualSarlaft.id),
            status: "approved",
            comment_reject: ""
          })
          if (status) {
            setMessage("Sarlaft status actualizado correctamente")
            setActualUser((prev) => ({
              ...prev,
              sarlaft_validated: 1
            }))
            setSuccess(true)
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
      approveSarlaft()
      setTimeout(() => {
        setConfirm(false)
        setOpenConfirmationModal(false)
        setOpenSarlaft(false)
      }, 2000)
    }
  }, [confirm])
  const handleRejectSarlaft = async () => {
    setOpenConfirmationModalReject(true)
  }
  useEffect(() => {
    if (reject) {
      const rejectSarlaft = async () => {
        try {
          const { status, data } = await $User.changeStatusSarlaft(token, {
            sarlaft: Number(actualSarlaft.id),
            status: "rejected",
            comment_reject: rejectMessage
          })
          if (status) {
            setActualUser((prev) => ({
              ...prev,
              sarlaft_validated: 0
            }))
            setActualSarlaft((prev) => ({
              ...prev,
              sarlaft_validated: 0
            }))

            setMessage("Sarlaft status actualizado correctamente")
            setSuccess(true)
          } else {
            setMessage(
              "Hubo un problema al actualizar el estado del sarlaft, inténtalo nuevamente"
            )
            setError(true)
          }
        } catch (error) {
          console.error("Error al cambiar el estado del sarlaft:", error)
        }
      }
      rejectSarlaft()
      setTimeout(() => {
        setReject(false)
        setOpenConfirmationModalReject(false)
        setOpenSarlaft(false)
      }, 2000)
    }
  }, [reject])
  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        closePopUp()
      }, 2000)
      setTimeout(() => {
        setOpenSarlaft(false)
      }, 1000)
    }
  }, [error, success])

  return (
    <div className="w-full h-full bg-black z-50 overflow-auto p-5 absolute top-0">
      <div className="w-full bg-black flex justify-center items-center">
        <img src="/src/images/completesize.png" alt="logo" />
      </div>
      <button
        onClick={() => setOpenSarlaft(false)}
        className="absolute top-5 right-5 bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center">
        X
      </button>
      <section className="w-full">
        {Object.keys(trasnlates).map((data, index) => (
          <div key={data + index} className=" w-full">
            <div className="w-full  ">
              {!data.startsWith("file") &&
                data !== "bankAccounts" &&
                data !== "shareholdersIdentification" &&
                data !== "internationalOperationsType" &&
                data !== "internationalOperationsDetails" &&
                data !== "conductsForeignCurrencyTransactionsType" &&
                data !== "usStayDetails" && (
                  <div className=" justify-between h-[120px] border border-white flex  items-center flex-col">
                    <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                      {trasnlates[data]}
                    </p>

                    <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                      {actualSarlaft[data] === "true"
                        ? "Si"
                        : actualSarlaft[data] === "false"
                        ? "No"
                        : actualSarlaft[data]}
                    </p>
                  </div>
                )}
            </div>

            <div className="w-full flex  ">
              {data === "usStayDetails" && (
                <>
                  {actualSarlaft["usStayDetails"] &&
                    Object.keys(
                      JSON.parse(actualSarlaft["usStayDetails"])
                    )?.map((dat) => (
                      <div
                        key={dat}
                        className="w-full justify-between h-[120px] border border-white flex  items-center flex-col">
                        <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                          {dat}
                        </p>

                        <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                          {JSON.parse(actualSarlaft["usStayDetails"])[dat] ===
                          true
                            ? "Si"
                            : JSON.parse(actualSarlaft["usStayDetails"])[
                                dat
                              ] === false
                            ? "No"
                            : JSON.parse(actualSarlaft["usStayDetails"])[dat]}
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="w-full grid grid-cols-2">
              {data === "bankAccounts" && (
                <>
                  {actualSarlaft["bankAccounts"] &&
                    JSON.parse(actualSarlaft["bankAccounts"])?.map(
                      (dat, index) => (
                        <>
                          {Object.keys(
                            JSON.parse(actualSarlaft["bankAccounts"])[index]
                          ).map((prop) => (
                            <div
                              key={prop}
                              className="w-auto justify-between h-[120px] border border-white flex  items-center flex-col">
                              <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                                {`${prop} cuenta ${index + 1}`}{" "}
                              </p>
                              <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                                {
                                  JSON.parse(actualSarlaft["bankAccounts"])[
                                    index
                                  ][prop]
                                }
                              </p>
                            </div>
                          ))}
                        </>
                      )
                    )}
                </>
              )}
            </div>
            <div className="grid grid-cols-2">
              {data === "internationalOperationsType" && (
                <>
                  {actualSarlaft["internationalOperationsType"] &&
                    Object.keys(
                      JSON.parse(actualSarlaft["internationalOperationsType"])
                    )?.map((dat) => (
                      <div
                        key={dat}
                        className="w-auto justify-between h-[120px] border border-white flex  items-center flex-col">
                        <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                          {dat}
                        </p>

                        <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                          {JSON.parse(
                            actualSarlaft["internationalOperationsType"]
                          )[dat] === true
                            ? "Si"
                            : JSON.parse(
                                actualSarlaft["internationalOperationsType"]
                              )[dat] === false
                            ? "No"
                            : JSON.parse(
                                actualSarlaft["internationalOperationsType"]
                              )[dat]}
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="grid grid-cols-2">
              {data === "internationalOperationsDetails" && (
                <>
                  {actualSarlaft["internationalOperationsDetails"] &&
                    JSON.parse(
                      actualSarlaft["internationalOperationsDetails"]
                    )?.map((dat, index) => (
                      <>
                        {Object.keys(
                          JSON.parse(
                            actualSarlaft["internationalOperationsDetails"]
                          )[index]
                        ).map((prop) => (
                          <div
                            key={prop}
                            className="w-auto justify-between h-[120px] border border-white flex  items-center flex-col">
                            <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                              {`${prop} cuenta ${index + 1}`}{" "}
                            </p>
                            <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                              {
                                JSON.parse(
                                  actualSarlaft[
                                    "internationalOperationsDetails"
                                  ]
                                )[index][prop]
                              }
                            </p>
                          </div>
                        ))}
                      </>
                    ))}
                </>
              )}
            </div>
            <div className="grid grid-cols-2">
              {data === "conductsForeignCurrencyTransactionsType" && (
                <>
                  {actualSarlaft["conductsForeignCurrencyTransactionsType"] &&
                    Object.keys(
                      JSON.parse(
                        actualSarlaft["conductsForeignCurrencyTransactionsType"]
                      )
                    )?.map((dat) => (
                      <div
                        key={dat}
                        className="w-auto justify-between h-[120px] border border-white flex  items-center flex-col">
                        <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                          {dat}
                        </p>

                        <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                          {JSON.parse(
                            actualSarlaft[
                              "conductsForeignCurrencyTransactionsType"
                            ]
                          )[dat] === true
                            ? "Si"
                            : JSON.parse(
                                actualSarlaft[
                                  "conductsForeignCurrencyTransactionsType"
                                ]
                              )[dat] === false
                            ? "No"
                            : JSON.parse(
                                actualSarlaft[
                                  "conductsForeignCurrencyTransactionsType"
                                ]
                              )[dat]}
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="grid grid-cols-3 w-full">
              {data === "shareholdersIdentification" && (
                <>
                  {JSON.parse(actualSarlaft["shareholdersIdentification"]).map(
                    (a, ind) => (
                      <>
                        {Object.keys(a).map((b, index) => (
                          <div
                            key={b}
                            className="w-auto justify-between h-[120px] border border-white flex  items-center flex-col">
                            <p className="p-3 break-words max-w-full text-sm text-[#C3F53C] font-bold">
                              {`${b} Accionista No  ${ind + 1}`}
                            </p>

                            <p className="w-full border text-center border-[#C3F53C] p-3 h-[50px] text-white">
                              {JSON.parse(
                                actualSarlaft["shareholdersIdentification"]
                              )[b] === true
                                ? "Si"
                                : JSON.parse(
                                    actualSarlaft["shareholdersIdentification"]
                                  )[b] === false
                                ? "No"
                                : JSON.parse(
                                    actualSarlaft["shareholdersIdentification"]
                                  )[b]}
                            </p>
                          </div>
                        ))}
                      </>
                    )
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </section>
      <div className="flex gap-5 w-full justify-center flex-col border border-white p-5">
        <div className="flex gap-5">
          <button
            className="w-[200px] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
            onClick={() => handleAproveSarlaft(actualSarlaft)}>
            Aprobar
          </button>
          <div className="flex  gap-3">
            <button
              className="w-[250px] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
              onClick={() => handleRejectSarlaft(actualSarlaft)}>
              Rechazar
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Escribe el motivo del rechazo"
          onChange={(event) => setRejectMessage(event.target.value)}
          className="w-full border border-[#C3F53C] bg-transparent"
        />
      </div>
      {openConfirmationModal && (
        <ConfirmationModal
          setConfirm={setConfirm}
          setOpenConfirmationModal={setOpenConfirmationModal}
        />
      )}
      {openConfirmationModalReject && (
        <ConfirmationModal
          setConfirm={setReject}
          setOpenConfirmationModal={setOpenConfirmationModalReject}
        />
      )}
      <PopUp
        message={message}
        error={error}
        success={success}
        closePopUp={closePopUp}
      />
    </div>
  )
}

export default SarlaftModal
