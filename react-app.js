const { useState } = React;

function Menu({ onChange, current }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <button onClick={() => onChange('counter')} style={{ backgroundColor: current === 'counter' ? '#444' : '#222', color: '#fff' }}>Számláló</button>
      <button onClick={() => onChange('todo')} style={{ backgroundColor: current === 'todo' ? '#444' : '#222', color: '#fff' }}>ToDo Lista</button>
    </div>
  );
}

function CounterApp() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Számláló</h2>
      <p>Érték: {count}</p>
      <button onClick={() => setCount(count + 1)}>Növel</button>
      <button onClick={() => setCount(count - 1)}>Csökkent</button>
      <button onClick={() => setCount(0)}>Visszaállít</button>
    </div>
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  function addTodo() {
    if (text.trim()) {
      setTodos([...todos, text.trim()]);
      setText('');
    }
  }

  return (
    <div>
      <h2>ToDo Lista</h2>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Új feladat" />
      <button onClick={addTodo}>Hozzáadás</button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </div>
  );
}

function App() {
  const [view, setView] = useState('counter');
  return (
    <div>
      <Menu onChange={setView} current={view} />
      {view === 'counter' && <CounterApp />}
      {view === 'todo' && <TodoApp />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
