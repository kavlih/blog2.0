import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { UserContext } from '../../context/UserContext';
import { postHelper } from '../../helpers';

const PostForm = ({ setIsSubmit }) => {
  const { user } = useContext(UserContext)

  const [ messageValue, setMessageValue ] = useState("")
  const [ formErrors, setFormErrors ] = useState()

  const handleChange = (e) => {
    const {value} = e.target;
    setMessageValue(value);
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("message", messageValue);

    postHelper.createPost(user.id, formData)
    .then((res) => {
      console.log(res?.data);
      setIsSubmit(true);
    })
    .catch((error) => {
      setFormErrors(error.response.data.errors);
    });
  }

  return (
  <>
    <form method="POST" className="post-form-container">
      <div className="post-form-inner">
        <Link to="/profile" className="avatar-container">
          {/* <Identicon identicon={user.identicon} /> */}
        </Link>
        <TextareaAutosize 
          className="content-container post-message" 
          name="message" 
          placeholder="what's on your mind?"
          value={messageValue}
          onChange={handleChange}
          required/>
      </div>
      <p className="form-errors">{formErrors}</p>
      <button className="btn-submit" onClick={handleSubmit}>
        {/* <FontAwesomeIcon icon={faArrowRight} />   */}
      </button>
    </form>
  </>
  );
}

export default PostForm;