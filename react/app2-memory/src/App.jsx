import { useState } from "react";

const items = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍉"];
const shuffled = [...items, ...items].sort(() => Math.random() - 0.5);

export default function App() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  function handleClick(index) {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      const [i1, i2] = newFlipped;
      if (shuffled[i1] === shuffled[i2]) {
        setMatched([...matched, i1, i2]);
      }
      setTimeout(() => setFlipped([]), 1000);
    }
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Memóriajáték</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 60px)", gap: "10px", justifyContent: "center" }}>
        {shuffled.map((item, index) => (
          <div key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "60px", height: "60px", fontSize: "2rem", display: "flex",
              alignItems: "center", justifyContent: "center", border: "1px solid #fff",
              background: flipped.includes(index) || matched.includes(index) ? "#333" : "#111",
              cursor: "pointer"
            }}>
            {(flipped.includes(index) || matched.includes(index)) ? item : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}
