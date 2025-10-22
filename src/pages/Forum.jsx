import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchPosts,
  createPost,
  deletePost,
  replyPost,
  deleteReply,
} from "../utils/api";
import PostCard from "../components/PostCard";

export default function Forum({ user, setUser }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const newPost = useRef();
  const navigate = useNavigate();

  // Restrict access
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      loadPosts();
    }
  }, [user, page, navigate]);

  const loadPosts = async () => {
  try {
    const res = await fetchPosts(page);
    setPosts(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error(err);
    setPosts([]); 
  }
};

  const handleCreatePost = async () => {
    if (!newPost.current.value.trim()) return;
    const res = await createPost(user.id, newPost.current.value);
    if (res.data.success) {
      newPost.current.value = "";
      loadPosts();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <div class="bg-black min-h-screen pb-10">
      <div className="flex justify-center items-center px-8 py-4 border-b border-[#2c2d2d] shadow-2xl shadow-[#2c2d2d]">
        <div className="max-w-7xl w-full flex justify-end">
          <button
            className="bg-white text-black px-4 py-2 rounded-full font-semibold cursor-pointer hover:bg-gray-300 transition"
            onClick={handleLogout}
          >
            <i class="fa-solid fa-left-from-bracket pr-2"></i>
            Logout
          </button>
        </div>
      </div>

      <div class="font-semibold text-center text-white py-5 ">For you</div>
      <div className=" max-w-2xl mx-auto  bg-[#181818] text-white rounded-3xl border-1 border-[#2c2d2d] shadow-2xl shadow-[#2c2d2d]">
        <div class="p-6 space-y-6  border-[#2c2d2d] ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Welcome, {user?.username}
              <i class="fa-solid fa-hand-wave pl-3"></i>
            </h1>
          </div>

          <div className="flex gap-1">
            <i class="fa-solid fa-circle-user text-5xl pr-3"></i>
            <input
              className="flex-1 border p-2 border-[#2c2d2d] rounded placeholder:text-[#484948] "
              type="text"
              placeholder="What's on your mind?"
              ref={newPost}
            />
            <br></br>
            <button
              className="border border-[#2c2d2d] rounded-lg px-6 py-2 cursor-pointer font-semibold hover:bg-[#33333344] transition"
              onClick={handleCreatePost}
            >
              <i class="fa-solid fa-sign-post pr-2"></i>
              Post
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className="border border-[#2c2d2d] rounded-lg px-6 py-2 cursor-pointer font-semibold hover:bg-[#33333344] transition"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <i class="fa-solid fa-left pr-3"></i>
              Prev
            </button>
            <button
              className="border border-[#2c2d2d] rounded-lg px-6 py-2 cursor-pointer font-semibold hover:bg-[#33333344] transition"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
              <i class="fa-solid fa-right pl-2"></i>
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
  <div className="text-center py-10 text-white font-semibold">
    <i className="fa-solid fa-circle-exclamation pr-2"></i>
    No posts yet. Be the first to post something!
  </div>
) : (
  posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      user={user}
      onDelete={async () => {
        const res = await deletePost(post.id);
        if (res.data.success) loadPosts();
      }}
      onReply={async (reply) => {
        const res = await replyPost(user.id, post.id, reply);
        if (res.data.success) loadPosts();
      }}
      onDeleteReply={async (id) => {
        const res = await deleteReply(id);
        if (res.data.success) loadPosts();
      }}
    />
  ))
)}
      </div>
    </div>
  );
}
