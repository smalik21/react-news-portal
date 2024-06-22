import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Pagination = ({ category, keyword }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pagination, loading } = useSelector((state) => state.news);

  if (!pagination || loading) {
    return null;
  }

  const { limit, offset, count, total } = pagination;
  const currentPage = parseInt(searchParams.get('page')) || Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // "Previous" arrow
    if (currentPage > 1) {
      pageNumbers.push(
        <li key="prev">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className='flex justify-center items-center size-8 hover:bg-gray-200 active:bg-gray-400 rounded-full'
          >
            &laquo;
          </button>
        </li>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={clsx('flex justify-center items-center size-8 hover:bg-gray-200 rounded-full border-black', { 'border': i === currentPage })}
          >
            {i}
          </button>
        </li>
      );
    }

    // "Next" arrow
    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className='flex justify-center items-center size-8 hover:bg-gray-200 active:bg-gray-400 rounded-full'
          >
            &raquo;
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section className="mt-10 mb-20 space-y-6">
      <ul className='flex justify-center gap-5'>{renderPageNumbers()}</ul>
      <p className='flex justify-center'>
        Showing {count} of {total} results
      </p>
    </section>
  );
};

export default Pagination;
