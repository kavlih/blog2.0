import React, { useContext } from 'react';

import { UserContext, Avatar } from '../_components';
import { postsService } from '../_services';

const CreatePost = () => {
  const { user } = useContext(UserContext)

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('user_id', '1');
    formData.append('message', 'Post Content, for some reason i need to type some more letters...');

    postsService.createPost(formData)
    .then((res) => {
      console.log(res?.data);
    })
    .catch((res) => {
      console.log(res);
    });
  }

  return (
  <>
    <div id="create-post-container" className="d-flex w-100 justify-content-center flex-column">
      <button id="show-form" className="btn btn-lg btn-green align-self-center"><i className="fas fa-plus"></i></button>

      <form method="POST" id="create-post-form" className="create-post col-12 flex-column">
        <div className="create-post-inner col-sm d-flex flex-wrap w-100">
          <Avatar identicon={user.identicon} />

          <textarea name="post" className="form-control box" placeholder="What's on your mind"></textarea> 
                    
          <div className="errors col-12">
          </div>
        </div>

        <button onClick={handleSubmitPost}>create post</button>
      </form>
    </div>
  </>
  );
}

export { CreatePost };