import React from 'react';
import Pagination from '@mui/material/Pagination';

function CustomPagination({ setPage, numOfPages = 10 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="flex justify-center space-x-1 text-gray-800">
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="primary"
        size="large"
        shape="circle"
        variant="outlined"
      />
    </div>
  );
}

export default CustomPagination;
