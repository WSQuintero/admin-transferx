import React, { useState } from "react"
import { formatDate } from "../../utils/Utils"

function TableBugs({ page, bugs }) {
  const [orderBugs, setOrderBugs] = useState(null)

  if (page === "bugs") {
    const handleFilterByIdBug = (event) => {
      const searcheId = event.target.value

      const filteredIdBugs = bugs?.filter(
        (bug) => Number(bug.id) === Number(searcheId)
      )

      if (filteredIdBugs.length) {
        setOrderBugs(filteredIdBugs)
      } else {
        setOrderBugs(bugs)
      }
    }

    const handleOrderByDate = () => {
      const reversedLogs = ([...orderBugs] || [...bugs]).reverse()
      setOrderBugs(reversedLogs)
    }
    return (
      <div className="rounded-lg border border-gray-200 min-h-full">
        <div className="overflow-x-auto rounded-t-lg h-[calc(100vh-120px)]">
          <table className="w-full min-h-full divide-y-2 divide-gray-200 bg-white text-sm ">
            <thead className="ltr:text-left rtl:text-right w-full">
              <tr className="border-r border-gray">
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Id
                  <input
                    type="number"
                    className="hidden w-full  mt-2  bg-black text-white border-2 border-[#C3F53C] px-4 py-2 rounded-md absolute left-0"
                    onChange={handleFilterByIdBug}
                  />
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Id Usuario que presenta error
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Fecha de creación
                  <button
                    className="hidden absolute top-full left-0 mt-0 bg-[#C3F53C] text-black px-4 py-2 rounded-md hover:bg-green-500 w-full"
                    onClick={handleOrderByDate}>
                    Ordenar
                  </button>
                </th>
                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 relative text-gray-700 border-2 border-gray-600  font-bold">
                  Fecha de actualización
                  <button
                    className="hidden absolute top-full left-0 mt-0 bg-[#C3F53C] text-black px-4 py-2 rounded-md hover:bg-green-500 w-full"
                    onClick={handleOrderByDate}>
                    Ordenar
                  </button>
                </th>

                <th className="whitespace-nowrap px-4 py-4 relative bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600 w-1/6 font-bold">
                  Componente de error
                </th>

                <th className="whitespace-nowrap px-4 py-4 bg-[#C3F53C]/50 text-gray-700 border-2 border-gray-600  w-1/6 font-bold ">
                  Descripción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 w-full">
              {(bugs?.length === orderBugs?.length || !orderBugs
                ? bugs
                : orderBugs
              )?.map((bug) => (
                <React.Fragment key={bug.id}>
                  <tr key={bug.id}>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {bug.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 border-r border-gray w-1/6">
                      {bug.userId}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {formatDate(bug.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {formatDate(bug.updatedAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {bug.component}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700 w-1/6  border-r border-gray">
                      {bug.bugFullDescription}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableBugs
