import checkAuth from '@/actions/checkAuth'
import ButtonPrimary from '@/shared/ButtonPrimary'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface User {
	_id: string
	username: string
	email: string
	fullName: string
}

const CreatePost = ({ setRefreshTrigger }: any) => {
	const router = useRouter()
	const [postText, setPostText] = useState('')
	const [media, setMedia] = useState<string | null>(null)
	const [imgLink, setImgLink] = useState('')
	const [isAuthed, setIsAuthed] = useState(false)
	const [msg, setMsg] = useState('')
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const getUser = async () => {
			const { isAuthenticated } = await checkAuth()
			setIsAuthed(isAuthenticated)
			if (isAuthenticated) {
				const response = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
					},
				})
				setUser(response.data.user)
			}
		}
		getUser()
	}, [])

	// Handle media file selection
	const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setMedia(URL.createObjectURL(file)) // Create a URL for the media file
		}
		setMsg('')
	}

	// Handle post text change
	const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMsg('')
		setPostText(event.target.value)
	}

	const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMsg('')
		setImgLink(event.target.value)
	}

	// Handle post submission
	const handlePostSubmit = async () => {
		if (isAuthed) {
			if (postText.trim()) {
				try {
					console.log('Post submitted:', postText)
					const res = await axios.post(
						`${BACKEND_URL}/api/v1/users/post/create`,
						{
							content: postText,
							image: imgLink,
						},
						{
							withCredentials: true,
						},
					)
					if (res.status === 200 || res.status === 201) {
						setImgLink('')
						setPostText('')
						setMedia(null)
						setRefreshTrigger((prev: number) => prev + 1)
						setMsg('Post created Successfully !')
					}
				} catch (error: any) {
					console.error('Error submitting post:', error)
					setMsg(error)
				}
			} else {
				setMsg('Please add Content')
			}
		} else {
			router.push('/login')
		}
	}

	// Handle close button for media preview
	const handleCloseMediaPreview = () => {
		setMedia(null) // Clear the media preview
	}

	return (
		<div className="mx-auto mb-8 max-w-4xl rounded-lg bg-white p-4 shadow-md lg:mb-24">
			<div className="mb-4 flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="size-10"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>

				<div className="pl-2 font-semibold">
					{user ? user?.fullName : 'Guest'}
				</div>
			</div>

			<textarea
				className="h-40 w-full resize-none rounded-lg border border-gray-300 p-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="What's on your mind?"
				value={postText}
				onChange={handleTextChange}
			/>

			{media && (
				<div className="relative mt-3">
					<Image
						src={media}
						alt="Preview"
						className="max-h-200 w-full rounded-lg object-cover"
					/>
					<button
						onClick={handleCloseMediaPreview}
						className="absolute right-2 top-2 h-6 w-6 rounded-full bg-gray-700 p-1 text-sm text-white hover:bg-gray-600"
					>
						&times;
					</button>
				</div>
			)}

			<div className="mt-3 flex items-center gap-4">
				<label
					htmlFor="media-upload"
					className="flex cursor-pointer items-center gap-2 text-blue-500"
				>
					<span role="img" aria-label="camera">
						📷
					</span>{' '}
					Photo/Video
				</label>
				<input
					type="file"
					id="media-upload"
					className="hidden"
					accept="image/*,video/*"
					onChange={handleMediaChange}
				/>
				<input
					type="text"
					className="w-full rounded-full"
					onChange={handleImage}
					value={imgLink}
				/>
			</div>

			<div className="mt-4">
				<ButtonPrimary
					className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600"
					onClick={handlePostSubmit}
				>
					Post
				</ButtonPrimary>
				{msg && <p className="p-3 text-center text-green-500">{msg}</p>}
			</div>
		</div>
	)
}

export default CreatePost
