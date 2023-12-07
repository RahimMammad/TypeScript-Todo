import { ChangeEvent, useState } from 'react';

interface TodoItem {
  id: number;
  name: string;
  completed: boolean;
}

const App = () => {
  const [count, setCount] = useState<number>(0);
  const [todosList, setTodosList] = useState<TodoItem[]>([]);
  const [input, setInput] = useState<string>("");

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDecrease = () => {
    setCount(count - 1);
  };

  const handleChangeInp = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      const newTodo: TodoItem = { id: Date.now(), name: input, completed: false };
      setTodosList([...todosList, newTodo]);
      setInput("");
    }
  };

  const handleRemoveTodo = (itemId: number) => {
    setTodosList(todosList.filter((item) => item.id !== itemId));
  };

  const handleEditTodo = (itemId: number, newName: string) => {   
    const updatedTodos = todosList.map((todo) =>
      todo.id === itemId ? { ...todo, name: newName } : todo
    );
    setTodosList(updatedTodos);
    console.log(updatedTodos); 
  };
  

  return (
    <>
      <div>
        <h1>{count}</h1>
        <button onClick={handleIncrease}>Increment</button>
        <button onClick={handleDecrease}>Decrement</button>
      </div>
      <div>
        <input type="text" value={input} onChange={handleChangeInp} />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {todosList.map((todo) => (
            <li key={todo.id}>
              {todo.name}
              <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              <button onClick={() => handleEditTodo(todo.id, todo.name)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
