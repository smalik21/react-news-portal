import { Link } from 'react-router-dom'
import { getFormattedDate } from '../utils'

export default function Header() {
  return (
    <header className="w-full py-2 px-4 sm:px-20 flex justify-between items-center border">
      <h1 className="font-bold text-2xl">
        <Link to={'/'}>News Portal</Link>
      </h1>
      <span className='text-center'>{getFormattedDate()}</span>
    </header>
  )
}
