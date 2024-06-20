import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import fallbackImg from '../assets/image-not-found.webp'

export default function Article() {
  const [article, setArticle] = useState({})

  const { articles } = useSelector((state) => state.news);
  const { number } = useParams()

  useEffect(() => {
    setArticle(articles[number])
    window.scrollTo(0, 0);
  }, [number])

  const NotAvailable = <span>N/A</span>

  return (
    <main className='px-4 sm:px-20 py-8 space-y-10'>
      <h2 className='font-semibold text-2xl'>Article</h2>
      <article className='lg:px-40'>
        <section className='border-b pb-4 space-y-4'>
          <p>
            <span className='text-gray-400'>Source:</span>
            <a
              target='_blank'
              href={article.url}
              className='ml-2 hover:underline'
            >
              {article.source || NotAvailable}
            </a>
          </p>
          <h1 className='text-3xl font-serif'>{article.title}</h1>
          <section className='flex justify-between'>
            <span>— {article.author || NotAvailable}</span>
            <span>{article.published_at?.split('T')[0] || NotAvailable}</span>
          </section>
        </section>
        <section className='py-8 space-y-8'>
          <img
            src={article.image || fallbackImg}
            alt={`${article.title}-image`}
            className='mx-auto w-full sm:w-3/5'
          />
          <p>{article.description}</p>
        </section>
      </article>
    </main>
  )
}
