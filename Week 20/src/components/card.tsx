import { useDrag } from "react-dnd";

export function Card({ title, description, id }) {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: { title, description, id},
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [title, description],
  );

  return (
    <div
      ref={dragRef}
      style={{
        opacity,
        border: "1px solid #b2bec3",
        borderRadius: 10,
        padding: 20,
        margin: 20,
        cursor: "pointer",
      }}
    >
      {title}
      <div style={{ height: 1, width: "100%", background: "black" }} />
      {description}
    </div>
  );
}
