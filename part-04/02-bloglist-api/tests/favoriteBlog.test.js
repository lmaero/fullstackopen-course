const listHelper = require('../utils/list_helper');
const {
  emptyArray,
  listWithOneBlog,
  listWithMultipleBlogs,
} = require('../utils/blogs_list');

describe('favorite blog', () => {
  // AN EMPTY ARRAY RETURNS "NO BLOGS IN THIS LIST"
  test('an empty array returns "No blogs in this list"', () => {
    expect(listHelper.favoriteBlog(emptyArray)).toBe('No blogs in this list');
  });

  // WHEN LIST HAS ONLY ONE BLOG, RETURNS THE SAME BLOG
  test('when list has only one blog, returns the same blog', () => {
    const expectedBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };

    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(expectedBlog);
  });

  // RETURNS THE MOST LIKED BLOG
  test('returns the most liked blog', () => {
    const expectedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    expect(listHelper.favoriteBlog(listWithMultipleBlogs)).toEqual(
      expectedBlog,
    );
  });
});
