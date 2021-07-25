import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import AddBlogForm from './AddBlogForm';

test('when the form is submitted data is printed', () => {
  const addBlog = jest.fn();

  const component = render(
    <AddBlogForm
      addBlog={addBlog}
    />,
  );

  const blogAuthor = component.container.querySelector('#BlogAuthor');
  const blogTitle = component.container.querySelector('#BlogTitle');
  const blogURL = component.container.querySelector('#BlogURL');
  const createButton = component.getByText('Create');

  fireEvent.change(blogAuthor, {
    target: { value: 'Luis Guzman' },
  });

  fireEvent.change(blogTitle, {
    target: { value: 'Blog created from automated tests' },
  });

  fireEvent.change(blogURL, {
    target: { value: 'https://lmaero.pro' },
  });

  fireEvent.click(createButton);

  expect(addBlog.mock.calls[0][0].author)
    .toBe('Luis Guzman');

  expect(addBlog.mock.calls[0][0].title)
    .toBe('Blog created from automated tests');

  expect(addBlog.mock.calls[0][0].url)
    .toBe('https://lmaero.pro');

  expect(addBlog.mock.calls).toHaveLength(1);
});
