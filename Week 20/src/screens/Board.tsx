import { useState } from "react";
import { Appbar } from "@/components/appbar";
import { Card } from "@/components/card";
import { BoardSection } from "@/components/boardSection";

export function Board() {
  const [pendingTasks, setPendingTasks] = useState([
    {
      id: 1,
      title: "Node to Bun migration",
      description: "this is a random ass description which ain't used for shit",
    },
  ]);
  const [onGoingTasks, setOnGoingTasks] = useState([
    {
      id: 2,
      title: "Node to Bun migration",
      description: "this is a random ass description which ain't used for shit",
    },
  ]);
  const [doneTasks, setDoneTasks] = useState([
    {
      id: 3,
      title: "Node to Bun migration",
      description: "this is a random ass description which ain't used for shit",
    },
  ]);

  return (
    <div>
      <Appbar />

      <div style={{ display: "flex" }}>
        <BoardSection
          onDrop={(item) => {
            console.log(item);
            setPendingTasks((p) => p.filter((x) => x.id !== item.id));
            setOnGoingTasks((p) => p.filter((x) => x.id !== item.id));
            setDoneTasks((p) => p.filter((x) => x.id !== item.id));
            setPendingTasks((p) => [...p, item]);
          }}
        >
          {pendingTasks.map((task) => (
            <Card
              title={task.title}
              description={task.description}
              id={task.id}
            />
          ))}
        </BoardSection>
        <BoardSection
          onDrop={(item) => {
            console.log(item);
            setPendingTasks((p) => p.filter((x) => x.id !== item.id));
            setOnGoingTasks((p) => p.filter((x) => x.id !== item.id));
            setDoneTasks((p) => p.filter((x) => x.id !== item.id));
            setOnGoingTasks((p) => [...p, item]);
          }}
        >
          {onGoingTasks.map((task) => (
            <Card
              title={task.title}
              description={task.description}
              id={task.id}
            />
          ))}
        </BoardSection>
        <BoardSection
          onDrop={(item) => {
            console.log(item);
            setPendingTasks((p) => p.filter((x) => x.id !== item.id));
            setOnGoingTasks((p) => p.filter((x) => x.id !== item.id));
            setDoneTasks((p) => p.filter((x) => x.id !== item.id));
            setDoneTasks((p) => [...p, item]);
          }}
        >
          {pendingTasks.map((task) => (
            <Card
              title={task.title}
              description={task.description}
              id={task.id}
            />
          ))}
        </BoardSection>
      </div>
    </div>
  );
}
