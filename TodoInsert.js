import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import "./TodoInsert.css";

const TodoInsert = ({
  onInsertToggle,
  onInsertTodo,
  selectedTodo,
  onRemove,
  onUpdate,
}) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  // setValue 함수를 이용해서 onChange 함수 만들고 변화가 일어나면 setValue함수에 e.target.value 넣어줌
  const onSubmit = (e) => {
    e.preventDefault();
    onInsertTodo(value);
    setValue("");
    onInsertToggle();
  };
  // e.preventDefault로 새로고침을 막고 받아온 onInsertTodo 함수에 현재 value를 넣고 setValue 초기화

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);
  // 컴포넌트가 처음 렌더링 되면 어떤 것을 실행하느냐를 처리함

  return (
    <div>
      <div className="background" onClick={onInsertToggle}></div>
      <form
        onSubmit={
          selectedTodo
            ? () => {
                onUpdate(selectedTodo.id, selectedTodo.text);
              }
            : onSubmit
        }
      >
        <input
          placeholder="write your todo"
          value={value}
          onChange={onChange}
        ></input>
        {selectedTodo ? ( // 삼항연산자 사용 연필과 쓰레기통 모양 추가
          <div className="rewrite">
            <TiPencil
              onClick={() => {
                onUpdate(selectedTodo.id, value);
              }}
            />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit">
            <MdAddCircle />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInsert;
