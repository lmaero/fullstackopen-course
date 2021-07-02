const listHelper = require('../utils/list_helper');
const {
  emptyArray,
  listWithOneBlog,
  listWithMultipleBlogs,
} = require('../utils/blogs_list');

describe('most likes', () => {
  // AN EMPTY ARRAY RETURNS "NO BLOGS IN THIS LIST"
  test('an empty array returns "No blogs in this list"', () => {
    expect(listHelper.mostLikes(emptyArray)).toBe('No blogs in this list');
  });

  // WHEN LIST HAS ONLY ONE BLOG, RETURNS THE NAME OF THE AUTHOR WITH CORRESPONDING LIKES
  test('when list has only one blog, returns the name of the author with blogs count to 1', () => {
    const expectedBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };

    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expectedBlog);
  });

  // RETURNS THE AUTHOR WITH MOST LIKES AND THE COUNT
  test('returns the author with most blogs and the count', () => {
    const expectedBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };

    expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual(expectedBlog);
  });
});
