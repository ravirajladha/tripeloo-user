'use client'
import React, { FC, useState } from 'react'
import Avatar from '@/shared/Avatar'
import Textarea from '@/shared/Textarea' // Assuming you have a Textarea component
import axios from 'axios'

export interface CommentProps {
	isSmall?: boolean // Flag for child comment
	isParent?: boolean // Flag for parent comment
	comment: Comment
	id: string
	setRefreshTrigger: any
	user: User
	setCommentPost: any
}
export interface Comment {
	_id: string
	content: string
	user: User
	createdAt: string
}

export interface Reply {
	_id: string
	content: string
	createdAt: string
}

interface User {
	_id: string
	username: string
	email: string
	fullName: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const Comment: FC<CommentProps> = ({
	comment,
	id,
	isSmall,
	isParent = true,
	setRefreshTrigger,
	user,
	setCommentPost,
}) => {
	// Local state to control reply input visibility
	const [reply, setReply] = useState('')
	const [isReplying, setIsReplying] = useState(false)

	// Function to toggle reply input box
	const handleReplyClick = () => {
		setIsReplying(!isReplying)
	}

	const formattedDate = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}).format(new Date(comment.createdAt))

	const createReply = async () => {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/post/comment/reply`,
			{
				commentId: id,
				content: reply,
			},
			{
				withCredentials: true,
			},
		)
		const newReply = res.data.reply
		newReply.user = user

		setCommentPost((prevPost: any) => {
			// Assuming prevPost.comments is an array of comments
			const updatedComments = prevPost.comments.map((existingComment: any) => {
				// Find the comment being replied to and add the new reply
				if (existingComment._id === id) {
					return {
						...existingComment,
						replies: [...existingComment.replies, newReply], // Assuming "comments" holds the replies
					}
				}
				return existingComment
			})

			// Return the updated post state
			return {
				...prevPost,
				comments: updatedComments,
			}
		})

		if (res.status === 200) {
			setRefreshTrigger((prev: number) => prev + 1)
			setReply('')
			setIsReplying(false)
		}
	}

	return (
		<div className="nc-CommentCard flex">
			<div className="pt-1">
				<Avatar sizeClass={`w-6 h-6 ${!isSmall ? 'sm:h-8 sm:w-8 ' : ''}`} />
			</div>
			<div className="ml-2 flex flex-grow flex-col rounded-xl border border-neutral-200 p-4 text-sm dark:border-neutral-700 sm:ml-3 sm:text-base">
				<div className="relative flex items-center pr-6">
					<a
						className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
						href="/"
					>
						{user?.fullName}
					</a>
					<span className="mx-2">·</span>
					<span className="line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
						{formattedDate}
					</span>
				</div>
				<span className="mb-3 mt-2 block text-neutral-700 dark:text-neutral-300 sm:mb-4 sm:mt-3">
					{comment?.content}
				</span>
				<div>
					{isParent && ( // Show reply button only for parent comments
						<button
							className="inline-flex h-8 min-w-[68px] items-center rounded-full bg-neutral-100 px-3 text-neutral-6000 hover:bg-teal-50 hover:text-teal-600 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-teal-500"
							title="Reply"
							onClick={handleReplyClick}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2 h-[18px] w-[18px]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
								></path>
							</svg>
							<span className="text-xs leading-none text-neutral-900 dark:text-neutral-200">
								Reply
							</span>
						</button>
					)}
				</div>

				{/* Reply input box is shown only for parent comments when "Reply" is clicked */}
				{isReplying && isParent && (
					<div className="mt-3">
						<Textarea
							value={reply}
							onChange={(e) => setReply(e.target.value)}
							placeholder="Write a reply..."
						/>
						<div className="mt-2 space-x-3">
							<button
								onClick={createReply}
								className="font-medium text-primary-6000"
							>
								Submit
							</button>
							<button
								className="font-medium text-neutral-500"
								onClick={() => setIsReplying(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Comment
