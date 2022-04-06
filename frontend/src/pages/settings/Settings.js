import React, { useState, useEffect } from "react";

import { accountHelper } from "../../helpers";

const Settings = () => {
  const [formValues, setFormValues] = useState({
    username: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value}); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = new FormData();
    fields.append("user_id", 1)
    
    try {
      const res = await accountHelper.updateIdenticon(fields);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Settings</h1>

      <button onClick={handleSubmit}>update</button>

    </div>
  );
}

export default Settings;