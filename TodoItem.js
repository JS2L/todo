import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./TodoItem.css";
// className은 checked가 있으면 하고 없으면 빈 문자열
const TodoItem = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  onChangeSelectedTodo,
}) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoItem">
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        )}
        <div
          className="text"
          onClick={() => {
            onChangeSelectedTodo(todo); // 클릭을 했을때 onChangeSelectedTodo 함수에 현재 가지고 있는 todo 객체를 넣어줌
            onInsertToggle();
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
