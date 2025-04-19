import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Számláló</h1>
      <p>Érték: {count}</p>
      <button onClick={() => setCount(count + 1)}>Növel</button>
      <button onClick={() => setCount(count - 1)}>Csökkent</button>
      <button onClick={() => setCount(0)}>Nulláz</button>
    </div>
  );
}
