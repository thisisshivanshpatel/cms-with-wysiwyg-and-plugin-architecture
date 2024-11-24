"use client";

import { getPostBySlug } from "@/api";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ReadPost = ({ slug }: { slug: string }) => {
  const [data, setData] = React.useState({
    title: "",
    slug: "",
    content: { content: "" },
  });

  const getPost = async () => {
    const res = await getPostBySlug(slug);
    if (res?.message?.name === "error") {
      toast.error(res?.message?.detail);
    }

    setData(res);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <nav className="flex justify-between space-x-2">
        <span
          className="cursor-pointer text-xl font-bold p-4"
          onClick={() => {
            redirect(`/`);
          }}
        >
          <IoArrowBack />
        </span>

        <span
          className="cursor-pointer text-xl font-bold p-4"
          onClick={() => {
            redirect(`/edit/${slug}`);
          }}
        >
          <FaRegEdit />
        </span>
      </nav>
      <div className="flex flex-col items-center justify-center">
        <header className="text-2xl font-bold font-mono text-[#A594F9]">
          <p>{data?.title}</p>
        </header>
        <article className="prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: data?.content?.content }} />
        </article>
      </div>
    </>
  );
};

export const MemoizeReadPost = React.memo(ReadPost);
