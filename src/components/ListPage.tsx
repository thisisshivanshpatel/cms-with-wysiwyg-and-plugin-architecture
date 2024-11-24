"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { MemoizePostCard } from "./PostCard.component";
import { getPost } from "@/api";

const ListPage = () => {
  const [posts, setPosts] = React.useState([
    { slug: "", title: "", content: { content: "" } },
  ]);

  const fetchPosts = async () => {
    const res = await getPost();
    setPosts(res);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="text-2xl font-bold font-mono text-[#A594F9]">
        <p>CMS with Wysiwyg and Plugin Architecture</p>
      </header>
      <Link href="/create">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-3 mb-4 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Post
        </button>
      </Link>
      {posts.map((post) => (
        <MemoizePostCard
          key={post?.slug}
          slug={post?.slug}
          title={post?.title}
        />
      ))}
    </div>
  );
};

export const MemoizedListPage = React.memo(ListPage);
