import { Appbar } from "@/components/appbar";
import { Card } from "@/components/card";

export function Board() {
  return (
    <div>
      <Appbar />

      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            borderRight: "1px dotted black",
            minHeight: "100vh",
          }}
        >
          <Card
            title={"Node to Bun migration"}
            description={
              "this is a random ass description which ain't used for shit"
            }
          ></Card>
          <Card
            title={"Node to Bun migration"}
            description={
              "this is a random ass description which ain't used for shit"
            }
          ></Card>
        </div>
        <div
          style={{
            flex: 1,
            borderRight: "1px dotted black",
            minHeight: "100vh",
          }}
        >
          <Card
            title={"Node to Bun migration"}
            description={
              "this is a random ass description which ain't used for shit"
            }
          ></Card>
        </div>
        <div style={{ flex: 1, minHeight: "100vh" }}>Hi there</div>
      </div>
    </div>
  );
}
