import React, { useContext, useEffect, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import GeneralTable from "../components/GeneralTable"
import { MyContext } from "../context/context"
import NormalUser from "./NormalUser"
import Pagination from "../components/Pagination"

function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, $Orders, token, IsRejectTransaction } = useContext(MyContext)
  const [orders, setOrders] = useState(null)
  const [pagination, setPagination] = useState()
  const [actualPage, setActualPage] = useState(1)

  if (user.role === 0) {
    return <NormalUser />
  }

  useEffect(() => {
    const getAllOrders = async () => {
      const { status, data } = await $Orders.getP2POrders(token)
      if (status) {
        setOrders(data.data)
        setPagination(data.data.slice(0, 10))
      }
    }
    getAllOrders()
  }, [IsRejectTransaction])

  useEffect(() => {
    if (orders) {
      const startIndex = (actualPage - 1) * 10
      const endIndex = startIndex + 10
      setPagination(orders.slice(startIndex, endIndex))
    }
  }, [actualPage, orders])
  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
          <section>
            <GeneralTable page="transactions" orders={pagination} />
            <Pagination setActualPage={setActualPage} actualPage={actualPage} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Transactions
