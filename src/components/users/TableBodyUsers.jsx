import React from "react"
import { getMappedUsers } from "../../pageFunctions/usersFunctions"

function TableBodyUsers({ orederUsers, list, setActualUser, setOpenModal }) {
  return (
    <tbody className="divide-y divide-gray-200 w-full ">
      {getMappedUsers(orederUsers, list)?.map((user) => (
        <React.Fragment key={user.id}>
          <tr key={user.id}>
            <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray">
              {user.id}
            </td>
            <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
              {user.firstname} {user.lastname}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray">
              {user.cellphone}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray">
              {user.email}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray">
              {user.role === 0
                ? "Usuario"
                : user.role === 1
                ? "Administrador"
                : "Compliance"}
            </td>
            <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6 border-r border-gray">
              <button
                className="w-[80%] flex justify-center items-center bg-[#C3F53C] p-2 text-[#10231D] font-bold rounded-xl"
                onClick={() => {
                  setActualUser(null)
                  setOpenModal(true)
                  setActualUser(user)
                }}>
                Editar
              </button>
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  )
}

export default TableBodyUsers
