/* eslint-disable jsx-a11y/label-has-associated-control */
export default function InputLabel({
  value, className = '', children, ...props
}) {
  return (
    <label {...props} className={`block font-medium text-sm text-gray-700 ${className}`}>
      {value || children}
    </label>
  );
}
