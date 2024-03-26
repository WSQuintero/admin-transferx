import React from "react"

function Pagination({ setActualPage, actualPage }) {
  const handlePrevPage = (event) => {
    event.preventDefault()
    if (actualPage > 1) {
      setActualPage(actualPage - 1)
    }
  }

  const handleNextPage = (event) => {
    event.preventDefault()
    setActualPage(actualPage + 1)
  }
  return (
    <div className="flex justify-center gap-1   h-auto z-60 w-full bg-black p-2">
      <button
        onClick={handlePrevPage}
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        disabled={actualPage === 1}>
        <span className="sr-only">Prev Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div>
        <label htmlFor="PaginationPage" className="sr-only">
          Page
        </label>

        <p
          type="number"
          className="h-8 w-12 font-bold rounded border border-gray-100 bg-white p-0 text-center text-lg  text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none justify-center flex items-center"
          min="1"
          id="PaginationPage">
          {actualPage}
        </p>
      </div>

      <button
        onClick={handleNextPage}
        className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
        <span className="sr-only">Next Page</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
