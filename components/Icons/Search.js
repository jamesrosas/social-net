import * as React from "react"

const Search= (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="m21 21-4.486-4.494M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
      {...props}
    />
  </svg>
)

export default Search
