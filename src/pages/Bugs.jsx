import React, { useContext, useEffect, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import GeneralTable from "../components/GeneralTable"
import NormalUser from "./NormalUser"
import { MyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"

function Bugs() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const [bugs, setBugs] = useState()
  const [pagination, setPagination] = useState()
  const [actualPage, setActualPage] = useState(1)

  const { user, token, $Logs } = useContext(MyContext)
  if (user.role === 0) {
    return <NormalUser />
  }
  if (user.role === 2) {
    navigate("/")
  }

  useEffect(() => {
    const getBugs = async () => {
      const { status, data } = await $Logs.getBugsByUser(token)

      if (status) {
        setBugs(data.data)
        setPagination(data.data.slice(0, 10))
        console.log(data.data)
      }
    }
    if (token && user) {
      getBugs()
    }
  }, [$Logs, token, user])

  useEffect(() => {
    if (bugs) {
      const startIndex = (actualPage - 1) * 10
      const endIndex = startIndex + 10
      setPagination(bugs.slice(startIndex, endIndex))
    }
  }, [actualPage, bugs])

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
          <section>
            <GeneralTable
              bugs={pagination}
              thisUser={user}
              setBugs={setBugs}
              page="bugs"
            />
            <Pagination setActualPage={setActualPage} actualPage={actualPage} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Bugs
