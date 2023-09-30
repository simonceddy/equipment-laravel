import { forwardRef, useRef } from 'react';

const Select = forwardRef((props, ref) => {
  const nodeRef = ref || useRef(null);
  const opts = props.options || props.opts || [];
  return (
    <select ref={nodeRef} {...props} className={`dark:bg-black dark:text-white ${props.className}`}>
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
