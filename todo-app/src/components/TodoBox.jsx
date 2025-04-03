
import Form from './Form.jsx'
import Todo from './Todo.jsx'

export default function TodoBox() {
  return (
    <div className='bg-white p-5 rounded-lg w-[50%] min-h-[70vh]'>
      <h2 className='text-2xl font-bold text-center'>Manage your Todos in one place</h2>
      <Form />
      <p htmlFor="new-todo-input" className=" text-xl text-gray-500 ">
          &ensp; Your todos </p>
      <ul>
      <Todo id="todo-1" text="Task 1" completed={false} />
      <Todo id="todo-2" text="Task 2" completed={true}/>
      </ul>
    </div>
  )
}
