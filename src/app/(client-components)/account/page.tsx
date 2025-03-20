'use client'

import React, { FC, useEffect, useState } from 'react'
import Label from '@/components/Label'
import Avatar from '@/shared/Avatar'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Textarea from '@/shared/Textarea'
import axios from 'axios'
import getUserDetails from '@/actions/getUserDetails'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";

export interface AccountPageProps {}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

const AccountPage: FC<AccountPageProps> = () => {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [dateofBirth, setDateofBirth] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [aboutYou, setAboutYou] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isAuthLoading, setAuthLoading] = useState(true)
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) {
        router.push('/login')
        return
      }

      // Fetch user details only if authenticated
      const response = await getUserDetails()
      setFullName(response.user?.fullName || '')
      setUsername(response.user?.username || '')
      setGender(response.user?.gender || '')
      setEmail(response.user?.email || '')
      const date = response.user?.dateofBirth
        ? new Date(response.user.dateofBirth).toISOString().split('T')[0]
        : ''
      setDateofBirth(date)
      setAddress(response.user?.address || '')
      setPhoneNumber(response.user?.phoneNumber || '')
      setAboutYou(response.user?.aboutYou || '')
      setAuthLoading(false)
    }

    fetchUserDetails()
  }, [router])

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('')
        setSuccess(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [error, success])

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/users/updateUserDetails`,
        {
          fullName,
          username,
          gender,
          email,
          dateofBirth: new Date(dateofBirth).toISOString(),
          address,
          phoneNumber,
          aboutYou,
        },
        { withCredentials: true },
      )
      setSuccess(true)
      setError('')
    } catch (error: any) {
      setSuccess(false)
      setError(error.response.data)
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
    <div className="nc-PageAccount px-4 max-w-4xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <h2 className="text-3xl font-semibold">Account Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden">
          <Avatar sizeClass="w-32 h-32" imgUrl={user?.profileImage?.url || "/default-avatar.png"} />
          <div className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black bg-opacity-60 text-neutral-50">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label>Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <Label>Gender</Label>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div>
            <Label>Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input type="date" value={dateofBirth} onChange={(e) => setDateofBirth(e.target.value)} />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <Label>About You</Label>
            <Textarea value={aboutYou} onChange={(e) => setAboutYou(e.target.value)} />
          </div>

          <ButtonPrimary onClick={handleUpdate}>Update Info</ButtonPrimary>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">User Data Updated successfully!</p>}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
