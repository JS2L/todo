import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import "./App.css";
import Template from "./components/Template";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

let nextId = 4;

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null); // 수정 Todo
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일을 +버튼을 눌러 추가 해주세요",
      checked: true,
    },
    {
      id: 2,
      text: "완료되면 박스를 눌러주세요",
      checked: false,
    },
    {
      id: 3,
      text: "수정삭제는 저를 눌러주세요",
      checked: true,
    },
  ]);

  const onInsertToggle = () => {
    // 글자 누른뒤 + 눌렀을때 글자 있는것을 null로 방지
    if (selectedTodo) {
      setSelectedTodo(null);
    }
    setInsertToggle((prev) => !prev); // 이전 값의 boolean값을 반대로 바꿔주는 함수
  };

  const onInsertTodo = (text) => {
    if (text === "") {
      return alert("할 일을 입력해주세요.");
    } else {
      const todo = {
        id: nextId,
        text,
        checked: false,
      };
      setTodos((todos) => todos.concat(todo)); // todos에 push를 안한 이유: 변경되기 전에 값을 기억해야함
      nextId++;
    }
  };

  const onRemove = (id) => {
    // 삭제
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onChangeSelectedTodo = (todo) => {
    // setSelectedTodo에 todo를 넣어줌
    setSelectedTodo(todo);
  };

  return (
    <Template todoLength={todos.length}>
      <TodoList
        todos={todos}
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <div className="add-todo-button" onClick={onInsertToggle}>
        <MdAddCircle />
      </div>
      {insertToggle && (
        <TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onInsertTodo={onInsertTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )}
    </Template>
  );
};
export default App;
