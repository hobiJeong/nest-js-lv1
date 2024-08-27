// Root
const postsRoot = 'posts';
const commentsRoot = 'comments';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  post: {
    root: postsRoot,
    findOne: `/${postsRoot}/:id`,
  },
  comment: {
    root: commentsRoot,
    delete: `/${commentsRoot}/:id`,
  },
};
