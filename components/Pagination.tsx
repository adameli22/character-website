import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import usePagination from "../hooks/usePagination";
import styles from "../styles/pagination.module.css";

export type PaginationProps = {
  pageName: string;
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number) => void;
  itemsPerPage?: number;
};


export const dotts = "...";

const Pagination = ({
  pageName,
  totalItems,
  currentPage,
  itemsPerPage,
  renderPageLink,
}: PaginationProps) => {
  
  const pages = usePagination(totalItems, currentPage, itemsPerPage as number);
  
  return (
    <div className={styles.paginationWrapper}>
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span key={i} className={styles.separator}>
            {pageNumber}
          </span>
        ) : (
          <button
            key={i}
            onClick={() => renderPageLink(pageNumber as number)}
            className={classNames(styles.pageItem, {
              [styles.RMactive]: pageNumber === currentPage && pageName === "rickandmorty",
              [styles.SWactive]: pageNumber === currentPage && pageName === "starwars",
              [styles.HPactive]: pageNumber === currentPage && pageName === "harrypotter",
            })}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
