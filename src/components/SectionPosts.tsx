'use client'
import React, { useEffect, useState } from 'react'
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Comment from '@/shared/Comment'
import Textarea from '@/shared/Textarea'
import Image from 'next/image'
import { FaGlobe, FaHeart, FaCommentAlt, FaShareAlt } from 'react-icons/fa'
import Link from 'next/link'
import Heading from '@/shared/Heading'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import CreatePost from './CreatePost'
import axios from 'axios'
import { fetchAllPosts, addComment, likePost } from "@/actions/postActions"; // ✅ Import new API actions

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface User {
	_id: string
	username: string
	email: string
	fullName: string
}

interface Comments {
	_id: string
	replies: Reply[]
	content: string
	user: User
	createdAt: string
}

interface Reply {
	_id: string
	content: string
	user: User
	createdAt: string
}

interface Post {
	_id: string;
	description: string;
	images: { url: string }[];
	user: User;
	stay_id?: string;
	likes: any;
	comments: Comments[];
	createdAt: string;
}

interface SectionPostsProps {
  limit?: number; // ✅ Add a limit prop (default: show all)
}

const PostSection: React.FC<SectionPostsProps> = ({ limit }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [expandedPostId, setExpandedPostId] = useState<number | null>(null)
	const [posts, setPosts] = useState<Post[]>([])
	const [user, setUser] = useState<User | null>(null)
	const [likes, setLikes] = useState<any>([])
	const [commentPost, setCommentPost] = useState<any>()
	const [commentText, setCommentText] = useState('')
	const [refreshTrigger, setRefreshTrigger] = useState(0)

	const userToPass = user || { _id: '', username: '', email: '', fullName: '' }

	const openModal = (post: Post) => {
		setUser(post.user)
		setCommentPost(post)
		setIsModalOpen(true)
	}
	const closeModal = () => {
		setIsModalOpen(false)
	}
	const handleAddComment = async (post: Post) => {
		try {
			const newComment = await addComment({ postId: post._id, commentText });

			setCommentPost((prevPost: Post) =>
				prevPost._id === post._id ? { ...prevPost, comments: [...prevPost.comments, newComment] } : prevPost
			);

			setCommentText("");
			setRefreshTrigger((prev) => prev + 1);
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};

	const handleLike = async (post: Post) => {
		try {
			const updatedLikes = await likePost(post._id);

			setPosts((prevPosts: Post[]) =>
				prevPosts.map((prevPost) =>
					prevPost._id === post._id ? { ...prevPost, likes: updatedLikes } : prevPost
				)
			);
		} catch (error) {
			console.error("Error adding like:", error);
		}
	};

	// ✅ Fetch posts on mount and refresh
	useEffect(() => {
		const getPosts = async () => {
			try {
				const postsData = await fetchAllPosts();
				console.log(postsData, "posts data")

				setPosts(limit ? postsData.slice(0, limit) : postsData); // ✅ Limit posts if needed


				setPosts(postsData);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		getPosts();
	}, [refreshTrigger]);

	const toggleReadMore = (postId: number) => {
		setExpandedPostId((prevId) => (prevId === postId ? null : postId))
	}
	
	const [mainImage, setMainImage] = useState(
		commentPost?.images?.length > 0 ? commentPost.images[0].url : "/default-placeholder.png"
	);


	const renderAuthor = (post: any) => {
		const isExpanded = expandedPostId === post.id;
		const maxLength = 100; // ✅ Set a limit for when to show "Read more"
		const shouldShowReadMore = post.description.length > maxLength;
		const truncatedDescription = post.description.slice(0, maxLength);
		const formattedDate = new Intl.DateTimeFormat('en-GB', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		}).format(new Date(post.createdAt))

		return (
			<div className="max-w-screen-md">
				<MotionConfig
					transition={{
						x: { type: 'spring', stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
				>
					<div className="nc-SingleAuthor flex">
						<Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
						<div className="ml-3 flex max-w-lg flex-col space-y-1 sm:ml-5">
							<span className="text-xs uppercase tracking-wider text-neutral-400">
								{formattedDate}
							</span>
							<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
								<a href={`/profile/${post.user._id}`}>{post.user.fullName}</a>
							</h2>

							<span className="text-sm text-neutral-500 dark:text-neutral-300 sm:text-base">
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
									className="ml-1 inline-block font-medium text-secondary-6000"
									href="#"
								>
									See Property
								</a>
							</p>
						</div>
					</div>
				</MotionConfig>
			</div>
		)
	}
	const renderCommentLists = (post: Post) => {
		return (
			<div className="space-y-1">
				<ul className="nc-SingleCommentLists space-y-1">
					{/* Parent Comment */}
					{post?.comments.map((comment) => (
						<li key={comment._id}>
							<Comment
								user={userToPass}
								comment={comment}
								id={comment._id}
								isParent
								setCommentPost={setCommentPost}
								setRefreshTrigger={setRefreshTrigger}
							/>

							<ul className="mt-5 space-y-5 pl-4 md:pl-11">
								{/* Child Comment */}
								{comment.replies &&
									comment.replies.length > 0 &&
									comment.replies.map((reply) => (
										<li key={reply._id}>
											<Comment
												user={userToPass}
												comment={reply}
												id={comment._id}
												isSmall
												setCommentPost={setCommentPost}
												setRefreshTrigger={setRefreshTrigger}
											/>
										</li>
									))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		)
	}
	const renderSocialActions = (post: Post) => {
		return (
			<div className="flex justify-between border-t border-neutral-200 pt-1 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
				<div className="flex items-center space-x-4">
					<button
						onClick={() => handleLike(post)}
						className="flex items-center space-x-1"
					>
						<FaHeart className="text-red-500" />
						<span>{post.likes.length} Likes</span>
					</button>
					<button
						onClick={() => openModal(post)}
						className="flex items-center space-x-1"
					>
						<FaCommentAlt />
						<span>{post.comments.length} Comments</span>
					</button>
				</div>
				<button className="flex items-center space-x-1">
					<FaShareAlt />
					<span>Share</span>
				</button>
			</div>
		)
	}

	return (
		<div className="nc-PostSection pt-8 lg:pt-10">
			<CreatePost setRefreshTrigger={setRefreshTrigger} />

			<div className="container space-y-10">
				<Heading desc={'Helps to share the experience and connect'}>
					Social Posts
				</Heading>
				{posts.map((post) => (
					<div key={post._id} className="border p-4 rounded-lg shadow-md">
						{renderAuthor(post)}

						{/* ✅ Show Multiple Images */}
						<div className="flex overflow-x-scroll space-x-2">
							{post.images.length > 0 ? (
								post.images.map((img, index) => (
									<Image
										key={index}
										className="h-[300px] w-[400px] rounded-lg object-cover"
										src={img.url}
										alt={`Post Image ${index + 1}`}
										width={800}
										height={600}
									/>
								))
							) : (
								// <Image
								//   className="h-[300px] w-full rounded-lg object-cover opacity-50"
								//   src="/default-placeholder.png"
								//   alt="No Image Available"
								//   width={800}
								//   height={600}
								// />
								<span></span>
							)}
						</div>

						{renderSocialActions(post)}
					</div>
				))}


				<div className="mt-11 flex items-center justify-center">
					<Link href="/post">
						<ButtonSecondary>Show me more</ButtonSecondary>
					</Link>
				</div>
			</div>

			{/* Modal for Comments */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="mx-auto h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-900">
						<div className="h-full overflow-y-auto">
							<div className="flex h-full flex-col lg:flex-row">
								{/* ✅ State to Store Main Image */}
								<div className="p-6 lg:w-1/2">
									{commentPost?.images?.length > 0 ? (
										<div className="relative">
											{/* ✅ Main Image Display */}
											<Image
												className="rounded-xl object-cover"
												src={mainImage} // ✅ Show currently selected image
												width={600}
												height={600}
												alt="Post Image"
											/>

											{/* ✅ Image Thumbnails */}
											<div className="mt-3 flex gap-2 overflow-x-auto">
												{commentPost.images.map((img:any, index:any) => (
													<Image
														key={index}
														className="w-16 h-16 rounded-md object-cover cursor-pointer border-2 hover:border-blue-500"
														src={img.url}
														width={60}
														height={60}
														alt={`Image ${index + 1}`}
														onClick={() => setMainImage(img.url)} // ✅ Click to change main image
													/>
												))}
											</div>
										</div>
									) : (
										// <Image
										// 	className="rounded-xl object-cover opacity-50"
										// 	src="/default-placeholder.png"
										// 	width={600}
										// 	height={600}
										// 	alt="No Image Available"
										// />
										<span>No image uploaded</span>
									)}
									<div className="mt-4">
										<h2 className="text-xl font-semibold">Post Description</h2>
										<p className="text-sm text-neutral-600 dark:text-neutral-300">
											{commentPost?.description}
										</p>
									</div>
								</div>
								<div className="flex flex-col p-6 lg:w-1/2">
									<div className="flex items-center justify-between">
										<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
											Comments
										</h3>
										<button
											className="text-neutral-500 hover:text-neutral-900"
											onClick={closeModal}
										>
											X
										</button>
									</div>
									<div className="max-h-[60vh] flex-grow overflow-y-auto">
										{renderCommentLists(commentPost)}
									</div>
									<div className="mt-4">
										<Textarea
											value={commentText}
											placeholder="Write a comment..."
											onChange={(e) => setCommentText(e.target.value)}
										/>
										<div className="mt-2 space-x-3">
											<ButtonSecondary onClick={closeModal}>
												Close
											</ButtonSecondary>
											<ButtonSecondary
												onClick={() => handleAddComment(commentPost)}
											>
												Add a comment
											</ButtonSecondary>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}


export default PostSection
