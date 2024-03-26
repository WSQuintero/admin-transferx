import React, { useContext, useState } from "react"
import { MyContext } from "../../context/context"
import { formatDate } from "../../utils/Utils"
import EditModal from "../EditModal"
import clsx from "clsx"

function TableTickets({ page, thisUser, tickets }) {
  const [openModal, setOpenModal] = useState(false)
  const [orderTickets, setOrderTickets] = useState(null)
  const { actualTicket, setActualTicket } = useContext(MyContext)

  if (page === "tickets") {
    const handleFilterById = (event) => {
      const searchText = event.target.value
      const filteredTickets = tickets.filter(
        (ticket) => Number(ticket.id) === Number(searchText)
      )
      if (filteredTickets.length) {
        setOrderTickets(filteredTickets)
      } else {
        setOrderTickets(tickets)
      }
    }
    const handleFilterByIdTicket = (event) => {
      const searchText = event.target.value
      const filteredTickets = tickets.filter(
        (ticket) => Number(ticket.id_user) === Number(searchText)
      )
      if (filteredTickets.length) {
        setOrderTickets(filteredTickets)
      } else {
        setOrderTickets(tickets)
      }
    }
    const handleOrderTickets = (event) => {
      const optionSelected = event.target.value
      if (optionSelected !== "optionSelected") {
        if (optionSelected !== "all") {
          const orderedTicket = tickets.filter(
            (ticket) => ticket.status === optionSelected
          )
          setOrderTickets(orderedTicket)
        } else {
          setOrderTickets(tickets)
        }
      }
    }
    const handleFilterByTitle = (event) => {
      const searchText = event.target.value
      const filteredTickets = tickets.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchText)
      )
      if (filteredTickets.length) {
        setOrderTickets(filteredTickets)
      } else {
        setOrderTickets(tickets)
      }
    }
    const handleFilterByDescription = (event) => {
      const searchText = event.target.value
      const filteredTickets = tickets.filter((ticket) =>
        ticket.description.toLowerCase().includes(searchText)
      )
      if (filteredTickets.length) {
        setOrderTickets(filteredTickets)
      } else {
        setOrderTickets(tickets)
      }
    }
    return (
      <div className="rounded-lg border border-gray-200 min-h-full">
        <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
          <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right w-full">
              <tr className="border-r border-gray">
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id Ticket
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
                    onChange={handleFilterByIdTicket}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Estado de ticket
                  <select
                    className="hidden absolute mt-1 text-sm w-full bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
                    onChange={handleOrderTickets}
                    value="select">
                    <option value="select" disabled className="text-sm">
                      Seleccione
                    </option>
                    <option value="all">Todos</option>
                    <option value="open">Abierto</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Título
                  <input
                    type="text"
                    className="hidden w-full mt-2  bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByTitle}
                  />
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Descripción
                  <input
                    type="text"
                    className="hidden w-full mt-2  bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByDescription}
                  />
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Fecha de creación
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Responder
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 w-full">
              {(tickets?.length === orderTickets?.length || !orderTickets
                ? tickets
                : orderTickets
              )?.map((ticket) => (
                <React.Fragment key={ticket.id}>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                      {ticket.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {ticket.id_user}
                    </td>
                    <td
                      className={clsx(
                        "whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray",
                        {
                          "bg-yellow-200 font-bold text-center":
                            ticket.status === "open",
                          "bg-green-200 font-bold text-center":
                            ticket.status === "closed", // Reemplazado "Cerrado" con la clase apropiada
                          "bg-gray-300 font-bold text-center":
                            ticket.status !== "open" &&
                            ticket.status !== "closed" // Si no es "open" ni "close", entonces "Pendiente"
                        }
                      )}>
                      {ticket.status === "open"
                        ? "Abierto"
                        : ticket.status === "closed"
                        ? "Cerrado"
                        : "Pendiente"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {ticket.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {ticket.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {formatDate(ticket.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      <button
                        className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
                        onClick={() => {
                          setActualTicket(null)
                          setOpenModal(true)
                          setActualTicket(ticket)
                        }}>
                        Editar
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <EditModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          actualTicket={actualTicket}
          setActualTicket={setActualTicket}
          page="tickets"
          thisUser={thisUser}
        />
      </div>
    )
  }
}

export default TableTickets
