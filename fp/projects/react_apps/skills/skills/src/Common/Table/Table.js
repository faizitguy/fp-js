import React from "react";

const tableHeader = () => {
  return (
    <tr>
      <th>Skill Name</th>
      <th>Rating</th>
      <th></th>
    </tr>
  );
};

const skillRow = (className, skills) => {
  return (
    <tr>
      <td>{skills.skill}</td>
      <td>{skills.rating}</td>
    </tr>
  );
};

const totalRow = (skills) => {};
