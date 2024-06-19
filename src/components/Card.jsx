
export default function Card({ source, imgUrl, title, description }) {

  // console.log(source, imgUrl, title, description)

  return (
    <>
      <article className="w-full max-w-80 rounded-lg border border-black">
        {/* <!-- <img src="" alt=""> --> */}
        <div className="w-full h-32 bg-gray-300 flex justify-center items-center">IMAGE</div>
        <section className="py-2 px-4 w-full">
          <section className="text-sm">
            <span className="opacity-50">Source: </span>
            <span>{source || 'N/A'}</span>
          </section>
          <p className="my-2 text-md font-semibold line-clamp-3">{title}</p>
          {imgUrl === "" && (
            <p className="my-2 text-sm line-clamp-5">{description}</p>
          )}
        </section>
      </article>
    </>
  )
}
