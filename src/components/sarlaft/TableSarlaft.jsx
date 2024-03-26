import React, { useContext, useState } from "react"
import SarlaftModal from "../SarlaftModal"
import { MyContext } from "../../context/context"
import clsx from "clsx"

function TableSarlaft({ sarlafts, setSarlafts, page }) {
  const [openSarlaft, setOpenSarlaft] = useState(false)
  const [actualSarlaft, setActualSarlaft] = useState(null)
  const [orderSarlafts, setOrderSarlafts] = useState(null)
  const { actualUser, setActualUser } = useContext(MyContext)

  if (page === "sarlaft") {
    const handleSeeSarlaft = (sarlaft) => {
      setActualSarlaft(null)
      setOpenSarlaft(true)
      setActualSarlaft(sarlaft)
      return
    }
    const handleFilterByName = (event) => {
      const searchText = event.target.value.toLowerCase()

      const filteredSarlafts = sarlafts.filter((sarlaft) =>
        sarlaft.fullNameDeclarations.toLowerCase().includes(searchText)
      )

      setOrderSarlafts(filteredSarlafts)
    }
    const handleDownloadFiles = async (sarlaft) => {
      if (!sarlaft || typeof sarlaft !== "object") {
        console.error("El objeto sarlaft es inválido")
        return
      }

      // Crear una nueva instancia de JSZip
      const zip = new JSZip()

      // Recorrer las propiedades de sarlaft
      for (const key in sarlaft) {
        // Verificar si la propiedad empieza con "file" y si su valor es una URL válida
        if (
          key.startsWith("file") &&
          typeof sarlaft[key] === "string" &&
          sarlaft[key].trim() !== ""
        ) {
          // Descargar el archivo y agregarlo al zip
          const response = await fetch(sarlaft[key])
          const data = await response.blob()
          zip.file(key, data)
        }
      }

      // Generar el archivo ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Crear un enlace de descarga y simular un clic en él para iniciar la descarga
      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(zipBlob)
      downloadLink.download = "archivos_sarlaft.zip"
      downloadLink.click()
    }

    const verifyFiles = (sarlaft) => {
      const fileKeys = Object.keys(sarlaft).filter((sar) =>
        sar.startsWith("file")
      )
      return !fileKeys.every((key) => sarlaft[key])
    }
    const handleFilterById = (event) => {
      const searchText = event.target.value

      const filteredSarlafts = sarlafts.filter(
        (sarlaft) => Number(sarlaft.id) === Number(searchText)
      )

      if (filteredSarlafts.length) {
        setOrderSarlafts(filteredSarlafts)
      } else {
        setOrderSarlafts(sarlafts)
      }
    }
    const handleFilterByIdUser = (event) => {
      const searchText = event.target.value
      const filteredSarlafts = sarlafts.filter(
        (sarlaft) => Number(sarlaft.id_user) === Number(searchText)
      )

      if (filteredSarlafts.length) {
        setOrderSarlafts(filteredSarlafts)
      } else {
        setOrderSarlafts(sarlafts)
      }
    }
    const handleOrderSarlaftState = (event) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          const orderedSarlafts = sarlafts.filter(
            (sarlaft) => sarlaft.status === optionSelected
          )
          setOrderSarlafts(orderedSarlafts)
        } else {
          setOrderSarlafts(sarlafts)
        }
      }
    }
    return (
      <div className="rounded-lg border border-gray-200 min-h-full">
        <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
          <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right w-full">
              <tr className="border-r border-gray">
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id sarlaft
                  <input
                    type="number"
                    className="hidden  mt-2 w-full bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterById}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id usuario
                  <input
                    type="number"
                    className="hidden  mt-2 w-full bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByIdUser}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Nombre solicitante
                  <input
                    type="text"
                    className="hidden w-full  mt-2 bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0 "
                    onChange={handleFilterByName}
                  />
                </th>

                <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Estado
                  <select
                    className="hidden w-full absolute mt-1 text-sm bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
                    onChange={handleOrderSarlaftState}
                    value="select">
                    <option value="select" disabled className="text-sm">
                      Seleccione
                    </option>
                    <option value="all">Todos</option>
                    <option value="approved">Aprobado</option>
                    <option value="rejected">Rechazado</option>
                    <option value="pending">Pendiente</option>
                  </select>
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Ver completo
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Descargar archivos
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 w-full">
              {(sarlafts?.length === orderSarlafts?.length || !orderSarlafts
                ? sarlafts
                : orderSarlafts
              )?.map((sarlaft) => (
                <tr key={sarlaft.id}>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {sarlaft.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {sarlaft.id_user}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {sarlaft.fullNameDeclarations}
                  </td>

                  <td
                    className={clsx(
                      "whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray",
                      {
                        "bg-green-300 text-center font-bold":
                          sarlaft.status === "approved",
                        "bg-red-300 text-center font-bold":
                          sarlaft.status === "rejected",
                        "bg-gray-200 text-center font-bold":
                          sarlaft.status !== "rejected" ||
                          sarlaft.status !== "approved"
                      }
                    )}>
                    {sarlaft.status === "approved"
                      ? "Aprobado"
                      : sarlaft.status === "rejected"
                      ? "Rechazado"
                      : "Pendiente"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                    <button
                      className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
                      onClick={() => handleSeeSarlaft(sarlaft)}>
                      Ver
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                    <button
                      className={`w-[80%] flex justify-center items-center p-2 text-[#10231D] font-bold rounded-xl ${
                        !verifyFiles(sarlaft) ? "bg-[#C3F53C]" : "bg-gray-300"
                      }`}
                      onClick={() => handleDownloadFiles(sarlaft)}
                      disabled={verifyFiles(sarlaft)}>
                      Archivos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openSarlaft && (
          <SarlaftModal
            actualSarlaft={actualSarlaft}
            sarlafts={sarlafts}
            setSarlafts={setSarlafts}
            setOpenSarlaft={setOpenSarlaft}
            setActualSarlaft={setActualSarlaft}
            actualUser={actualUser}
            setActualUser={setActualUser}
            setOrderSarlafts={setOrderSarlafts}
          />
        )}
      </div>
    )
  }
}

export default TableSarlaft
