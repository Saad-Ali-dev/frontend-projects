import { useState } from 'react'
import Filter from './Filter.jsx'

export default function Form({ onSubmit, onFilterChange, currentFilter }) {
    const [text, setText] = useState('');
    
    function handleSubmit(e) {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text.trim());
        setText(''); 
      }
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <p htmlFor="new-todo-input" className="text-lg sm:text-xl text-gray-500 m-1 sm:m-2">
            &ensp; Add a todo
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 md:gap-7">
            <input
              type="text"
              id="new-todo-input"
              className="w-full sm:w-[80%] md:w-[85%] bg-[#E6E6FA] rounded-lg p-2 text-sm sm:text-base"
              name="text"
              autoComplete="off"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
            />
            <button 
              type="submit" 
              className="bg-[#9370DB] text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium sm:font-bold text-sm sm:text-base hover:bg-[#6950A1] cursor-pointer transition-colors"
              disabled={!text.trim()}
            >
              Add
            </button>
          </div>
          <div className='flex flex-wrap items-center mt-3 gap-x-1 sm:gap-x-0'>
            <Filter 
              text="All" 
              id="all" 
              isActive={currentFilter === 'all'}
              onChange={() => onFilterChange('all')} 
            />
            <Filter 
              text="Completed" 
              id="completed" 
              isActive={currentFilter === 'completed'}
              onChange={() => onFilterChange('completed')} 
            />
            <Filter 
              text="Remaining" 
              id="remaining" 
              isActive={currentFilter === 'remaining'}
              onChange={() => onFilterChange('remaining')} 
            />
          </div>
        </form>
        <hr className='my-5 text-gray-400'/>
      </div>
    );
  }
  
  