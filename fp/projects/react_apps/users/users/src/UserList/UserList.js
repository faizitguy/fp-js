import React from "react";
import { css } from "glamor";

import * as R from "ramda";
import * as actions from "./actions";

const CHANGE_NAME = "CHANGE_NAME";
const CHANGE_SHOW_TYPE = "CHANGE_SHOW_TYPE";
const ADD_ITEM = "ADD_ITEM";
const DEFAULT = "DEFAULT";

function UserItem(props) {
  const { isActive, ...otherProps } = props;
  return (
    <div
      {...css({
        padding: "20px",
        textTransform: "capitalize",
        margin: "25px 10px",
        color: `${isActive ? "#fff" : "#0078e7"}`,
        width: "100%",
        borderRadius: "10px",
        backgroundColor: `${isActive ? "#0078e7" : "#fff"}`,
      })}
      {...otherProps}
    />
  );
}

const mockUsers = [
  { name: "varenya", type: "verified", isActive: true },
  { name: "vara", type: "top", isActive: true },
  { name: "uttam", type: "top", isActive: false },
  { name: "niraj", type: "top", isActive: true },
  { name: "vishwas", type: "verified", isActive: false },
  { name: "manoj", type: "anonymous", isActive: true },
];

const buttonStyle = {
  backgroundColor: "#0078e7",
  color: "#fff",
  fontSize: "14px",
  lineHeight: "1.1428571428571428",
  margin: "0px",
  paddingLeft: "16px",
  paddingRight: "16px",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "4px",
  border: "0",
  display: "inline-block",
  verticalAlign: "middle",
  textAlign: "center",
  textDecoration: "none",
  appearance: "none",
  ":hover": {
    boxShadow: "inset 0 0 0 999px rgba(0,0,0,0.125)",
    cursor: "pointer",
  },
};

let inputStyles = {
  lineHeight: "inherit",
  margin: "0px",
  paddingLeft: "4px",
  paddingRight: "4px",
  paddingTop: "8px",
  paddingBottom: "8px",
  width: "100%",
  border: "0",
  borderColor: "#eee",
  boxShadow: "inset 0 0 0 1px #eee",
  borderRadius: "4px",
  color: "inherit",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  display: "inline-block",
  verticalAlign: "middle",
};

const getUsers = (userType = "verified", filterFn = R.always(Boolean(true))) =>
  R.pipe(R.groupBy(R.prop("type")), R.prop(userType), R.filter(filterFn));

/* 
 if curious about the pattern checkout xstate
*/

const stateMachine = {
  verified: {
    active: getUsers("verified", R.propEq("isActive", true)),
    inactive: getUsers("verified", R.propEq("isActive", false)),
    all: getUsers("verified"),
  },
  top: {
    active: getUsers("top", R.propEq("isActive", true)),
    inactive: getUsers("top", R.propEq("isActive", false)),
    all: getUsers("top"),
  },
  anonymous: {
    active: getUsers("anonymous", R.propEq("isActive", true)),
    inactive: getUsers("anonymous", R.propEq("isActive", false)),
    all: getUsers("anonymous"),
  },
};

export default class UserList extends React.Component {
  state = {
    selectedList: "verified",
    showStatus: "all",
    users: mockUsers,
    userName: "",
  };

  reduce = (action) => {
    const stateReducer = actions[action.type] || actions[DEFAULT];
    console.log("BEFORE", this.state, action);
    this.setState(stateReducer(action.payload), () => {
      console.log("AFTER", this.state);
    });
  };

  /* FP and state machine */
  getUsersList = () => {
    const { showStatus, selectedList, users } = this.state;
    console.log("showStatus", showStatus, selectedList);
    return stateMachine[selectedList][showStatus](users);
  };
  render() {
    return (
      <div {...css({ width: "50%" })}>
        <div
          {...css({
            justifyContent: "space-evenly",
            margin: "20px",
            display: "flex",
          })}
        >
          <button
            className={`${css(buttonStyle)} verified-users-button`}
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "verified",
            })}
          >
            Verified
          </button>
          <button
            className={`${css(buttonStyle)} top-users-button`}
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "top",
            })}
          >
            Top Users
          </button>
          <button
            className={`${css(buttonStyle)} anonymous-users-button`}
            onClick={this.reduce.bind(null, {
              type: CHANGE_SHOW_TYPE,
              payload: "anonymous",
            })}
          >
            Anonymous
          </button>
        </div>
        <div
          {...css({
            justifyContent: "center",
            margin: "20px",
            display: "flex",
          })}
        >
          <select
            name="showStatus"
            id="show-status-menu"
            onChange={(event) =>
              this.reduce({
                type: CHANGE_NAME,
                payload: { name: event.target.name, value: event.target.value },
              })
            }
            value={this.state.showStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">In Active</option>
          </select>
        </div>
        <div {...css({ display: "flex", justifyContent: "space-evenly" })}>
          <div {...css({ width: "50%" })}>
            <input
              {...css(inputStyles)}
              placeholder="Enter user name"
              value={this.state.userName}
              name="userName"
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
          </div>
          <button
            {...css([
              buttonStyle,
              { backgroundColor: "#0067ee", color: "#fff" },
            ])}
            onClick={this.reduce.bind(null, {
              type: ADD_ITEM,
              payload: this.state.userName,
            })}
          >
            Add
          </button>
        </div>
        {this.getUsersList().map((user) => (
          <UserItem key={user.name} isActive={user.isActive}>
            {user.name}
          </UserItem>
        ))}
      </div>
    );
  }
}
