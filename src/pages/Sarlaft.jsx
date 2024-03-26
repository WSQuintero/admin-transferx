import React, { useContext, useEffect, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import GeneralTable from "../components/GeneralTable"
import NormalUser from "./NormalUser"
import { MyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"

function Sarlaft() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sarlafts, setSarlafts] = useState()
  const [pagination, setPagination] = useState()
  const [actualPage, setActualPage] = useState(1)

  const { user, $User, token, actualUser } = useContext(MyContext)
  if (user.role === 0) {
    return <NormalUser />
  }

  useEffect(() => {
    const getSarlafts = async () => {
      const { status, data } = await $User.getSarlaftsPending(token)

      if (status) {
        setSarlafts(data.data)
        setPagination(data.data.slice(0, 10))
      }
    }
    if (token) {
      getSarlafts()
    }
  }, [$User, token, actualUser])

  useEffect(() => {
    if (sarlafts) {
      const startIndex = (actualPage - 1) * 10
      const endIndex = startIndex + 10
      setPagination(sarlafts.slice(startIndex, endIndex))
    }
  }, [actualPage, sarlafts])

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
          <section>
            <GeneralTable
              sarlafts={pagination}
              thisUser={user}
              setSarlafts={setSarlafts}
              page="sarlaft"
            />
            <Pagination setActualPage={setActualPage} actualPage={actualPage} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Sarlaft
