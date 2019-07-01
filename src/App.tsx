import React, { Fragment, useState } from "react";
import "./App.css";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const App: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          required
          placeholder="todo item..."
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <section>
        <ol>
          {todos.map((todo: ITodo, index: number) => (
            <li
              key={index}
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}{" "}
              <button onClick={() => completeTodo(index)}>
                {todo.complete ? "Incomplete" : "Complete"}
              </button>
              <button onClick={() => removeTodo(index)}>&times;</button>
            </li>
          ))}
        </ol>
      </section>
    </Fragment>
  );
};

export default App;
