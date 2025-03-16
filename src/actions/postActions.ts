import axiosInstance from "@/utils/axios";

export const createPost = async ({ description, mediaFiles, stayId }: { description: string; mediaFiles: File[]; stayId?: string }) => {
  try {
    if (typeof window === "undefined") return; // ✅ Prevent execution on server

    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    // ✅ Prepare FormData for Image Uploads
    const formData = new FormData();
    formData.append("description", description);
    if (stayId) formData.append("stay_id", stayId);
    mediaFiles.forEach((file) => formData.append("images", file));

    // ✅ API Request to Create Post
    const response = await axiosInstance.post("/api/v1/users/post/create", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    return response.data; // ✅ Return created post data
  } catch (error: any) {
    console.error("❌ Error creating post:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


// ✅ Fetch all posts
export const fetchAllPosts = async () => {
  try {
    if (typeof window === "undefined") return []; // ✅ Prevent execution on server

    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function
    const response = await axiosInstance.get("/api/v1/users/post/all", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data.posts; // ✅ Return posts array
  } catch (error: any) {
    console.error("❌ Error fetching posts:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// ✅ Add a comment to a post
export const addComment = async ({ postId, commentText }: { postId: string; commentText: string }) => {
  try {
    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    const response = await axiosInstance.post(
      "/api/v1/users/post/createComment",
      { content: commentText, postId },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    return response.data.comment; // ✅ Return the newly added comment
  } catch (error: any) {
    console.error("❌ Error adding comment:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// ✅ Like a post
export const likePost = async (postId: string) => {
  try {
    const token = localStorage.getItem("accessToken"); // ✅ Get token inside function

    const response = await axiosInstance.post(
      "/api/v1/users/post/like",
      { postId },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    return response.data.post.likes; // ✅ Return the updated likes array
  } catch (error: any) {
    console.error("❌ Error liking post:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
