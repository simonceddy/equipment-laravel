function FormButton({
  children, submits = false, onClick, className, disabled = false
}) {
  return (
    <button
      disabled={disabled}
      className={`p-2 m-2 border-2 rounded-lg border-slate-500 hover:border-yellow-500 active:border-green-500 ${className}`}
      onClick={onClick}
      type={submits ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

export default FormButton;
