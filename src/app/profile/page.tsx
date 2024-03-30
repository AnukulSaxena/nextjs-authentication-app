"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<any[]>([]);

  async function handleLogout() {
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImage(event: any) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    try {
      const response = await axios.post("/api/users/upload", formData);
      setImageData((prevImageData) => [
        ...prevImageData,
        response?.data?.image,
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    axios.get("/api/users/upload").then((res) => {
      setImageData(res?.data?.image);
    });
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full items-center bg-black h-96 flex flex-col">
        <div className="bg-gray-400 mt-10 p-10 rounded-sm">
          <h1 className="text-center text-black font-bold text-xl">
            {loading ? "Uploading...." : "Upload Image"}
          </h1>

          <form onSubmit={uploadImage}>
            <label className="block my-2 ps-2" htmlFor="image">
              Image
            </label>
            <input
              id="image"
              type="file"
              className=" cursor-pointer bg-gray-300 my-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700   hover:file:bg-violet-100 w-96 rounded-sm p-2"
              name="image"
              required
            />
            <button
              className={`block ${
                loading ? " cursor-not-allowed" : ""
              } my-2 p-2 bg-blue-600 rounded-sm`}
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
        <button
          className="block my-2 p-2 bg-blue-600 rounded-sm"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <div className="w-full gap-5 flex flex-wrap h-fit ">
        {imageData.map((item, index) => (
          <img
            className="h-40 w-40 object-cover"
            src={item?.imageUrl}
            alt="index"
          />
        ))}
      </div>
    </div>
  );
}
