import logo from "./logo.svg";
import Form from "./Components/Form/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1> Skills App</h1>
      <Form
        className="form"
        title="Form"
        model={[
          { key: "skill name", label: "Skill Name", props: { required: true } },
          { key: "rating", label: "Rating", type: "number" },
        ]}
        onSubmit={(model) => this.onSubmit(model)}
      />
    </div>
  );
}

export default App;
