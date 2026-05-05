function NextButton({ onClick, disabled }) {
  return (
    <button className="nav-btn" type="button" onClick={onClick} disabled={disabled}>
      Next
    </button>
  );
}

export default NextButton;
