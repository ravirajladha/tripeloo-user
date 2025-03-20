'use client'

import React, { FC, useEffect, useState } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import checkAuth from '@/actions/checkAuth'

export interface PageSignUpProps {}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const loginSocials = [
	{ name: 'Continue with Facebook', href: '#', icon: facebookSvg },
	{ name: 'Continue with Twitter', href: '#', icon: twitterSvg },
	{ name: 'Continue with Google', href: '#', icon: googleSvg },
]

const PageSignUp: FC<PageSignUpProps> = () => {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)
	const [isAuthLoading, setAuthLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const verifyAuth = async () => {
			const { isAuthenticated } = await checkAuth()

			if (isAuthenticated) {
				// If user is already authenticated, redirect to home
				router.push('/')
			} else {
				setAuthLoading(false)
			}
		}
		verifyAuth()
	}, [router])

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess(false)

		try {
			const response = await axios.post(
				`${BACKEND_URL}/api/v1/users/register`,
				{
					fullName,
					username,
					email,
					password,
					type:"user"
				},
				{
					withCredentials: true,
				},
			)
			if (response.data.error) {
				setError(response.data.error)
			} else {
				setSuccess(true)
				router.push('/')
			}
		} catch (e: any) {
			setError(
				e.response?.data?.message || 'Something went wrong. Please try again.',
			)
		}
	}

	// Show a loading state while checking authentication
	if (isAuthLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
			</div>
		)
	}

	return (
		<div className={`nc-PageSignUp`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					Signup
				</h2>
				<div className="mx-auto max-w-md space-y-6">
					{/* <div className="grid gap-3">
						{loginSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="nc-will-change-transform flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={item.icon}
									alt={item.name}
									width={24}
									height={24}
								/>
								<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
									{item.name}
								</h3>
							</a>
						))}
					</div> */}
					{/* <div className="relative text-center">
						<span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-neutral-900 dark:text-neutral-400">
							OR
						</span>
						<div className="absolute left-0 top-1/2 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
					</div> */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSignUp}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Name
							</span>
							<Input
								type="text"
								placeholder="Your Name"
								className="mt-1"
								value={fullName}
								onChange={(e) => {
									setError('')
									setFullName(e.target.value)
								}}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								UserName
							</span>
							<Input
								type="text"
								placeholder="Your Username"
								className="mt-1"
								value={username}
								onChange={(e) => {
									setError('')
									setUsername(e.target.value)
								}}
							/>
						</label>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">
								Email address
							</span>
							<Input
								type="email"
								placeholder="example@example.com"
								className="mt-1"
								value={email}
								onChange={(e) => {
									setError('')
									setEmail(e.target.value)
								}}
							/>
						</label>
						<label className="block">
							<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
								Password
							</span>
							<Input
								type="password"
								className="mt-1"
								value={password}
								placeholder="Enter Password"

								onChange={(e) => {
									setError('')
									setPassword(e.target.value)
								}}
							/>
						</label>
						<label className="block">
							<span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
								Confirm Password
							</span>
							<Input
								type="password"
								className="mt-1"
								value={confirmPassword}
								placeholder="Enter Confirm Password"

								onChange={(e) => {
									setError('')
									setConfirmPassword(e.target.value)
								}}
							/>
						</label>
						{error && <p className="text-red-500">{error}</p>}
						{success && (
							<p className="text-green-500">User registered successfully!</p>
						)}
						<ButtonPrimary type="submit">Continue</ButtonPrimary>
					</form>
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						Already have an account?{' '}
						<Link href="/login" className="font-semibold underline">
							Sign in
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageSignUp
