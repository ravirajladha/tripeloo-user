'use client'
import React, { FC, useState, useEffect } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import checkAuth from '@/actions/checkAuth'
import axiosInstance from '@/utils/axios'
// "use client";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/authSlice";
// import { setUser } from "@/store/authSlice";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const PageLogin: FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState(false);
	const [isAuthLoading, setAuthLoading] = useState(true);
	const router = useRouter();
	const dispatch = useDispatch(); // ✅ Use Redux Dispatch

	useEffect(() => {
		const verifyAuth = async () => {
			const { isAuthenticated } = await checkAuth();

			if (isAuthenticated) {
				router.push("/");
				console.log(isAuthLoading, "isauthloadin", isAuthenticated, "isauthenticated");
			} else {
				setAuthLoading(false);
			}
		};

		verifyAuth();
	}, [router,isAuthLoading]);


	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
				{
					email,
					password,
					type: "user", // ✅ Explicitly set type to "user"
				},
				{ withCredentials: true }
			);

			if (response.data.success) {
				setSuccess(true);
				console.log(response, "all data");
				console.log(response.data.user, "passed data");

				dispatch(setUser(response.data.user));
				
				localStorage.setItem('accessToken', response.data.accessToken);
				localStorage.setItem('refreshToken', response.data.refreshToken);
				// ✅ Store user in Redux
				router.push("/");
			}
		} catch (err: any) {
			setError(err.response?.data?.error || "Invalid email or password");
		}
	};

	if (isAuthLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
			</div>
		);
	}

	return (
		<div className={`nc-PageLogin`}>
			<div className="container mb-24 lg:mb-32">
				<h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
					Login
				</h2>

				<div className="mx-auto max-w-md space-y-6">
					{/* <div className="grid gap-3">
						{loginSocials.map((item, index) => (
							<a
								key={index}
								href={item.href}
								className="flex w-full transform rounded-lg bg-primary-50 px-4 py-3 transition-transform hover:translate-y-[-2px] dark:bg-neutral-800 sm:px-6"
							>
								<Image
									className="flex-shrink-0"
									src={item.icon}
									alt={item.name}
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
					<form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
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
							{/* <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
								Password
								<Link href="/login" className="text-sm font-medium underline">
									Forgot password?
								</Link>
							</span> */}
							<Input
								type="password"
								className="mt-1"
								value={password}
								onChange={(e) => {
									setError('')
									setPassword(e.target.value)
								}}
							/>
						</label>
						{error && <p className="text-red-500">{error}</p>}
						{success && (
							<p className="text-green-500">User Login Successfully!</p>
						)}
						<ButtonPrimary type="submit">Continue</ButtonPrimary>
					</form>
					<span className="block text-center text-neutral-700 dark:text-neutral-300">
						New user?{' '}
						<Link href="/signup" className="font-semibold underline">
							Create an account
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default PageLogin
