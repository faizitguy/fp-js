import React from "react";
import "./Form.css";

class Form extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }
  onChange = (e, key) => {
    this.setState({
      [key]: this[key].value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  renderForm = () => {
    let model = this.props.model;
    let formUI = model.map((m) => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      return (
        <div key={key} className="form-group">
          <label className="form-label" key={"l" + m.key} htmlFor={m.key}>
            {m.label}
          </label>
          <input
            {...props}
            ref={(key) => {
              this[m.key] = key;
            }}
            className="form-input"
            type={type}
            key={"i" + m.key}
            onChange={(e) => this.onChange(e, key)}
          />
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Form";
    return (
      <div className={this.props.className}>
        <h1>{title}</h1>
        <form className="dynamic-form" onSubmit={(e) => this.onSubmit(e)}>
          {this.renderForm()}
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;
