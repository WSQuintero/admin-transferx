import React, { useContext, useState } from "react"
import EditModal from "../EditModal"
import { MyContext } from "../../context/context"
import {
  formatCurrencyPesos,
  formatCurrencyUSD,
  formatDate
} from "../../utils/Utils"

function TableTransactions({ list, setList, page, orders }) {
  const [openModal, setOpenModal] = useState(false)
  const [actualOrder, setActualOrder] = useState(null)
  const [orderOrders, setOrderOrders] = useState()
  const { user } = useContext(MyContext)

  if (page === "transactions") {
    const handleOrderStates = (event) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          const orderedOrder = orders.filter(
            (order) => order.state === optionSelected
          )
          setOrderOrders(orderedOrder)
        } else {
          setOrderOrders(orders)
        }
      }
    }
    const handleFilterByName = (event) => {
      const searchText = event.target.value.toLowerCase()

      const filteredOrders = orders.filter((order) =>
        order.owner_account_bank_transfer.toLowerCase().includes(searchText)
      )

      setOrderOrders(filteredOrders)
    }
    const handleFilterById = (event) => {
      const searchText = event.target.value

      const filteredOrders = orders.filter(
        (order) => Number(order.id) === Number(searchText)
      )

      if (filteredOrders.length) {
        setOrderOrders(filteredOrders)
      } else {
        setOrderOrders(orders)
      }
    }
    const handleOrderByDate = () => {
      const reversedOrders = ([...orderOrders] || [...orders]).reverse()
      setOrderOrders(reversedOrders)
    }
    return (
      <div className="rounded-lg border border-gray-200 min-h-full overflow-hidden">
        <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
          <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right w-full">
              <tr className="border-r border-gray">
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id de orden
                  <input
                    type="number"
                    className="hidden w-full  mt-2 bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterById}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Nombre solicitante
                  <input
                    type="text"
                    className="hidden w-full  mt-2 bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByName}
                  />
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6">
                  Número de cuenta a transferir
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Taza de cambio transacción
                </th>
                <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Estado orden
                  <select
                    className="hidden absolute mt-1 text-sm bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
                    onChange={handleOrderStates}
                    value="select">
                    <option value="select" disabled className="text-sm">
                      Seleccione
                    </option>
                    <option value="all">Todas</option>
                    <option value="complete">Completada</option>
                    <option value="rejected">Rechazada</option>
                    <option value="in_progress">En progreso</option>
                  </select>
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  USDT
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Pesos colombianos
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold relative">
                  Fecha de creación
                  <button
                    className="hidden absolute top-full left-0 mt-0 bg-[#C3F53C] text-black px-4 py-2 rounded-md hover:bg-green-500 w-full"
                    onClick={handleOrderByDate}>
                    Ordenar
                  </button>
                </th>
                {user.role === 1 && (
                  <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                    Modificar
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 w-full">
              {(orders?.length === orderOrders?.length || !orderOrders
                ? orders
                : orderOrders
              )?.map((order) => (
                <tr key={order.id}>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {order.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {order.owner_account_bank_transfer}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {order.number_account_bank_transfer}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {formatCurrencyPesos(order.rate_currency_out_p2p)}
                  </td>
                  <td
                    className={clsx(
                      "whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray",
                      {
                        "bg-green-200 font-bold": order.state === "complete",
                        "bg-red-200 font-bold": order.state === "rejected",
                        "bg-yellow-200 font-bold": order.state === "pending",
                        "bg-yellow-500 font-bold": order.state === "in_progress"
                      }
                    )}>
                    {order.state === "complete"
                      ? "Completada"
                      : order.state === "rejected"
                      ? "Rechazada"
                      : order.state === "pending"
                      ? "Pendiente"
                      : "En progreso"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {formatCurrencyUSD(order.amount_currency_in)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {formatCurrencyPesos(order.amount_currency_out)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                    {formatDate(order.created_at)}
                  </td>
                  {user.role === 1 && (
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      <button
                        className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
                        onClick={() => {
                          setActualOrder(null)
                          setOpenModal(true)
                          setActualOrder(order)
                        }}>
                        Editar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setList={setList}
          list={list}
          page="transactions"
          actualOrder={actualOrder}
          setActualOrder={setActualOrder}
        />
      </div>
    )
  }
}

export default TableTransactions
