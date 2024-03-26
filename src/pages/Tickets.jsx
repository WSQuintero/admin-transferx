import React, { useContext, useEffect, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import GeneralTable from "../components/GeneralTable"
import { MyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"

function Tickets() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, $Tickets, token, changeTicket, actualTicket } =
    useContext(MyContext)
  const [tickets, setTickets] = useState(null)
  const navigate = useNavigate()
  const [pagination, setPagination] = useState()
  const [actualPage, setActualPage] = useState(1)

  if (user.role === 0) {
    return <NormalUser />
  }

  if (user.role === 2) {
    navigate("/")
  }

  useEffect(() => {
    const getUsers = async () => {
      const { status, data } = await $Tickets.getTickets(token)

      if (status) {
        setTickets(data.data)
        setPagination(data.data.slice(0, 10))
      }
    }
    getUsers()
  }, [changeTicket, actualTicket])

  useEffect(() => {
    if (tickets) {
      const startIndex = (actualPage - 1) * 10
      const endIndex = startIndex + 10
      setPagination(tickets.slice(startIndex, endIndex))
    }
  }, [actualPage, tickets])
  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div class="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
          <section>
            <GeneralTable page="tickets" tickets={pagination} />
            <Pagination setActualPage={setActualPage} actualPage={actualPage} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Tickets
