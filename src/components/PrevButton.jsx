function PrevButton({ onClick, disabled }) {
  return (
    <button className="nav-btn" type="button" onClick={onClick} disabled={disabled}>
      Prev
    </button>
  );
}

export default PrevButton;
