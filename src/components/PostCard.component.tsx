import { deletePost } from "@/api";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const PostCard = ({ title, slug }: { title: string; slug: string }) => {
  const handleDelete = async (slug: string) => {
    const res = await deletePost(slug);
    if (res?.message?.name === "error") {
      toast.error(res?.message?.detail);
    } else {
      toast.success(res.message);
      redirect("/");
    }
  };
  return (
    <div className="max-w-[350px] min-w-[350px] mb-4 p-6 rounded-xl shadow bg-[#8FD14F]">
      <h5 className="mb-4 text-lg text-center font-bold tracking-tight text-white overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </h5>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => redirect(`/read/${slug}`)}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Read
        </button>
        <button
          onClick={() => redirect(`/edit/${slug}`)}
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDelete(slug)}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const MemoizePostCard = React.memo(PostCard);
