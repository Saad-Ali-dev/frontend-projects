import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export default function Todo(props) {
  return (
    <li className='flex items-center gap-4 m-2 justify-between'>
      <div className='flex items-center gap-2'>
      <input type="checkbox" id={props.id} defaultChecked={props.completed}aria-pressed="true" />
      <label htmlFor={props.id} >{props.text}</label>
      </div>

      <div className='flex gap-2'>
      <button className='bg-[#9370DB] text-white py-1 px-2 rounded-lg font-bold hover:bg-[#6950A1] cursor-pointer'><FaEdit /></button>
      
      <button className='bg-[#9370DB] text-white py-1 px-2 rounded-lg font-bold hover:bg-[#6950A1] cursor-pointer'><FaTrashAlt /></button>
      </div>

    </li>
  )
}
