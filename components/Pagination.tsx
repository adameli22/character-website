import classNames from "classnames";

import styles from "../styles/pagination.module.css";

interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

export const PaginationComponent = ({
  page,
  totalPages,
  handlePagination,
}: Props) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationWrapper}>
        <button
          disabled={page == 1}
          onClick={() => handlePagination(page - 1)}
          type="button"
          className={classNames([styles.pageItem, styles.sides].join(" "))}
        >
          &lt;
        </button>
        {/* first page button */}
        {totalPages > 1 && (
          <button
            onClick={() => handlePagination(1)}
            type="button"
            className={classNames(styles.pageItem, {
              [styles.active]: page === 1,
            })}
          >
            {1}
          </button>
        )}

        {totalPages >= 2 && (
          <button
            onClick={() => handlePagination(2)}
            type="button"
            hidden={page > 5}
            className={classNames(styles.pageItem, {
              [styles.active]: page === 2,
            })}
          >
            {2}
          </button>
        )}

        {totalPages > 3 && (
          <button
            onClick={() => handlePagination(3)}
            type="button"
            hidden={page > 5}
            className={classNames(styles.pageItem, {
              [styles.active]: page === 3,
            })}
          >
            {3}
          </button>
        )}
        {totalPages > 4 && (
          <button
            onClick={() => handlePagination(4)}
            type="button"
            hidden={page > 5}
            className={classNames(styles.pageItem, {
              [styles.active]: page === 4,
            })}
          >
            {4}
          </button>
        )}
        {totalPages > 5 && (
          <button
            onClick={() => handlePagination(5)}
            type="button"
            hidden={page > 5}
            className={classNames(styles.pageItem, {
              [styles.active]: page === 5,
            })}
          >
            {5}
          </button>
        )}

        {/* seporator for the first page numbers */}
        {page > 5 && <div className={styles.separator}>...</div>}

        {/* button for the second last page */}
        {page === totalPages && totalPages >= 5 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button"
            className={styles.pageItem}
          >
            {page - 2}
          </button>
        )}
        {/* button for middle page numbers */}
        {page > 6 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className={styles.pageItem}
          >
            {page - 1}
          </button>
        )}

        {/* this is the active page button*/}

        {page! > 5 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button"
            className={[styles.pageItem, styles.active].join(" ")}
          >
            {page}
          </button>
        )}

        {/* generates the next number in the container */}
        {page! > 5 && page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className={styles.pageItem}
          >
            {page + 1}
          </button>
        )}

        {/* previous page button */}

        {page === 6 && totalPages > 5 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className={styles.pageItem}
          >
            {page - 1}
          </button>
        )}

        {/* seporator for the last page numbers */}
        {page < totalPages - 2 && totalPages > 6 && (
          <div className={styles.separator}>...</div>
        )}

        {/* button for the last page */}
        <button
          onClick={() => handlePagination(totalPages)}
          type="button"
          className={classNames(styles.pageItem, {
            [styles.active]: page === totalPages,
          })}
        >
          {totalPages}
        </button>
        {/* right arrow button */}
        <button
          disabled={page == totalPages}
          onClick={() => handlePagination(page + 1)}
          type="button"
          className={[styles.pageItem, styles.sides].join(" ")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
