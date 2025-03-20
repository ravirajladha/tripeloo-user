'use client'

import getUserDetails from '@/actions/getUserDetails'
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Comment from '@/shared/Comment'
import { Textarea } from '@headlessui/react'
import axios from 'axios'
import { MotionConfig } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCommentAlt, FaGlobe, FaHeart, FaShareAlt } from 'react-icons/fa'
import { useSelector } from "react-redux"; // ✅ Import Redux hook

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface User {
	_id: string
	username: string
	email: string
	fullName: string
	address?: string
	gender?: string
	dateofBirth?: string
	phoneNumber?: string
	aboutYou?: string
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
	_id: string
	content: string
	image: string
	user: User
	comments: Comments[]
	createdAt: string
	likes: any
}

const Profile = ({ params }: { params: Promise<{ profileId: string }> }) => {
	const { user: loggedInUser } = useSelector((state: any) => state.auth); // ✅ Get user from Redux
	const [user, setUser] = useState<User | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
	const [commentPost, setCommentPost] = useState<any>();
	const [commentText, setCommentText] = useState("");
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const profileId = loggedInUser?._id; // ✅ Get profileId from Redux
	const userToPass = user || { _id: "", username: "", email: "", fullName: "" };
	// Fetch user details when profileId changes
	useEffect(() => {
		if (!profileId) {
		  console.warn("No profileId found in Redux. User may not be logged in.");
		  return;
		}
		const fetchUser = async () => {
		  try {
			const res = await axios.get(`${BACKEND_URL}/api/v1/users/${profileId}`, {
			  withCredentials: true,
			});
			setUser(res.data.user);
		  } catch (error) {
			console.error("Error fetching user data:", error);
		  }
		};
		fetchUser();
	  }, [profileId]);

	  useEffect(() => {
		const fetchPosts = async () => {
		  try {
			if (profileId) {
			  const res = await axios.get(
				`${BACKEND_URL}/api/v1/post/user/${profileId}`,
				{
				  withCredentials: true,
				}
			  );
			  setPosts(res.data.posts);
			}
		  } catch (error) {
			console.log(error);
		  }
		};
		fetchPosts();
	  }, [refreshTrigger, profileId]);
	  
	const openModal = (post: Post) => {
		setUser(post.user);
		setCommentPost(post);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	if (!profileId) {
		return <p className="text-center mt-10 text-lg">Please log in to view your profile.</p>;
	}
	const handleAddComment = async (post: Post) => {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/post/createComment`,
				{
					content: commentText,
					postId: post._id,
				},
				{
					withCredentials: true,
				},
			)
			const newComment = res.data.comment

			setCommentPost((prevPost: Post) =>
				prevPost._id === post._id
					? { ...prevPost, comments: [...prevPost.comments, newComment] }
					: prevPost,
			)

			setCommentText('')
			setRefreshTrigger((prev) => prev + 1)
		} catch (error) {
			console.error('Error adding comment:', error)
		}
	}

	const handleLike = async (post: Post) => {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/post/like`,
				{
					postId: post._id,
				},
				{
					withCredentials: true,
				},
			)
			console.log(res.data.post)
			const newLike = res.data.post.likes
			setPosts((prevPosts: Post[]) =>
				prevPosts.map((prevPost) =>
					prevPost._id === post._id
						? { ...prevPost, likes: newLike }
						: prevPost,
				),
			)
		} catch (error) {
			console.error('Error adding like:', error)
		}
	}

	const toggleReadMore = (postId: number) => {
		setExpandedPostId((prevId) => (prevId === postId ? null : postId))
	}

	

	const formatDate = (date: string) => {
		const formattedDate = new Intl.DateTimeFormat('en-GB', {
			year: 'numeric',
			month: 'short',
			day: '2-digit',
		}).format(new Date(date))
		return formattedDate
	}

	// useEffect(() => {
	// 	fetchPosts()
	// }, [refreshTrigger, profileId])

	const renderAuthor = (post: any) => {
		const isExpanded = expandedPostId === post._id
		const truncatedDescription = post.content.slice(0, 100)

		const postDate = formatDate(post.createdAt)

		return (
			<div className="mx-auto max-w-screen-md">
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
								{postDate}
							</span>
							<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
								<a href="/">{post.user.fullName}</a>
							</h2>

							<span className="text-sm text-neutral-500 dark:text-neutral-300 sm:text-base">
								{isExpanded ? post.content : `${truncatedDescription}...`}
								<button
									className="ml-1 font-medium text-primary-6000"
									onClick={() => toggleReadMore(post._id)}
								>
									{isExpanded ? 'Show less' : 'Read more'}
								</button>
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
				{/* <button className="flex items-center space-x-1">
					<FaShareAlt />
					<span>Share</span>
				</button> */}
			</div>
		)
	}

	return (
		<div className="flex p-2">
			<div className="flex flex-col">
				<div className="flex space-x-4 p-4">
					<Avatar sizeClass="w-20 h-20" />
					<div>
						<p className="font-semibold">Name</p>
						<span className="text-sm">{user?.fullName}</span>
						<p className="font-semibold">Email</p>
						<span className="text-sm">{user?.email}</span>
					</div>
				</div>

				<div className="p-4">
					<p className="font-semibold">About You</p>
					<span className="text-sm">{user?.aboutYou}</span>
					<p className="font-semibold">Gender</p>
					<span className="text-sm">{user?.gender || 'Male'}</span>

					<p className="font-semibold">Date of Birth</p>
					<span className="text-sm">
						{formatDate(user?.dateofBirth || '2024-12-09T00:00:00.000Z')}
					</span>

					<p className="font-semibold">Phone Number</p>
					<span className="text-sm">{user?.phoneNumber}</span>

					<p className="font-semibold">Address</p>
					<span className="text-sm">{user?.address}</span>
				</div>
			</div>

			<div className="p-2">
				<div className="container space-y-10">
					<h2 className="text-2xl font-bold">Posts</h2>
					{posts.map((post) => (
						<div key={post._id}>
							{renderAuthor(post)}
							<Image
								className="h-[300px] w-full rounded-xl object-top sm:h-[300px] md:h-[400px] lg:h-[500px]"
								src={post?.image}
								alt={post?.user?.fullName}
								width={1200}
								height={800}
							/>
							{renderSocialActions(post)}
						</div>
					))}

					{/* <div className="mt-11 flex items-center justify-center">
						<Link href="/post">
							<ButtonSecondary>Show me more</ButtonSecondary>
						</Link>
					</div> */}
				</div>

				{/* Modal for Comments */}
				{isModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="mx-auto h-[90vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-900">
							<div className="h-full overflow-y-auto">
								<div className="flex h-full flex-col lg:flex-row">
									<div className="p-6 lg:w-1/2">
										<Image
											className="rounded-xl"
											src={commentPost?.image}
											width={600}
											height={600}
											alt="Post Image"
										/>
										<div className="mt-4">
											<h2 className="text-xl font-semibold">Post Title</h2>
											<p className="text-sm text-neutral-600 dark:text-neutral-300">
												{commentPost?.content}
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
		</div>
	)
}

export default Profile
