'use server'
import { cookies } from 'next/headers'

async function checkAuth() {
	const sessionCookie = cookies().get('accessToken')

	if (!sessionCookie) {
		return {
			isAuthenticated: false,
		}
	}

	try {
		// verify if the access token exists and is valid
		if (sessionCookie.value) {
			return {
				isAuthenticated: true,
			}
		}
		return {
			isAuthenticated: false,
		}
	} catch (error) {
		return {
			isAuthenticated: false,
		}
	}
}

export default checkAuth
