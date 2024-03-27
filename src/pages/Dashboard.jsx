import React, { useContext, useState } from "react"

import Sidebar from "../partials/Sidebar"
import Header from "../partials/Header"
import { FaRegUser } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../context/context"
import NormalUser from "./NormalUser"

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useContext(MyContext)
  const navigate = useNavigate()
  if (user?.role === 0) {
    return <NormalUser />
  }
  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#10231D]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="bg-gradient-to-t from-black/70  to-transparent w-full h-[30%] absolute bottom-0 z-0" />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden z-20">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="relative">
          <div className="w-full flex justify-center pl-10 items-center bg-black/80 dark:bg-white/5">
            <img
              src="../images/completesize.png"
              alt="logo"
              className="max-w-[200px]"
            />
          </div>
          <section className="flex flex-wrap justify-around items-center mt-20 gap-5">
            {user?.role === 1 && (
              <>
                <article
                  onClick={() => navigate("/users")}
                  className=" relative w-[200px] flex flex-col justify-between items-center overflow-hidden cursor-pointer h-[200px] border border-white rounded-3xl bg-white/50 shadow-2xl shadow-black/70 hover:shadow-[#C3F53C]/50 hover:shadow-lg hover:bg-white/70 transition-all  hover:scale-105 ease-in-out duration-500 ">
                  <h3 className="w-full bg-[#10231D]/50 text-[#C3F53C]/80 font-bold text-center px-5 py-2 text-lg">
                    Usuarios
                  </h3>
                  <img
                    src="../images/user.png"
                    alt="user"
                    className="w-[50%] object-contain opacity-80 mb-5"
                  />
                </article>{" "}
                <article
                  onClick={() => navigate("/tickets")}
                  className=" relative w-[200px] flex flex-col justify-between items-center overflow-hidden cursor-pointer h-[200px] border border-white rounded-3xl bg-white/50 shadow-2xl shadow-black/70 hover:shadow-[#C3F53C]/50 hover:shadow-lg hover:bg-white/70 transition-all  hover:scale-105 ease-in-out duration-500 ">
                  <h3 className="w-full bg-[#10231D]/50 text-[#C3F53C]/80 font-bold text-center px-5 py-2 text-lg">
                    Tickets
                  </h3>
                  <img
                    src="../images/ticket.png"
                    alt="user"
                    className="w-[50%] mb-5 object-contain opacity-80 "
                  />
                </article>
              </>
            )}
            <article
              onClick={() => navigate("/sarlaft")}
              className=" relative w-[200px] flex flex-col justify-between items-center overflow-hidden cursor-pointer h-[200px] border border-white rounded-3xl bg-white/50 shadow-2xl shadow-black/70 hover:shadow-[#C3F53C]/50 hover:shadow-lg hover:bg-white/70 transition-all  hover:scale-105 ease-in-out duration-500 ">
              <h3 className="w-full bg-[#10231D]/50 text-[#C3F53C]/80 font-bold text-center px-5 py-2 text-lg">
                Sarlaft
              </h3>
              <img
                src="../images/orders.png"
                alt="user"
                className="w-[50%] object-contain mb-7 opacity-80"
              />
            </article>
            <article
              onClick={() => navigate("/transactions")}
              className=" relative w-[200px] flex flex-col justify-between items-center overflow-hidden cursor-pointer h-[200px] border border-white rounded-3xl bg-white/50 shadow-2xl shadow-black/70 hover:shadow-[#C3F53C]/50 hover:shadow-lg hover:bg-white/70 transition-all  hover:scale-105 ease-in-out duration-500 ">
              <h3 className="w-full bg-[#10231D]/50 text-[#C3F53C]/80 font-bold text-center px-5 py-2 text-lg">
                Transacciones
              </h3>
              <img
                src="../images/transaction.png"
                alt="user"
                className="w-[50%] object-contain mb-12 opacity-80"
              />
            </article>
          </section>
        </main>
      </div>
      <img
        src="../images/Polygon 3.png"
        alt="shadow"
        className="absolute bottom-0 right-0"
      />
    </div>
  )
}

export default Dashboard
