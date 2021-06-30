const listHelper = require('../utils/list_helper');
const {
  emptyArray,
  listWithOneBlog,
  listWithMultipleBlogs,
} = require('../utils/blogs_list');

describe('most blogs', () => {
  // AN EMPTY ARRAY RETURNS "NO BLOGS IN THIS LIST"
  test('an empty array returns "No blogs in this list"', () => {
    expect(listHelper.mostBlogs(emptyArray)).toBe('No blogs in this list');
  });

  // WHEN LIST HAS ONLY ONE BLOG, RETURNS THE NAME OF THE AUTHOR WITH BLOGS COUNT TO 1
  test('when list has only one blog, returns the name of the author with blogs count to 1', () => {
    const expectedBlog = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    };

    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expectedBlog);
  });

  // RETURNS THE AUTHOR WITH MOST BLOGS AND THE COUNT
  test('returns the author with most blogs and the count', () => {
    const expectedBlog = {
      author: 'Robert C. Martin',
      blogs: 3,
    };

    expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual(expectedBlog);
  });
});
