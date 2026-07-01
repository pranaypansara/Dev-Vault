export function Button(props) {
  return (
    <button
      style={{ cursor: "pointer", minWidth: 100, margin: 10, padding: 5 }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
