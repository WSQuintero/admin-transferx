import React from "react"
import { handleFilterAndOrder } from "../../pageFunctions/usersFunctions"

function TableHeadUsers({ setOrderUsers, list }) {
  const columns = [
    ["id", "Id"],
    ["name", "Nombre"],
    ["tel", "Teléfono"],
    ["email", "Email"]
  ]
  return (
    <thead className="ltr:text-left rtl:text-right w-full">
      <tr className="border-r border-gray">
        {columns.map((column) => (
          <th
            className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold"
            key={column[0]}>
            {column[1]}
            <input
              type={column[0] === "id" ? "number" : "text"}
              className="hidden w-full  mt-2  bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
              onChange={(event) =>
                handleFilterAndOrder(event, setOrderUsers, list, column[0])
              }
            />
          </th>
        ))}
        <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
          Role
          <select
            className="hidden absolute w-full mt-1 text-sm bg-white border  border-gray-400 px-6 py-2 rounded-md right-0"
            onChange={(event) =>
              handleFilterAndOrder(event, setOrderUsers, list, "role")
            }
            value="select">
            <option value="select" disabled className="text-sm">
              Seleccione
            </option>
            <option value="all">Todos</option>
            <option value="Administrador">Administrador</option>
            <option value="Compliance">Compliance</option>
            <option value="Usuario">Usuario</option>
          </select>
        </th>
        <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
          Editar
        </th>
      </tr>
    </thead>
  )
}

export default TableHeadUsers
