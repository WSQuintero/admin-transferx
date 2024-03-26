import React, { useState, useEffect, useRef, useContext } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { CiUser } from "react-icons/ci"
import { GrTransaction } from "react-icons/gr"
import { FaTicketSimple } from "react-icons/fa6"
import { CiSettings } from "react-icons/ci"
import { VscAccount } from "react-icons/vsc"
import { FaWpforms } from "react-icons/fa"
import { GiArchiveRegister } from "react-icons/gi"
import { IoBugSharp } from "react-icons/io5"

import SidebarLinkGroup from "./SidebarLinkGroup"
import { MyContext } from "../context/context"

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded")
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )
  const { user } = useContext(MyContext)
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded)
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded")
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded])

  return (
    <div className="z-50">
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={` flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-black p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}>
        <img
          src="/src/images/squad.png"
          alt="squad"
          className="absolute top-0 right-0 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}>
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <NavLink end to="/" className="w-full flex justify-center">
            <img
              src="/src/images/favicon.png"
              alt="favicon"
              className="hidden sm:block"
            />
          </NavLink>
        </div>
        <div className="space-y-8 mt-20">
          <div>
            <h3 className="text-xs uppercase text-white/10 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true">
                •••
              </span>
            </h3>
            <ul className="mt-3">
              <SidebarLinkGroup
                activecondition={
                  pathname === "/" || pathname.includes("dashboard")
                }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === "/" || pathname.includes("dashboard")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MdOutlineAdminPanelSettings />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {user?.role === 1
                                ? "Administrador"
                                : user?.role === 2
                                ? "compliance "
                                : false}
                            </span>
                          </div>
                          {/* <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div> */}
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block mt-5">
                        <ul className={`pl-9 mt-1`}>
                          {user?.role === 1 && (
                            <>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/users"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (!isActive
                                      ? "text-white/50"
                                      : "text-[#C3F53C] hover:text-white/60")
                                  }>
                                  <span className="flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <CiUser />
                                    Usuarios
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/tickets"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (!isActive
                                      ? "text-white/50"
                                      : "text-[#C3F53C] hover:text-white/60")
                                  }>
                                  <span className="flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <FaTicketSimple />
                                    Tickets
                                  </span>
                                </NavLink>
                              </li>
                              {/* <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/transactions"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (!isActive
                                      ? "text-white/50"
                                      : "text-[#C3F53C] hover:text-white/60")
                                  }>
                                  <span className=" flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <GrTransaction />
                                    Transacciones
                                  </span>
                                </NavLink>
                              </li> */}
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/logs"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (!isActive
                                      ? "text-white/50"
                                      : "text-[#C3F53C] hover:text-white/60")
                                  }>
                                  <span className=" flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <GiArchiveRegister />
                                    Logs
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/bugs"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (!isActive
                                      ? "text-white/50"
                                      : "text-[#C3F53C] hover:text-white/60")
                                  }>
                                  <span className=" flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    <IoBugSharp />
                                    Bugs
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          )}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/transactions"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (!isActive
                                  ? "text-white/50"
                                  : "text-[#C3F53C] hover:text-white/60")
                              }>
                              <span className=" flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                <GrTransaction />
                                Transacciones
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/sarlaft"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (!isActive
                                  ? "text-white/50"
                                  : "text-[#C3F53C] hover:text-white/60")
                              }>
                              <span className="flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                <FaWpforms />
                                Sarlaft
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup>

              {/* <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 mt-5 ${
                          pathname.includes("settings")
                            ? "hover:text-slate-200"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true)
                        }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CiSettings />
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Settings
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-white/50"
                                  : "text-[#C3F53C] hover:text-white/60")
                              }>
                              <span className="flex gap-3 text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                <VscAccount />
                                Cuenta
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  )
                }}
              </SidebarLinkGroup> */}
            </ul>
          </div>
        </div>

        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24">
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
