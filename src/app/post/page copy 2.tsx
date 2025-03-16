"use client"
import { GetStaticPaths, GetStaticProps } from 'next';

import React, { useState } from "react";
import { DEMO_POSTS } from "@/data/posts";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Comment from "@/shared/Comment";
import Textarea from "@/shared/Textarea";
import Image from "next/image";
import travelhero2Image from "@/images/travelhero2.png";
import { FaGlobe, FaHeart, FaCommentAlt, FaShareAlt } from "react-icons/fa";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleReadMore = (postId: number) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  const renderAuthor = (post: any) => {
    const isExpanded = expandedPostId === post.id;
    const maxLength = 100; // ✅ Set a limit for when to show "Read more"
    const shouldShowReadMore = post.description.length > maxLength;
    const truncatedDescription = post.description.slice(0, maxLength);
  
    return (
      <div className="max-w-screen-md mx-auto">
        <div className="nc-SingleAuthor flex">
          <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
          <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              {post.date}
            </span>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              <a href="/">{post.author}</a>
            </h2>
  
             {/* Description with "Read more" */}
             <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
             {isExpanded ? post.description : truncatedDescription}
      
      {shouldShowReadMore && (
        <button
          className="text-primary-6000 font-medium ml-1"
          onClick={() => toggleReadMore(post.id)}
        >
          {isExpanded ? "Show less" : "... Read more"}
        </button>
      )}
            </span>
  
            <p>
              <FaGlobe className="inline-block text-red-500" />
              <a
                className="inline-block text-secondary-6000 font-medium ml-1"
                href="#"
              >
                See Property
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  const renderCommentLists = (comments: any[]) => {
    if (!comments || comments.length === 0) {
      return <p className="text-neutral-500">No comments available.</p>;
    }
  
    return (
      <div className="space-y-5">
        <ul className="nc-SingleCommentLists space-y-5">
          {comments.map((parentComment) => (
            <li key={parentComment.id}>
              {/* Parent Comment */}
              <Comment
                isParent={true}
                id={parentComment.id}
                comment={parentComment.comment}
                user={parentComment.user}
                setRefreshTrigger={() => console.log('Refresh triggered')}
                setCommentPost={() => console.log('Set comment post')}
              />
  
              {/* Child Comments */}
              {parentComment.children && parentComment.children.length > 0 && (
                <ul className="pl-4 mt-5 space-y-5 md:pl-11">
                  {parentComment.children.map((childComment: any) => (
                    <li key={childComment.id}>
                      <Comment
                        isSmall={true}
                        isParent={false}
                        id={childComment.id}
                        comment={childComment.comment}
                        user={childComment.user}
                        setRefreshTrigger={() => console.log('Refresh triggered')}
                        setCommentPost={() => console.log('Set comment post')}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

  const renderSocialActions = () => {
    return (
      <div className="border-t border-neutral-200 dark:border-neutral-700 pt-1 flex justify-between text-neutral-500 dark:text-neutral-400 text-sm">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1">
            <FaHeart className="text-red-500" />
            <span>6 Likes</span>
          </button>
          <button onClick={openModal} className="flex items-center space-x-1">
            <FaCommentAlt />
            <span>15 Comments</span>
          </button>
        </div>
        <button className="flex items-center space-x-1">
          <FaShareAlt />
          <span>Share</span>
        </button>
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16">
      <div className="nc-SingleContent container space-y-10">
      {posts.map((post) => (
          <div key={post.id}>
            {renderAuthor(post)}
            <Image className="rounded-xl" src={post.image} alt={post.author} />
            {renderSocialActions()}
          </div>
        ))}
        {/* <Image className="rounded-xl" src={travelhero2Image} alt="" /> */}
        {/* {renderSocialActions()} */}
        <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more1111</ButtonSecondary>
                </div>
      </div>

      {/* Modal for Comments */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden w-full max-w-6xl mx-auto h-[90vh]">
      {/* Make the modal scrollable */}
      <div className="h-full overflow-y-auto">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side: Image and Description */}
          <div className="lg:w-1/2 p-6">
            <Image className="rounded-xl" src={travelhero2Image} alt="Post Image" />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Post Title</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                This is a description of the post. It will appear on the left side of the modal.
              </p>
            </div>
          </div>

          {/* Right Side: Scrollable Comments */}
          <div className="lg:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Comments
              </h3>
              {/* Close Button */}
              <button className="text-neutral-500 hover:text-neutral-900" onClick={closeModal}>
                X
              </button>
            </div>

            {/* Make this section also scrollable */}
          {/* this has been commented by ravi, need to see the whole module */}
            {/* <div className="overflow-y-auto flex-grow max-h-[60vh]">
              {renderCommentLists(comments)}
            </div> */}

            <div className="mt-4">
              <Textarea placeholder="Write a comment..." />
              <div className="mt-2 space-x-3">
                <ButtonPrimary>Submit</ButtonPrimary>
                <ButtonSecondary onClick={closeModal}>Close</ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Page;
const posts = [
  {
    id: 1,
    author: "Fones Mimi",
    date: "May 20, 2021",
    description: "There’s no stopping the tech giant. Apple now opens its 100th store in China.Fine more text on click on show more",
    link: "#",
    image: travelhero2Image,
  },
  {
    id: 2,
    author: "John Doe",
    date: "June 15, 2021",
    description: "New breakthrough in AI technology that could change the world.",
    link: "#",
    image: travelhero2Image,
  },
  {
    id: 3,
    author: "Jane Smith",
    date: "July 10, 2021",
    description: "Exploring the future of renewable energy and its potential.",
    link: "#",
    image: travelhero2Image,
  }
  // Add more posts as needed
];

