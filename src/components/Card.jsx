import { useNavigate } from "react-router-dom"

export default function Card({ idx, source, imgUrl, title, description }) {

  const navigate = useNavigate()
  // console.log(source, imgUrl, title, description)

  const handleArticleClick = () => {
    navigate(`/article/${idx}`)
  }

  return (
    <>
      <article
        onClick={handleArticleClick}
        className="w-full max-w-80 pb-2 rounded-lg border border-black hover:cursor-pointer"
      >
        {imgUrl && (
          <img
            className="w-full h-32 bg-gray-300 flex justify-center items-center"
            src={imgUrl}
            alt={`${title}-image`}
          />
        )}
        <section className="py-2 px-4 w-full">
          <section className="text-sm flex gap-1">
            <span className="opacity-50">Source: </span>
            <span className="truncate">{source || 'N/A'}</span>
          </section>
          <p className="my-2 text-md font-semibold line-clamp-3">{title}</p>

        </section>
        {!imgUrl && (
          <p className="px-4 text-sm line-clamp-5">{description}</p>
        )}
      </article>
    </>
  )
}
