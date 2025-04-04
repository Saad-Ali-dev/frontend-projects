import { FaTrashAlt } from 'react-icons/fa'

export default function Todo({ id, text, completed, onToggle, onDelete }) {
  return (
    <li className='flex items-center gap-2 sm:gap-4 m-1 sm:m-2 justify-between bg-[#F8F8FF] p-2 sm:p-3 rounded-lg shadow-sm'>
      <div className='flex items-center gap-2 flex-1 min-w-0'>
        <input 
          type="checkbox" 
          id={id} 
          checked={completed}
          onChange={() => onToggle(id)}
          className="h-4 w-4 sm:h-5 sm:w-5 accent-[#9370DB] cursor-pointer flex-shrink-0"
        />
        <label 
          htmlFor={id} 
          className={`${completed ? 'line-through text-gray-400' : ''} cursor-pointer transition-all duration-200 text-sm sm:text-base truncate`}
        >
          {text}
        </label>
      </div>

      <div className='flex gap-2 flex-shrink-0'>
        <button 
          onClick={() => onDelete(id)}
          className='bg-[#9370DB] text-white py-1 px-2 rounded-lg font-bold hover:bg-[#6950A1] cursor-pointer transition-colors text-xs sm:text-sm'
          aria-label="Delete todo"
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  )
}
