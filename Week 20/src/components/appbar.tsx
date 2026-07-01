export function Appbar() {
  return (
    <div
      style={{
        height: 50,
        borderBottom: "1px solid grey",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ paddingLeft: 10 }}>
        <h2>Trello</h2>
      </div>
      <div></div>
    </div>
  );
}
