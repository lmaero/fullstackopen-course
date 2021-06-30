const listHelper = require('../utils/list_helper');
const {
  emptyArray,
  listWithOneBlog,
  listWithMultipleBlogs,
} = require('../utils/blogs_list');

describe('total likes', () => {
  // OF EMPTY LIST IS ZERO
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes(emptyArray)).toBe(0);
  });

  // WHEN LIST HAS ONLY ONE BLOG, EQUALS THE LIKES OF THAT
  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  // OF A BIGGER LIST IS CALCULATED RIGHT
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(36);
  });
});
