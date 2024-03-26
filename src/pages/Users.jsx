import React, { useContext, useEffect, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import GeneralTable from "../components/GeneralTable"
import NormalUser from "./NormalUser"
import { MyContext } from "../context/context"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [list, setList] = useState()
  const navigate = useNavigate()
  const [pagination, setPagination] = useState()
  const [actualPage, setActualPage] = useState(1)
  const { user, $User, token, actualDataUser, actualUser } =
    useContext(MyContext)
  if (user.role === 0) {
    return <NormalUser />
  }
  if (user.role === 2) {
    navigate("/")
  }
  useEffect(() => {
    const getUsers = async () => {
      const { status, data } = await $User.getUsers(token)

      if (status) {
        setList(data.data)
        setPagination(data.data.slice(0, 10))
      }
    }
    if (token) {
      getUsers()
    }
  }, [$User, token, actualDataUser, actualUser])

  useEffect(() => {
    if (list) {
      const startIndex = (actualPage - 1) * 10
      const endIndex = startIndex + 10
      setPagination(list.slice(startIndex, endIndex))
    }
  }, [actualPage, list])
  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D] relative">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20 ">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative ">
          <section className="h-[50%]">
            <GeneralTable
              list={pagination}
              thisUser={user}
              setList={setList}
              page="users"
            />
            <Pagination setActualPage={setActualPage} actualPage={actualPage} />
          </section>
        </main>
      </div>
    </div>
  )
}

export default Users
