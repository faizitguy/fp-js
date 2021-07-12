import React, { useState } from "react";
import * as actions from "./actions";
import "./Todo.css";

const CHANGE_NAME = "CHANGE_NAME";
const DEFAULT = "DEFAULT";
const ADD_SKILL = "ADD_SKILL";
const DELETE_SKILLS = "DELETE_SKILLS";
const DELETE_SKILL = "DELETE_SKILL";

export default class Todo extends React.Component {
  state = {
    skills: [{ id: 1, skill: "react", rating: 4.2 }],
    skill: "",
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
          name="skill"
          placeholder="add skill..."
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
        <select
          name="rating"
          onChange={(event) =>
            this.reduce({
              type: CHANGE_NAME,
              payload: { name: event.target.name, value: event.target.value },
            })
          }
          value={this.state.showStatus}
        >
          <option>select rating...</option>
          <option value="1">one</option>
          <option value="2">two</option>
          <option value="3">three</option>
          <option value="4">four</option>
          <option value="5">five</option>
        </select>
        <button
          onClick={this.reduce.bind(null, {
            type: ADD_SKILL,
            payload: this.state.skill,
          })}
        >
          Add
        </button>

        <h1>{this.state.skill}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        ></div>
        <div>
          <button
            onClick={this.reduce.bind(null, {
              type: DELETE_SKILLS,
            })}
          >
            Delete All Skills
          </button>
          <table id="skills">
            <tr>
              <th>skill name</th>
              <th>rating</th>
              <th>Delete</th>
            </tr>
            {this.state.skills &&
              this.state.skills.map((item) => (
                <tr>
                  {" "}
                  <td>{item.skill}</td>
                  <td>{item.rating}</td>
                  <td>
                    <button
                      onClick={this.reduce.bind(null, {
                        type: DELETE_SKILL,
                        payload: item.id,
                      })}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
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
