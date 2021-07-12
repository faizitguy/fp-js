import React, { useState } from "react";
import * as actions from "./actions";

const CHANGE_NAME = "CHANGE_NAME";
const DEFAULT = "DEFAULT";
const ADD_TODO = "ADD_TODO";
const DELETE_TODOS = "DELETE_TODOS";
const DELETE_TODO = "DELETE_TODO";

export default class Todo extends React.Component {
  state = {
    todos: [{ id: 1, task: "read", completed: false }],
    todo: "",
  };

  reduce = (action) => {
    const stateReducer = actions[action.type] || actions[DEFAULT];
    console.log("BEFORE", this.state, action);
    this.setState(stateReducer(action.payload), () => {
      console.log("AFTER", this.state);
    });
  };

  render() {
    return (
      <div>
        <input
          name="todo"
          placeholder="add todo..."
          onChange={(event) =>
            this.reduce({
              type: CHANGE_NAME,
              payload: {
                name: event.target.name,
                value: event.target.value,
              },
            })
          }
        />
        <button
          onClick={this.reduce.bind(null, {
            type: ADD_TODO,
            payload: this.state.todo,
          })}
        >
          Add
        </button>

        <h1>{this.state.todo}</h1>
        <div>
          <button
            onClick={this.reduce.bind(null, {
              type: DELETE_TODOS,
            })}
          >
            Delete All Todos
          </button>

          {this.state.todos &&
            this.state.todos.map((task) => (
              <div>
                {" "}
                <li>
                  {task.task}
                  <button
                    onClick={this.reduce.bind(null, {
                      type: DELETE_TODO,
                      payload: task.id,
                    })}
                  >
                    {" "}
                    Delete
                  </button>
                </li>
              </div>
            ))}
        </div>
      </div>
    );
  }
  // const [todos, setTodos] = useState([
  //   { id: 1, task: "read", completed: true },
  // ]);
  // const [todo, setTodo] = useState("");
  // const handleAdd = () => {
  //   setTodos([...todos, { id: new Date(), task: todo, completed: false }]);
  // };
  // return (
  //   <div>
  //     <h1> Todo</h1>
  //     <input placeholder="add todo" onChange={(e) => setTodo(e.target.value)} />
  //     <button onClick={() => handleAdd()}>Add</button>
  //     <h1>{todo}</h1>
  //     <div>{todos && todos.map((task) => <li>{task.task}</li>)}</div>
  //   </div>
  // );
}
