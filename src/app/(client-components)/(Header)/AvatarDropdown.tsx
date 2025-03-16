import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import Avatar from '@/shared/Avatar'
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'
import Link from 'next/link'
// import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/slice/authSlice";
import axios from 'axios'
import checkAuth from '@/actions/checkAuth'
import { useLoginModal } from "@/hooks/useLoginModal";
import { NextRouter } from "next/router";
import { AppDispatch } from "@/store/store";
// import { handleProtectedNavigation } from "@/utils/handleProtectedNavigation";
import { handleProtectedNavigation } from "@/utils/handleProtectedNavigation";


interface Props {
	className?: string
}

interface User {
	_id: string
	fullName: string
	email: string
	address?: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const AvatarDropdown: React.FC<Props> = ({ className = '' }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state: any) => state.auth); // ✅ Fetch user from Redux
	console.log("Redux State - auth:", { user, isAuthenticated });
	// const { isOpen, openModal, closeModal } = useLoginModal();

	const handleLogout = async () => {
		try {
			await axios.post(`${BACKEND_URL}/api/v1/users/logout`, {type:"user"}, { withCredentials: true });
			dispatch(clearUser()); // ✅ Clear user from Redux on logout
			router.push("/login");
		} catch (error) {
			router.push("/login");
		}
	};

	const handleLogin = async () => {
		router.push('/login')
	}

	return (
		<>
			<Popover className={`AvatarDropdown relative flex ${className}`}>
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`flex h-10 w-10 items-center justify-center self-center rounded-full text-slate-700 hover:bg-slate-100 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-800 sm:h-12 sm:w-12`}
						>
							<Avatar sizeClass="w-8 h-8 sm:w-9 sm:h-9" />
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -right-10 top-full z-10 w-screen max-w-[280px] px-4 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white px-6 py-7 dark:bg-neutral-800">
										<div className="flex items-center space-x-3">
											<Avatar sizeClass="w-12 h-12" />

											<div className="flex-grow">
												<h4 className="font-semibold">
													{user ? user?.fullName : 'Guest'}
												</h4>
												<h4 className="text-sm font-light">
													{user ? user?.email : 'Guest'}
												</h4>
												<p className="mt-0.5 text-xs">
													{user ? user.address : ''}
												</p>
											</div>
										</div>

										{/* {isAuthenticated ? ( */}
										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />


										<Link
                                href="/booking"
                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
                                onClick={(e) => {
                                    handleProtectedNavigation(e, isAuthenticated, router, "/booking", dispatch);
                                    close(); // ✅ Close the dropdown
                                }}
                            >


											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M8 12.2H15"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M8 16.2H12.38"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M10 6H14C16 6 16 5 16 4C16 2 15 2 14 2H10C9 2 8 2 8 4C8 6 9 6 10 6Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M16 4.02002C19.33 4.20002 21 5.43002 21 10V16C21 20 20 22 15 22H9C4 22 3 20 3 16V10C3 5.44002 4.67 4.20002 8 4.02002"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'My bookings'}</p>
											</div>
										</Link>

										<Link
											href={"/account"}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={(e) => handleProtectedNavigation(e, isAuthenticated, router, "/account", dispatch)}
										>

											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="size-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'My Account'}</p>
											</div>
										</Link>

										<div
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={(e) => handleProtectedNavigation(e, isAuthenticated, router, "/profile", dispatch)}

										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="size-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Profile'}</p>
											</div>
										</div>

										{/* ------------------ 2 --------------------- */}
										<Link
											href={isAuthenticated ? "/account-savelists" : "#"}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={(e) => handleProtectedNavigation(e, isAuthenticated, router, "/account-savelists", dispatch)}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<path
														d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Wishlist'}</p>
											</div>
										</Link>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
										{/* ------------------ 2 --------------------- */}
										<div className="-m-3 flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
											<div className="flex items-center">
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium">{'Dark theme'}</p>
												</div>
											</div>
											<SwitchDarkMode2 />
										</div>
										{/* ------------------ 2 --------------------- */}
										<Link
											href={'/#'}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
											onClick={() => close()}
										>
											<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M4.89999 4.92993L8.43999 8.45993"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M4.89999 19.07L8.43999 15.54"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M19.05 19.07L15.51 15.54"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M19.05 4.92993L15.51 8.45993"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium">{'Help'}</p>
											</div>
										</Link>
										{/* ------------------ 2 --------------------- */}
										{isAuthenticated ? (
											<Link
												href="#"
												className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
												onClick={(e) => {
													e.preventDefault();
													handleLogout();
													close();
												}}
											>
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													{/* Logout Icon */}
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M15 12H3.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
														<path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium">{'Log out'}</p>
												</div>
											</Link>
										) : (
											<Link
												href="#"
												className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700"
												onClick={(e) => {
													e.preventDefault();
													handleLogin();
													close();
												}}
											>
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													{/* Login Icon */}
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium">{'Log In'}</p>
												</div>
											</Link>
										)}

									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>

		</>
	)
}
export default AvatarDropdown
