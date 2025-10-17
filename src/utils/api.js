import axios from "axios";

const BASE_URL = "http://hyeumine.com";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const loginUser = (username, password) =>
  api.post("/forumLogin.php", new URLSearchParams({ username, password }));

export const registerUser = (username, password) =>
  api.post("/forumCreateUser.php", new URLSearchParams({ username, password }));

export const fetchPosts = (page) =>
  api.get(`/forumGetPosts.php?page=${page}`);

export const createPost = (id, post) =>
  api.post("/forumNewPost.php", new URLSearchParams({ id, post }));

export const deletePost = (id) =>
  api.get(`/forumDeletePost.php?id=${id}`);

export const replyPost = (user_id, post_id, reply) =>
  api.post("/forumReplyPost.php", new URLSearchParams({ user_id, post_id, reply }));

export const deleteReply = (id) =>
  api.get(`/forumDeleteReply.php?id=${id}`);
