import React, { useRef } from 'react';
import AddBlogForm from './AddBlogForm';
import BlogsList from './BlogsList';

const Home = () => {
  const addBlogFormRef = useRef();

  return (
    <React.StrictMode>
      <>
        <AddBlogForm
          addBlogFormRef={addBlogFormRef}
        />
        <BlogsList />
      </>
    </React.StrictMode>
  );
};

export default Home;
