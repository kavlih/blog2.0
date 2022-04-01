import React from 'react';

const DropDownCard = ({ data = [], setOpen }) => (
  <div className="dropdown">
    <ul>
      {data.map((item, i) => (
        <li key={i} onClick={() => setOpen(false)}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default DropDownCard;