"use client";
import Image from "next/image";
import { useState } from "react";
import { ImMagicWand } from "react-icons/im";

export default function Home() {
  const [data, setData] = useState({
    prompt: "",
    negative_prompt: "",
    seed: -1,
    steps: 30,
    width: 512,
    height: 512,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    await fetch("https://pleasant-introduce-fonts-kings.trycloudflare.com//sdapi/v1/txt2img", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <main className="bg-[#0a0b0f] w-full h-[100vh]">
      <div className="w-6/12 h-full mx-auto flex flex-col items-center justify-center gap-4">
        <div className="bg-[#18171c] p-4 w-full rounded-xl flex flex-col flex-start gap-4">
          <textarea
            className="bg-transparent border-b border-[#a7a7a7] h-[50px] outline-none"
            type="text"
            placeholder="Your Prompt..."
          />
          <textarea
            className="bg-transparent border-b border-[#a7a7a7] h-[50px] outline-none"
            type="text"
            placeholder="Your Negative Prompt..."
          />
          <div className="flex flex-col items-start">
            <label>Width/Height</label>
            <select className="bg-transparent border-b border-[#a7a7a7]">
              <option className="bg-[#000]">512</option>
              <option className="bg-[#000]">1024</option>
            </select>
          </div>
        </div>

        <div className="bg-[#18171c] p-4 w-full rounded-xl">
          <button
            className="bg-[#2375fc] text-white flex items-center gap-2 justify-center p-4 rounded-xl text-lg"
            onClick={handleSubmit}
          >
            Generate <ImMagicWand />
          </button>
        </div>

        <div className="bg-[#18171c] p-4 w-full rounded-xl flex items-center justify-center">
          <img className="rounded-xl" src="empty.jpg" />
        </div>
      </div>
    </main>
  );
}
