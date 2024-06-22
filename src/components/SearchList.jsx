import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';
import { useParams, useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import Card from './Card';

export default function SearchList() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const { keyword } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const offset = (page - 1) * 10; // Assuming limit is 10
    const params = { keywords: keyword, offset };

    dispatch(fetchNews(params));
  }, [dispatch, keyword, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <section className='px-4 sm:px-20 py-5 space-y-5'>
        <h2 className='text-xl font-light'>Search Results for
          <span className='font-semibold'> {keyword}</span>
        </h2>
        {articles.length === 0 ? (
          <p className='text-center text-2xl pt-8 text-gray-400'>No articles found</p>
        ) : (
          <ul className='gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {articles.map((article, idx) => (
              <Card
                key={idx}
                idx={idx}
                source={article.source}
                imgUrl={article.image}
                title={article.title}
                description={article.description}
              />
            ))}
          </ul>
        )}
      </section>
      <Pagination category='' keyword={keyword} />
    </main>
  );
}
