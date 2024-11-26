"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { MemoizePostCard } from "./PostCard.component";
import { getPost } from "@/api";

const ListPage = () => {
  const [posts, setPosts] = React.useState<
    [{ slug: string; title: string; content: { content: string } }] | []
  >([]);

  const fetchPosts = async () => {
    const res = await getPost();
    setPosts(res);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="text-2xl font-bold mb-4 font-mono text-[#A594F9]">
        <p>CMS with Wysiwyg and Plugin Architecture</p>
      </header>
      <Link href="/create">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-4"
        >
          Add Post
        </button>
      </Link>
      {posts?.length > 0 &&
        posts.map((post) => (
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
