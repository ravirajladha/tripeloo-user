import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook"; // ✅ Fetch user from Redux store
import { fetchAllStays } from "@/actions/getAllStays"; // ✅ Fetch stays from backend
import { createPost } from "@/actions/postActions"; // ✅ API call for creating posts
import ButtonPrimary from "@/shared/ButtonPrimary";
import avatar1 from "@/images/avatars/Image-2.png";


interface Stay {
	_id: string;
	title: string;

  }

  
const CreatePost = ({ setRefreshTrigger }: any) => {
  const user = useAppSelector((state) => state.auth.user); // ✅ Get user details
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [stayId, setStayId] = useState(""); // ✅ Store selected Stay ID
  const [stays, setStays] = useState<Stay[]>([]); // ✅ Explicitly define stays type
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all stays from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const staysData = await fetchAllStays();
        setStays(staysData);
      } catch (error) {
        console.error("Error fetching stays:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Handle image file selection
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setMediaFiles((prev) => [...prev, ...fileArray]);

      // ✅ Preview selected images
      const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...imagePreviews]);
    }
  };

  // ✅ Handle text input
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    setMsg("");
  };

  // ✅ Handle post submission
  const handlePostSubmit = async () => {
    if (!description.trim()) {
      setMsg("Please add a description!");
      return;
    }

    setLoading(true);
    try {
      await createPost({ description, mediaFiles, stayId }); // ✅ Call API action
      setDescription("");
      setMediaFiles([]);
      setPreviewImages([]);
      setStayId("");
      setMsg("Post created successfully!");
      setRefreshTrigger((prev: number) => prev + 1); // ✅ Refresh posts
    } catch (error) {
      setMsg("Error creating post.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mb-8 max-w-4xl rounded-lg bg-white p-4 shadow-md">
      {/* ✅ User Info */}
      <div className="mb-4 flex items-center">
        <Image src={avatar1} alt="User" width={40} height={40} className="rounded-full" />
        <div className="pl-2 font-semibold">{user ? user.fullName : "Please Log In..."}</div>
      </div>

      {/* ✅ Post Description */}
      <textarea
        className="h-40 w-full resize-none rounded-lg border border-gray-300 p-4 text-lg outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="What's on your mind?"
        value={description}
        onChange={handleTextChange}
      />

      {/* ✅ Display Image Previews */}
      <div className="mt-3 flex flex-wrap gap-2">
        {previewImages.map((src, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image src={src} alt="Preview" layout="fill" className="rounded-lg object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-4">
        {/* ✅ Upload Images */}
        <label htmlFor="media-upload" className="cursor-pointer text-blue-500">
          📷 Upload Images
        </label>
        <input type="file" id="media-upload" className="hidden" accept="image/*" multiple onChange={handleMediaChange} />

        {/* ✅ Dropdown for Stay Selection */}
        <select
          className="border p-2 rounded-lg"
          value={stayId}
          onChange={(e) => setStayId(e.target.value)}
        >
          <option value="">Tag a Stay (Optional)</option>
          {stays.map((stay) => (
            <option key={stay._id} value={stay._id}>
              {stay.title}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Post Button */}
      <div className="mt-4">
        <ButtonPrimary className="w-full py-3" onClick={handlePostSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </ButtonPrimary>
        {msg && <p className="p-3 text-center text-green-500">{msg}</p>}
      </div>
    </div>
  );
};

export default CreatePost;
