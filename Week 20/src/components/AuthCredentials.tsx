import { Center } from "./center";
import { Input } from "./input";

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
      <Center>
        <h1>Login to Trello</h1>
      </Center>
      <Center>
        <div>Connect to trello with:</div>
      </Center>
      <Center>
        <Input type="text" placeholder="Email" />
      </Center>
      <Center>
        <Input type="text" placeholder="Password" />
      </Center>
    </div>
  );
}