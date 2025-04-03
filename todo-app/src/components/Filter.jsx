export default function Filter(props) {
    return (
      <>
      <input type="checkbox" id={props.id} className="m-2" aria-pressed="true" />
      <label htmlFor={props.id} className="text-gray-500 relative top-[-1px]">{props.text}</label>
      </>
    );
  }
  

  