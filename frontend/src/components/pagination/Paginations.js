import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({ handlePrevious, handleNext, page, pageCount, setPage }) => {
  return (
    <>
      {
  pageCount > 0 && (
    <div className="pagination_div d-flex justify-content-center mt-4">
      <Pagination className="shadow-sm p-2">
        <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
        
        {/* Dynamically generate pagination items */}
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index}
            active={page === index + 1}
            onClick={() => setPage(index + 1)}
            className="mx-1"
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
      </Pagination>
    </div>
  )
}

    </>
  )
}

export default Paginations