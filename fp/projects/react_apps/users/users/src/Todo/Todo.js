import React, { useState } from "react";
import * as actions from "./actions";
import "./Todo.css";
import * as R from "ramda";

const CHANGE_NAME = "CHANGE_NAME";
const DEFAULT = "DEFAULT";
const ADD_SKILL = "ADD_SKILL";
const DELETE_SKILLS = "DELETE_SKILLS";
const DELETE_SKILL = "DELETE_SKILL";
const CHANGE_CATEGORY = "CHANGE_CATEGORY";

const getSkills = (categoryType = "technical") =>
  R.pipe(R.groupBy(R.prop("category")), R.prop(categoryType));

console.log("getSkills", getSkills());

export default class Todo extends React.Component {
  state = {
    skills: [{ id: 1, skill: "react", rating: 4, category: "technical" }],
    skill: "",
    rating: "",
    category: "",
    selectedCategory: "technical",
  };

  reduce = (action) => {
    const stateReducer = actions[action.type] || actions[DEFAULT];
    console.log("BEFORE", this.state, action);
    this.setState(stateReducer(action.payload), () => {
      console.log("AFTER", this.state);
    });
  };

  getSkillsList = () => {
    const { selectedCategory, skills } = this.state;
    console.log("skillsList", selectedCategory, skills);
    return getSkills(selectedCategory)(skills);
  };
  render() {
    return (
      <div>
        {console.log(this.getSkillsList(), "getSkillsList")}
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
          name="category"
          onChange={(event) =>
            this.reduce({
              type: CHANGE_NAME,
              payload: { name: event.target.name, value: event.target.value },
            })
          }
          value={this.state.category}
        >
          <option>select category...</option>
          <option value="technical">Technical Skill</option>
          <option value="soft">Soft Skill</option>
        </select>

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
            payload: {
              skill: this.state.skill,
              rating: this.state.rating,
              category: this.state.category,
            },
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
        >
          Filter By :
          <button
            onClick={this.reduce.bind(null, {
              type: CHANGE_CATEGORY,
              payload: "technical",
            })}
          >
            Technical Skill
          </button>
          <button
            onClick={this.reduce.bind(null, {
              type: CHANGE_CATEGORY,
              payload: "soft",
            })}
          >
            Soft Skill
          </button>
        </div>
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
              <th>Category</th>
              <th>Delete</th>
            </tr>
            {this.getSkillsList &&
              this.getSkillsList().map((item) => (
                <tr>
                  {" "}
                  <td>{item.skill}</td>
                  <td>{item.rating}</td>
                  <td>{item.category}</td>
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
}
