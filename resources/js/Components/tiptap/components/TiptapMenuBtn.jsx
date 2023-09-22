function TiptapMenuBtn({
  children, onClick, className, tabIndex = -1
}) {
  return (
    <button
      tabIndex={tabIndex}
      type="button"
      onClick={onClick}
      className={`${className} m-0.5 p-0.5 border rounded-sm border-slate-800 hover:border-cornflower-blue`}
      style={{}}
    >
      {children}
    </button>
  );
}

export default TiptapMenuBtn;
