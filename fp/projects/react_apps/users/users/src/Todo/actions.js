export const CHANGE_NAME =
  ({ name, value }) =>
  (state, props) => ({
    [name]: value,
  });

export const ADD_SKILL =
  ({ skill, rating, category }) =>
  (state, props) => ({
    skills: [
      ...state.skills,
      {
        id: new Date().toLocaleString(),
        skill: skill,
        rating: rating,
        category: category,
      },
    ],
    skill: "",
  });

export const DELETE_SKILLS = () => (state, props) => ({
  skills: [],
});

export const DELETE_SKILL = (id) => (state, props) => ({
  skills: [...state.skills.filter((item) => item.id !== id)],
});

export const CHANGE_CATEGORY = (type) => (state, props) => ({
  selectedCategory: type,
});

export const DEFAULT = () => (state, props) => state;
