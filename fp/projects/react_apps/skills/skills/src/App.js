import React, { useState } from "react";
import logo from "./logo.svg";
import Form from "./Components/Form/Form";
import "./App.css";

class App extends React.Component {
  state = {
    data: [{ id: 1, skill: "react", rating: "4.5" }],
  };

  onSubmit = (model) => {
    model.id = +new Date();
    this.setState({
      data: [model, ...this.state.data],
    });
  };
  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <h1> Skills App</h1>
        <Form
          className="form"
          title="Form"
          model={[
            {
              key: "skill",
              label: "Skill Name",
              props: { required: true },
            },
            { key: "rating", label: "Rating", type: "number" },
          ]}
          onSubmit={(model) => this.onSubmit(model)}
        />
      </div>
    );
  }
}

export default App;
