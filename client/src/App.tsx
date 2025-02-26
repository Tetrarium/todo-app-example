import { ITodo } from "./types/types";
import './styles.sass';
import { useFetch } from "./hooks/useFetch";
import { useEffect, useState } from "react";

function App() {
  const {data: todos, error, loading, fetchData } = useFetch<ITodo[]>('http://localhost:3001/todos')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) return;

    try {
      // Отправка нового туду на сервер
      await fetchData({ title, description }, { method: "POST" });

      // После успешного создания туду — обновляем список
      await fetchData();
      
      // Очищаем поля формы
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Ошибка при создании туду:", error);
    }
  };


  return (
    <div className="app">
      <h1 className="app__title">TODO</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-form__input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="todo-form__textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="todo-form__button" type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
      { loading && <p>Loading...</p>}
      { error && <p>{error}</p>}
      <div className="todo-list">
        { Array.isArray(todos) && todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <h3 className="todo__title">{todo.title}</h3>
            <div className="todo__content">
              <p className="todo__description">{todo.description}</p>
              <div
                className={`todo__completed ${todo.done ? 'completed' : 'not-completed'}`}
              >{todo.done ? 'Completed' : 'Not completed'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
