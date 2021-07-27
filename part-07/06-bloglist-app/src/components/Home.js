import React, { useRef } from 'react';
import AddBlogForm from './AddBlogForm';
import BlogsList from './BlogsList';
import Togglable from './Togglable';

const Home = () => {
  const addBlogFormRef = useRef();

  return (
    <React.StrictMode>
      <>
        <Togglable
          showButtonLabel="Create new Blog"
          hideButtonLabel="Cancel"
          ref={addBlogFormRef}
        >
          <AddBlogForm
            addBlogFormRef={addBlogFormRef}
          />
        </Togglable>

        <BlogsList />
      </>
    </React.StrictMode>
  );
};

export default Home;
