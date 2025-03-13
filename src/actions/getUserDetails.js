import axios from 'axios'
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || ''

async function getUserDetails() {
	const response = await axios.get(`${BACKEND_URL}/api/v1/users/me`, {
		withCredentials: true,
	})
	return response.data
}

export default getUserDetails
