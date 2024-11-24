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
    <div className="max-w-[350px] min-w-[350px] mb-4 p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-lg text-center font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis">
          {title}
        </h5>
      </a>
      {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {content?.content}
      </p> */}

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => redirect(`/read/${slug}`)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Read more
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => handleDelete(slug)}
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() => redirect(`/edit/${slug}`)}
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export const MemoizePostCard = React.memo(PostCard);
