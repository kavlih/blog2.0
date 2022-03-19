import React, { useState, useContext } from 'react';

import { UserContext, Avatar } from '../_components';
import { postsService } from '../_services';

const CreatePost = () => {
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

    postsService.createPost(user.id, formData)
    .then((res) => {
      console.log(res?.data);
    })
    .catch((error) => {
      setFormErrors(error.response.data.errors)
    });
  }

  return (
  <>
    <div id="create-post-container" className="d-flex w-100 justify-content-center flex-column">
      <button id="show-form" className="btn btn-lg btn-green align-self-center"><i className="fas fa-plus"></i></button>

      <form method="POST" id="create-post-form" className="create-post col-12 flex-column">
        <div className="create-post-inner col-sm d-flex flex-wrap w-100">
          <Avatar identicon={user.identicon} />
          <textarea 
            name="message" 
            className="form-control box" 
            placeholder="What's on your mind" 
            value={messageValue}
            onChange={handleChange}
            required
          />          
          <div className="errors col-12">
          </div>
        </div>

        <p className='text-danger'>{formErrors}</p>

        <button onClick={handleSubmit}>create post</button>
      </form>
    </div>
  </>
  );
}

export { CreatePost };