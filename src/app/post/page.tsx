import React from "react";
import SectionPosts from "@/components/SectionPosts";

const PostsPage = () => {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6">All Posts</h1>

      {/* ✅ Show all posts here */}
      <SectionPosts />

    </main>
  );
};

export default PostsPage;
