export function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      style={{ minWidth: 400, padding: 10, borderRadius: 10, margin: 10 }}
    />
  );
}
