"use client";

import { createPost, getPostBySlug, updatePost } from "@/api";
import RichTextEditor from "@/components/RichTextEditor.component";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { toast } from "react-toastify";

export const CreateForm = ({
  isEdit = false,
  slug = "",
}: {
  isEdit?: boolean;
  slug?: string;
}) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [title, setTitle] = useState("");
  const [slugValue, setSlug] = useState(slug ?? "");
  const [slugError, setSlugError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [id, setId] = useState(0);

  const handleSubmit = async () => {
    if (htmlContent?.length > 5) {
      setContentError("");
    }

    if (title?.length > 2) {
      setTitleError("");
    }

    if (isEdit && slugValue?.length > 2) {
      setSlugError("");
    }

    if (isEdit && slugValue?.length < 2) {
      setSlugError("Slug is too short");
    }

    if (title?.length > 2 && htmlContent?.length > 5) {
      if (isEdit) {
        const res = await updatePost(id, slugValue, title, {
          content: htmlContent,
        });

        if (res?.message?.name === "error") {
          toast.error(res?.message?.detail || "Something went wrong");
        } else {
          toast.success(res.message);
          redirect("/");
        }
      } else {
        const res = await createPost(
          title?.toLowerCase().split(" ")?.join("-"),
          title,
          {
            content: htmlContent,
          }
        );

        if (res?.message?.name === "error") {
          toast.error(res?.message?.detail);
        } else {
          toast.success(res.message);
          redirect("/");
        }
      }
    }

    if (!title?.length) {
      setTitleError("Title is required");
    }
    if (title?.length < 2) {
      setTitleError("Title is too short");
    }

    if (!htmlContent?.length) {
      setContentError("Content is required");
    }
    if (htmlContent?.length < 5) {
      setContentError("Content is too short");
    }
  };

  useEffect(() => {
    if (isEdit) {
      const getData = async () => {
        const res = await getPostBySlug(slug);
        if (res?.message?.name === "error") {
          toast.error(res?.message?.detail);
        }
        setTitle(res?.title);
        setHtmlContent(res?.content?.content);
        setId(res?.id);
      };
      getData();
    }
  }, [isEdit, slug]);

  return (
    <>
      <nav className="flex justify-start">
        <span
          className="cursor-pointer text-xl font-bold p-4"
          onClick={() => {
            redirect(`/`);
          }}
        >
          <IoArrowBack />
        </span>
      </nav>
      <div className="flex flex-col items-center justify-center">
        <header className="text-2xl font-bold font-mono text-[#22C55E]">
          <p>Create A Post</p>
        </header>
        <input
          type="text"
          placeholder="Title"
          className={`mt-4 mb-4 p-4 rounded w-[80%] border-[2px] border-[#F3F4F6]`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && (
          <p className="text-red-500 text-sm text-center font-bold -mt-2 mb-2">
            {titleError}
          </p>
        )}

        {isEdit && (
          <>
            <input
              type="text"
              placeholder="Slug"
              className={`mt-1 mb-4 p-4 rounded w-[80%] border-[2px] border-[#F3F4F6]`}
              value={slugValue}
              onChange={(e) => setSlug(e.target.value)}
            />
            {slugError && (
              <p className="text-red-500 text-sm text-center font-bold -mt-2 mb-2">
                {slugError}
              </p>
            )}
          </>
        )}
        <RichTextEditor
          getHtmlContent={(value) => setHtmlContent(value)}
          content={htmlContent}
        />
        {contentError && (
          <p className="text-red-500 text-sm text-center font-bold mt-1 mb-2">
            {contentError}
          </p>
        )}
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm p-4 text-center mt-4 mb-2 w-32"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </>
  );
};
