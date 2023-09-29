function TypeListItem({ children, className = '' }) {
  return (
    <li className={`odd:bg-blue-400/30 even:bg-red-400/30 row ${className}`}>
      {children}
    </li>
  );
}

export default TypeListItem;
