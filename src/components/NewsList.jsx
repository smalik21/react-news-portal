import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../features/news/newsSlice';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
import Card from './Card';

export default function NewsList() {

  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);
  const { category } = useParams();

  useEffect(() => {
    console.log("category:", category)
    const params = category ? { categories: category, offset: 0 } : {};
    dispatch(fetchNews(params));
  }, [dispatch, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <section className='px-4 sm:px-20 py-5 space-y-5'>
        <h2 className='font-semibold text-xl'>News Articles</h2>
        <ul className='gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {articles.map((article, idx) => (
            <Card
              key={idx}
              source={article.source}
              imgUrl={article.image}
              title={article.title}
              description={article.description}
            />
          ))}
        </ul>
      </section>
      <Pagination category={category} />
    </main>
  )
}
