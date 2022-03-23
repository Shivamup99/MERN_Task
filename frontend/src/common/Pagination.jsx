// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.css'

// const Pagination = ({ showPerPage, onPaginationChange, total }) => {
//   const [counter, setCounter] = useState(1);
//   const [numberOfBlog, setNumberOfBlog] = useState( Math.ceil(total / showPerPage));

//   useEffect(() => {
//     const value = showPerPage * counter;
//     onPaginationChange(value - showPerPage, value);
//   }, [counter]);

//   const onButtonClick = (type) => {
//     if (type === "prev") {
//       if (counter === 1) {
//         setCounter(1);
//       } else {
//         setCounter(counter - 1);
//       }
//     } else if (type === "next") {
//       if (numberOfBlog === counter) {
//         setCounter(counter);
//       } else {
//         setCounter(counter + 1);
//       }
//     }
//   };
//   return (
//     <div className="d-flex justify-content-center">
//       <nav aria-label="Page navigation example">
//         <ul className="pagination">
//           <li className="page-item">
//             <a className="page-link" onClick={() => onButtonClick("prev")} >
//               Previous
//             </a>
//           </li>

//           {new Array(numberOfBlog).fill("").map((el, index) => (
//             <li key={el} className={`page-item ${index + 1 === counter ? "active" : null}`}>
//               <a className="page-link" onClick={() => setCounter(index+1)}>
//                 {index+1}
//               </a>
//             </li>
//           ))}
//           <li className="page-item">
//             <a className="page-link" onClick={() => onButtonClick("next")}>
//               Next
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Pagination;

import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <button className="btn btn-info" onClick={() => onButtonClick("prev")}>
        Previous Page
      </button>
      <button className="btn btn-info" onClick={() => onButtonClick("next")}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;