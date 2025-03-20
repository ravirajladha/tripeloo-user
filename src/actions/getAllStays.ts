import axiosInstance from '@/utils/axios' // ✅ Use axiosInstance instead of plain axios

// export const fetchAllStays = async (filterParams: any) => {
// 	try {
// 		if (typeof window === 'undefined') return [] // ✅ Prevents execution on the server
// 		console.log(filterParams, 'inside the fetchallstays function')
// 		const token = localStorage.getItem('accessToken') // ✅ Get token inside the function
// 		const response = await axiosInstance.get('/api/v1/stay/allStays', {
// 			headers: { Authorization: `Bearer ${token}` },
// 			withCredentials: true,
// 			params: filterParams,
// 		})

// 		return response.data.stays // ✅ Return stays array
// 	} catch (error: any) {
// 		console.error(
// 			'Error fetching stays:',
// 			error.response?.data || error.message || error,
// 		)
// 		throw error.response?.data || error.message
// 	}
// }

// import axiosInstance from '@/utils/axios'; // ✅ Use axiosInstance instead of plain axios

export const fetchAllStays = async (filterParams: any) => {
  try {
    if (typeof window === 'undefined') return []; // ✅ Prevents execution on the server

    // Convert arrays to comma-separated strings for query parameters
    const modifiedParams = {
      ...filterParams,
      stayTypes: filterParams.stayTypes ? filterParams.stayTypes.join(',') : undefined,
      priceRange: filterParams.priceRange ? filterParams.priceRange.join(',') : undefined,
      amenities: filterParams.amenities ? filterParams.amenities.join(',') : undefined,
    };  

    const token = localStorage.getItem('accessToken'); // ✅ Get token inside the function
    const response = await axiosInstance.get('/api/v1/stay/allStays', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
      params: modifiedParams, // Use the modified params here
    });

    return response.data.stays; // ✅ Return stays array
  } catch (error: any) {
    console.error('Error fetching stays:', error.response?.data || error.message || error);
    throw error.response?.data || error.message;
  }
};
