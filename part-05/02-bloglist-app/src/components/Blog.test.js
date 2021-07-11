import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

describe('when a blog is rendered', () => {
  let component;
  const incrementLikes = jest.fn();

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
        incrementLikes={incrementLikes}
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

  test('when show details button is pressed, likes and url are shown', () => {
    const button = component.getByText('View details');
    fireEvent.click(button);

    const shownDiv = component.container.querySelector('.hiddenByDefault');
    expect(shownDiv).toHaveStyle('display: block');

    const url = component.getByText('URL: https://lmaero.pro');
    expect(url).toBeDefined();

    const likes = component.getByText('Likes: 10000');
    expect(likes).toBeDefined();
  });


  test('when the likes button is pressed, event handler is called twice', () => {
    const likesButton = component.getByText('Like');
    fireEvent.click(likesButton);
    fireEvent.click(likesButton);

    expect(incrementLikes.mock.calls).toHaveLength(2);
  });
});
