import Filter from './Filter.jsx'
export default function Form() {
    return (
      <div>
      <form>
          <p htmlFor="new-todo-input" className=" text-xl text-gray-500 m-2">
           &ensp; Add a todo
          </p>
        <div className="flex items-center gap-7">
        <input
          type="text"
          id="new-todo-input"
          className="w-[85%] bg-[#E6E6FA] rounded-lg p-2"
          name="text"
          autoComplete="off"
        />
        <button type="submit" className="bg-[#9370DB] text-white py-2 px-4 rounded-lg font-bold hover:bg-[#6950A1] cursor-pointer">
          Add
        </button>
        </div>
        <div className='flex items-center mt-3'>
        <Filter text="Show all tasks" id="all" />
        <Filter text="Show completed tasks" id="completed" />
        <Filter text="Show remaining tasks" id="remaining" />
        </div>
      </form>
      <hr className='my-5 text-gray-400'/>
      </div>
    );
  }
  
  