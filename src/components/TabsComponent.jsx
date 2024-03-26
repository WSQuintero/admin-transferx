import clsx from "clsx"
import React from "react"
import { CiUser } from "react-icons/ci"
import { GiBank } from "react-icons/gi"

function TabsComponent({ setActualOption, actualOption }) {
  return (
    <div className="p-5">
      <div className="sm:hidden">
        <label for="Tab" className="sr-only">
          Tab
        </label>

        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Editar usuario</option>
          <option>Editar información bancaria</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <div className="-mb-px flex gap-6" aria-label="Tabs">
            <button
              className={clsx(
                actualOption === "edit-user"
                  ? "text-[#C3F53C]"
                  : "text-gray-200",
                "inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium  hover:border-[#C3F53C] hover:text-[#C3F53C]"
              )}
              onClick={() => setActualOption("edit-user")}>
              <CiUser />
              Editar usuario
            </button>

            <button
              onClick={() => setActualOption("edit-info-bank")}
              className={clsx(
                actualOption === "edit-info-bank"
                  ? "text-[#C3F53C]"
                  : "text-gray-200",
                "inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium  hover:border-[#C3F53C] hover:text-[#C3F53C]"
              )}>
              <GiBank />
              Editar información bancaria
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsComponent
