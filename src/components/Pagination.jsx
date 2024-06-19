import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';
import clsx from 'clsx';

const Pagination = ({ category }) => {
  const dispatch = useDispatch();
  const { pagination, loading } = useSelector((state) => state.news);

  if (!pagination || loading) {
    return null; // Return null if pagination data is not available or loading
  }

  const { limit, offset, count, total } = pagination;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Change this value to display more or fewer page numbers
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Add "Previous" arrow
    if (currentPage > 1) {
      pageNumbers.push(
        <li key="prev">
          <button
            onClick={() => handlePageChange(offset - limit)}
            className='flex justify-center items-center size-8 hover:bg-gray-200 active:bg-gray-400 rounded-full'
          >
            &laquo;
          </button>
        </li>
      );
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} >
          <button
            onClick={() => handlePageChange((i - 1) * limit)}
            className={clsx('flex justify-center items-center size-8 hover:bg-gray-200 rounded-full', { 'bg-orange-400 hover:bg-orange-400': i === currentPage })}
          >
            {i}
          </button>
        </li>
      );
    }

    // Add "Next" arrow
    if (currentPage < totalPages) {
      pageNumbers.push(
        <li key="next">
          <button
            onClick={() => handlePageChange(offset + limit)}
            className='flex justify-center items-center size-8 hover:bg-gray-200 active:bg-gray-400 rounded-full'
          >
            &raquo;
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  const handlePageChange = (newOffset) => {
    dispatch(fetchNews({ categories: category, offset: newOffset, }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, offset, pagination]);

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