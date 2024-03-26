import React, { useContext, useState } from "react"
import { MyContext } from "../../context/context"
import EditModal from "../EditModal"
import {
  getMappedUsers,
  handleFilterAndOrder
} from "../../pageFunctions/usersFunctions"
import TableHeadUsers from "./TableHeadUsers"
import TableBodyUsers from "./TableBodyUsers"

function TableUsers({ page, list, setList, thisUser }) {
  const [openModal, setOpenModal] = useState(false)
  const [orederUsers, setOrderUsers] = useState(null)
  const { actualUser, setActualUser } = useContext(MyContext)

  return (
    <>
      {page === "users" && (
        <div className="rounded-lg border  border-gray-200 min-h-full">
          <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
            <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
              <TableHeadUsers setOrderUsers={setOrderUsers} list={list} />
              <TableBodyUsers
                setActualUser={setActualUser}
                setOpenModal={setOpenModal}
                orederUsers={orederUsers}
                list={list}
              />
            </table>
          </div>

          <EditModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            actualUser={actualUser}
            setActualUser={setActualUser}
            setList={setList}
            list={list}
            page="users"
            thisUser={thisUser}
          />
        </div>
      )}
    </>
  )
}

export default TableUsers
