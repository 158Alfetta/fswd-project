import React from 'react'

const Pagination = (props) => {
  return (
    <div className="flex flex-col items-end mr-2 mt-3">
      <div className="flex text-gray-700">
        <div
          onClick={props.clickBefore}
          className={`h-8 w-12 mr-1 flex justify-center items-center rounded-full ${
            props.pageData.pageNum === 1
              ? 'display-none '
              : 'bg-gray-200 cursor-pointer'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div
          onClick={props.clickNext}
          className={`h-8 w-12 flex justify-center items-center rounded-full ${
            props.pageData.pageNum * props.pageData.limit >=
            props.pageData.items_count
              ? 'bg-white-100 '
              : 'bg-gray-200 cursor-pointer'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  )
}
export default Pagination
