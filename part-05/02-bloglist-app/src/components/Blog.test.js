import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

describe('when a blog is rendered', () => {
  let component;

  beforeEach(() => {
    const blog = {
      author: 'Luis Guzman',
      title: 'A good test from react using jest',
      url: 'https://lmaero.pro',
      likes: 10000,
    };

    component = render(
      <Blog
        blog={ blog }
        blogs = { [] }
        showNotification={ function () { } }
        setBlogs={ function () { } }
        loggedUser={ { name: 'Luis Guzman' } }
      />
    );
  });

  test('renders title and author', () => {
    const titleAndAuthor = component
      .getByText('A good test from react using jest Luis Guzman');
    expect(titleAndAuthor).toBeDefined();
  });

  test('render the show details button by default', () => {
    const shownDiv = component.container.querySelector('.shownByDefault');
    expect(shownDiv).toHaveStyle('display: block');
  });

  test('does not render likes and url by default', () => {
    const hiddenDiv = component.container.querySelector('.hiddenByDefault');
    expect(hiddenDiv).toHaveStyle('display: none');
  });
});
