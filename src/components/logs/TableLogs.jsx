import React, { useState } from "react"
import { formatDate } from "../../utils/Utils"

function TableLogs({ page, logs }) {
  const [orderLogs, setOrderLogs] = useState(null)

  if (page === "logs") {
    const handleFilterByIdLog = (event) => {
      const searcheId = event.target.value

      const filteredIdLogs = logs.filter(
        (log) => Number(log.id) === Number(searcheId)
      )
      if (filteredIdLogs.length) {
        setOrderLogs(filteredIdLogs)
      } else {
        setOrderLogs(logs)
      }
    }
    const handleFilterByIdUserLog = (event) => {
      const searcheId = event.target.value

      const filteredIdLogs = logs.filter(
        (log) => Number(log.user_id) === Number(searcheId)
      )
      if (filteredIdLogs.length) {
        setOrderLogs(filteredIdLogs)
      } else {
        setOrderLogs(logs)
      }
    }
    const handleOrderTableLogs = (event) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          const orderedLogs = logs.filter(
            (log) => log.table_name === optionSelected
          )
          setOrderLogs(orderedLogs)
        } else {
          setOrderLogs(logs)
        }
      }
    }
    const handleOrderActionsLogs = (event) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          const orderedLogs = logs.filter(
            (log) => log.OperationType === optionSelected
          )
          setOrderLogs(orderedLogs)
        } else {
          setOrderLogs(logs)
        }
      }
    }
    const handleOrderByDate = () => {
      const reversedLogs = ([...orderLogs] || [...logs]).reverse()
      setOrderLogs(reversedLogs)
    }

    return (
      <div className="rounded-lg border border-gray-200 min-h-full">
        <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
          <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right w-full">
              <tr className="border-r border-gray">
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id
                  <input
                    type="number"
                    className="hidden w-full  mt-2  bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByIdLog}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Nombre de tabla
                  <select
                    className="hidden absolute w-full mt-1 text-sm bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
                    onChange={handleOrderTableLogs}
                    value="select">
                    <option value="select" disabled className="text-sm">
                      Seleccione
                    </option>
                    <option value="all">Todos</option>
                    <option value="USERS">Usuarios</option>
                    <option value="USER_P2P_TRANSACTION">
                      Transacciones usuario
                    </option>
                    <option value="BANKS">Bancos</option>
                    <option value="USER_LINKINGS">Sarlaft</option>
                    <option value="TICKETS">Tickets</option>
                    <option value="TICKET_RESPONSES">
                      Mensajes en tickets
                    </option>
                  </select>
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Tipo de operación
                  <select
                    className="hidden absolute w-full mt-1 text-sm bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
                    onChange={handleOrderActionsLogs}
                    value="select">
                    <option value="select" disabled className="text-sm">
                      Seleccione
                    </option>
                    <option value="all">Todos</option>
                    <option value="INSERT">Insertar</option>
                    <option value="UPDATE">Actualizar</option>
                    <option value="DELETE">Eliminar</option>
                  </select>
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Id del usuario
                  <input
                    type="email"
                    className="hidden w-full  mt-2 bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0 "
                    onChange={handleFilterByIdUserLog}
                  />
                </th>

                <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Valores antiguos
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Nuevos valores
                </th>
                <th className="relative whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Fecha de creación
                  <button
                    className="hidden absolute top-full left-0 mt-0 bg-[#C3F53C] text-black px-4 py-2 rounded-md hover:bg-green-500 w-full"
                    onClick={handleOrderByDate}>
                    Ordenar
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 w-full">
              {(logs?.length === orderLogs?.length || !orderLogs
                ? logs
                : orderLogs
              )?.map((log) => (
                <React.Fragment key={log.id}>
                  <tr key={log.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {log.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                      {log.table_name === "USERS"
                        ? "Usuarios"
                        : log.table_name === "USER_P2P_TRANSACTION"
                        ? "Transacciones usuario"
                        : log.table_name === "BANKS"
                        ? "Bancos"
                        : log.table_name === "USER_LINKINGS"
                        ? "Sarlaft"
                        : log.table_name === "TICKETS"
                        ? "Tickets"
                        : log.table_name === "TICKET_RESPONSES"
                        ? "Mensajes en tickets"
                        : false}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {log.operation_type === "INSERT"
                        ? "Insertar"
                        : log.operation_type === "UPDATE"
                        ? "Actualizar"
                        : "Eliminar"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {log.user_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {
                        log.old_values === "null"
                          ? "No hay movimientos anteriores"
                          : log.old_values
                        // : (() => {
                        //     try {
                        //       const parsedValues = JSON.parse(
                        //         `${log.old_values}\"}`
                        //       )
                        //       return Object.keys(parsedValues).map((data) => (
                        //         <p className="font-bold" key={data}>
                        //           {data}:
                        //           <span className="font-light">
                        //             {" "}
                        //             {parsedValues[data]}
                        //           </span>
                        //         </p>
                        //       ))
                        //     } catch (error) {
                        //       console.error("Error al parsear JSON:", error)
                        //       const parsedValues = JSON.parse(
                        //         `${log.old_values}}`
                        //       )
                        //       return Object.keys(parsedValues).map((data) => (
                        //         <p className="font-bold" key={data}>
                        //           {data}:
                        //           <span className="font-light">
                        //             {" "}
                        //             {parsedValues[data]}
                        //           </span>
                        //         </p>
                        //       ))
                        //     }
                        //   })()}
                      }
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {
                        log.new_values === "null"
                          ? "No hay movimientos anteriores"
                          : log.new_values
                        // : (() => {
                        //     try {
                        //       const parsedValues = JSON.parse(
                        //         `${log.new_values}\"}`
                        //       )
                        //       return Object.keys(parsedValues).map((data) => (
                        //         <p className="font-bold" key={data}>
                        //           {data}:
                        //           <span className="font-light">
                        //             {" "}
                        //             {parsedValues[data]}
                        //           </span>
                        //         </p>
                        //       ))
                        //     } catch (error) {
                        //       console.error("Error al parsear JSON:", error)
                        //       const parsedValues = JSON.parse(log.new_values)
                        //       return Object.keys(parsedValues).map((data) => (
                        //         <p className="font-bold" key={data}>
                        //           {data}:
                        //           <span className="font-light">
                        //             {" "}
                        //             {parsedValues[data]}
                        //           </span>
                        //         </p>
                        //       ))
                        //     }
                        //   }
                      }
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableLogs
