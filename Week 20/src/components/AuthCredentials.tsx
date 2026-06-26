export function AuthCredentials() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Login to Trello</h1>
      <div>Connect to treelo with:</div>
      <input type="text" placeholder="Email" />

      <input type="text" placeholder="Password" />
    </div>
  );
}