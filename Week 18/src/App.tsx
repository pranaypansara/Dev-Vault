function App() {
  const posts = [
    {
      title: "first post",
      content: "first post content",
    },
    {
      title: "second post",
      content: "second post content",
    },
  ];

  return (
    <div>
      hi there
      {posts.map((p) => (
        <Post title={p.title} content={p.content} />
      ))}
    </div>
  );
}

function Post(props: { title: string; content: string }) {
  return (
    <div style={{ fontSize: "20", border: "2px solid black" }}>
      <div>
        <b>{props.title}</b>
      </div>
      <div>{props.content}</div>
    </div>
  );
}

export default App;
