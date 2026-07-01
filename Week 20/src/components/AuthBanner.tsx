export function AuthBanner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src="data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M39.3458%200.0111238V40L23.9933%2026.4169V39.7363H0V0L39.3458%200.0111238ZM4.82299%2034.9133H19.1703V15.8337L34.5231%2029.4166V4.8327L4.82299%204.82418V34.9133Z'%20fill='%2334D59A'/%3e%3c/svg%3e"
        alt="logo"
      />
      <h1 style={{ color: "white", textAlign: "center", maxWidth: 400 }}>
        Build a board, get the job done before anyone else
      </h1>
    </div>
  );
}
