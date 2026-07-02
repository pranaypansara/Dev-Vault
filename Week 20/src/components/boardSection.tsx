import { useDrop } from "react-dnd";

export function BoardSection(props) {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: ["card"],
        drop: props.onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })
    
  return (
    <div
      style={{
        flex: 1,
        borderRight: "1px dotted black",
        minHeight: "100vh",
      }}
    >
      {props.children}
    </div>
  );
}
