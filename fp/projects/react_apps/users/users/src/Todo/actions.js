export const CHANGE_NAME =
  ({ name, value }) =>
  (state, props) => ({
    [name]: value,
  });

export const ADD_SKILL = (skill) => (state, props) => ({
  skills: [
    ...state.skills,
    { id: new Date().toLocaleString(), skill: skill, rating: 4.5 },
  ],
  skill: "",
});

export const DELETE_SKILLS = () => (state, props) => ({
  skills: [],
});

export const DELETE_SKILL = (id) => (state, props) => ({
  skills: [...state.skills.filter((item) => item.id !== id)],
});

export const DEFAULT = () => (state, props) => state;
