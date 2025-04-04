export default function Filter({ id, text, isActive, onChange }) {
  return (
    <div className="inline-flex items-center mr-2 sm:mr-3">
      <input 
        type="radio" 
        id={id} 
        name="filter"
        className="h-3 w-3 sm:h-4 sm:w-4 m-1 sm:m-2" 
        checked={isActive}
        onChange={onChange}
      />
      <label 
        htmlFor={id} 
        className={`text-xs sm:text-sm ${isActive ? 'text-[#9370DB] font-medium' : 'text-gray-500'}`}
      >
        {text}
      </label>
    </div>
  );
}