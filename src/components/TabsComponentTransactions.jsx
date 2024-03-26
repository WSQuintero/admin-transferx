import clsx from "clsx"
import React from "react"
import { FaCheck } from "react-icons/fa"
import { FaWindowClose } from "react-icons/fa"

function TabsComponentTransactions({ setActualOption, actualOption }) {
  return (
    <div className="p-5">
      <div className="sm:hidden">
        <label for="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Aprobar</option>
          <option>Rechazar</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <div className="-mb-px flex gap-6" aria-label="Tabs">
            <button
              className={clsx(
                actualOption === "approve" ? "text-[#C3F53C]" : "text-gray-200",
                "inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium  hover:border-[#C3F53C] hover:text-[#C3F53C]"
              )}
              onClick={() => setActualOption("approve")}>
              <FaCheck />
              Aprobar
            </button>

            <button
              onClick={() => setActualOption("reject")}
              className={clsx(
                actualOption === "reject" ? "text-[#C3F53C]" : "text-gray-200",
                "inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium  hover:border-[#C3F53C] hover:text-[#C3F53C]"
              )}>
              <FaWindowClose />
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsComponentTransactions
