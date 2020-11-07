import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Pagination as ReactPagination } from "react-bootstrap";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <ReactPagination className="justify-content-center">
      {/* <ReactPagination.First />
      <ReactPagination.Prev /> */}
      {pages.map((page) => (
        <ReactPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </ReactPagination.Item>
      ))}
      {/* <ReactPagination.Next />
      <ReactPagination.Last /> */}
    </ReactPagination>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
