import { forwardRef, useRef } from 'react';

const TextInput = forwardRef((props, ref) => {
  const nodeRef = ref || useRef(null);
  return (
    <label className="row w-full justify-between items-center m-1" htmlFor={props.id}>
      {props.label && (
        <span
          className={`${props.labelClassName}`}
        >
          {props.label}
        </span>
      )}
      <input
        ref={nodeRef}
        type={props.type || 'text'}
        {...props}
        className={`p-1 m-1 bg-white text-black focus:bg-cyan-100 rounded dark:bg-black dark:text-white dark:focus:bg-blue-800 border border-slate-500 focus:border-lime-500 ${props.className}`}
      />
    </label>
  );
});

export default TextInput;
