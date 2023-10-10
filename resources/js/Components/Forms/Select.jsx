import { forwardRef, useRef } from 'react';

const Select = forwardRef((props, ref) => {
  const nodeRef = ref || useRef(null);
  const opts = props.options || props.opts || [];
  // console.log(props.value);
  return (
    <select
      ref={nodeRef}
      {...props}
      value={props.value || 0}
      className={`dark:bg-black dark:text-white ${props.className}`}
    >
      {opts.map((o, id) => (
        <option
          value={o.id}
          label={o.name}
          key={`selector-${props.id || ''}-option-${id}`}
        />
      ))}
    </select>
  );
});

export default Select;
