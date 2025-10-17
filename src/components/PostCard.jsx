import { useRef } from "react";

export default function PostCard({
  post,
  user,
  onDelete,
  onReply,
  onDeleteReply,
}) {
  const replyInput = useRef();

  return (
    <div className="border-t border-[#2c2d2d] p-4 space-y-2 shadow">
      <div className="flex">
        <i className="fa-solid fa-circle-user text-[43px] pr-3"></i>

        <div className="space-y-0 flex-1">
          <div className="flex justify-between w-full">
            <div>
              <p className="text-white font-semibold">{post.user}</p>
              <h2 className="font-normal">{post.post}</h2>
            </div>

            {user.username === post.user && (
              <button
                className="text-white cursor-pointer font-semibold border rounded-full px-3 h-fit hover:bg-white hover:text-[#4c4e4e] transition-all"
                onClick={() => window.confirm("Delete post?") && onDelete()}
              >
                <i class="fa-solid fa-trash pr-1"></i> Delete Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <i class="fa-regular fa-circle-user text-3xl"></i>
        <input
          className="flex-1 border p-1 rounded border-[#2c2d2d] "
          placeholder="Reply..."
          ref={replyInput}
        />
        <button
          className="border-[#2c2d2d] border rounded-lg px-3 py-1 cursor-pointer font-semibold hover:bg-[#33333344] transition"
          onClick={() => {
            if (!replyInput.current.value.trim()) return;
            onReply(replyInput.current.value);
            replyInput.current.value = "";
          }}
        >
          Reply
          <i class="fa-solid fa-reply pl-2"></i>
        </button>
      </div>

      <div className=" mt-5 pl-10 space-y-2">
        {post.reply?.map((r) => (
          <div
            key={r.id}
            className="border-l-2 border-[#4c4e4e] pl-3 text-sm space-y-8 flex-col "
          >
            <div className="flex justify-between">
              <div>
                <span className="text-white font-semibold">{r.user}</span>
                <p>{r.reply}</p>
              </div>

              {user.username === r.user && (
                <button
                  className="text-white cursor-pointer font-semibold border h-fit rounded-full px-3 py-1 hover:bg-white hover:text-[#4c4e4e] transition-all"
                  onClick={() =>
                    window.confirm("Delete reply?") && onDeleteReply(r.id)
                  }
                >
                  <i class="fa-regular fa-trash pr-2 "></i>
                  Delete Reply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
