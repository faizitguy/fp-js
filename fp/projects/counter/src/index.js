import hh from "hyperscript-helpers";
import { h, diff, patch } from "virtual-dom";
import createElement from "virtual-dom/create-element";
const { div, button } = hh(h);

const initModel = 0;

function view(dispatch, model) {
  return div([
    div({ className: "mv2" }, `Count : ${model}`),
    button(
      { className: "pv1 ph2 mr2", onclick: () => dispatch(messages.ADD) },
      "+"
    ),
    button(
      { className: "pv1 ph2", onclick: () => dispatch(messages.REDUCE) },
      "-"
    ),
  ]);
}

function update(msg, model) {
  switch (msg) {
    case messages.ADD:
      return model + 1;
    case messages.REDUCE:
      return model - 1;
    default:
      return model;
  }
}

const messages = {
  ADD: "ADD",
  REDUCE: "REDUCE",
};

// although we have to make our functions pure
// without changing the state we can't able to render the things dynamically. it's v.imp to maintain a state
// should try to use as much pure functions as we can
// eliminating side effects or tightly controlling side effects
// we can't eliminate it completely since we need something to show on the webpage

// impure => state, side Effect (Interacting with DOM)
// pure => initModel, update, view

// impure code below

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);

  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}
const rootNode = document.getElementById("app");
app(initModel, update, view, rootNode);
// rootNode.appendChild(view(update("plus", initModel)));
