"use client";
import { useState } from "react";
import { ImMagicWand } from "react-icons/im";
import axios from "axios";
import Loading from "@/components/Loading";

export default function Home() {
  const [activeButton, setActiveButton] = useState("512");
  const [loading, setLoading] = useState(false);
  const [flagFocus, setFlagFocus] = useState(""); // [true, false, true, ...
  const [data, setData] = useState({
    prompt: "",
    negative_prompt: "",
    seed: -1,
    steps: 30,
    width: 512,
    height: 512,
  });
  const [images, setImages] = useState(""); // [image1, image2, image3, ...

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width") {
      setData({
        ...data,
        width: parseInt(value),
        height: parseInt(value),
      });
      return;
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("https://test.aia.tools/api/image-generator", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const { data } = await res.json();
      console.log(res);
      setLoading(false);
      setImages(data[0]);
    });
  };

  const handleOpenImage = () => {
    window.open(`data:image/png;base64,${images}`, "_blank");
  };

  return (
    <main className="bg-[#0a0b0f] w-full min-h-[100vh] flex flex-col items-center justify-start py-4">
      <div className="w-full lg:w-6/12 h-full mx-auto flex flex-col items-center justify-center gap-4">
        <div className=""></div>
        <div className="bg-[#18171c] p-4 w-full rounded-xl flex flex-col flex-start gap-4">
          <div className="relative w-full flex flex-col items-start">
            <label
              className={`text-[#a7a7a7] translate-y-4transition-all duration-300 ${
                flagFocus === "prompt-focus" && "-0ranslate-y-2 !text-[#2375fc] text-sm"
              }`}
            >
              Your Prompt...
            </label>

            <textarea
              onFocus={() => setFlagFocus("prompt-focus")}
              onBlur={() => !data.prompt && setFlagFocus("")}
              name="prompt"
              onChange={handleChange}
              className="text-white bg-transparent border-b border-[#a7a7a7] outline-none w-full"
              type="text"
              maxLength="500"
            />
          </div>
          <div className="relative w-full flex flex-col items-start">
            <label
              className={`text-[#a7a7a7]  transition-all duration-300 ${
                flagFocus === "prompt-neg-focus" && "-translate-y-0 !text-[#2375fc] text-sm"
              }`}
            >
              Your Negative Prompt...
            </label>

            <textarea
              onFocus={() => setFlagFocus("prompt-neg-focus")}
              onBlur={() => !data.negative_prompt && setFlagFocus("")}
              name="negative_prompt"
              onChange={handleChange}
              className="text-white bg-transparent border-b border-[#a7a7a7] outline-none w-full"
              type="text"
              maxLength="250"
            />
          </div>
        </div>

        <div className="bg-[#18171c] p-4 w-full rounded-xl flex items-center justify-between">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4">
              <button
                className={`border border-[#a7a7a7] w-full px-4 py-2 rounded-xl transition-colors duration-300 text-white ${
                  activeButton === "512" && "shadow-md shadow-[#2375fc] !border-[#2375fc]"
                }`}
                onClick={() => {
                  setData((prev) => ({ ...prev, width: 512, height: 512 }));
                  setActiveButton("512");
                }}
              >
                512
              </button>
              <button
                className={`border border-[#a7a7a7] w-full px-4 py-2 rounded-xl transition-colors duration-300 text-white ${
                  activeButton === "1024" && "shadow-md shadow-[#2375fc] !border-[#2375fc]"
                }`}
                onClick={() => {
                  setData((prev) => ({ ...prev, width: 1024, height: 1024 }));
                  setActiveButton("1024");
                }}
              >
                1024
              </button>
            </div>
          </div>

          <button
            className="bg-[#2375fc] text-white flex items-center gap-2 justify-center p-4 h-[62px] rounded-xl text-lg"
            onClick={() => handleSubmit()}
            disabled={!data.prompt || !data.width || !data.height || loading}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                Generate <ImMagicWand />
              </>
            )}
          </button>
        </div>
        <div className="bg-[#18171c] p-4 w-full rounded-xl flex items-center justify-center h-full">
          {images ? (
            <div className="w-full h-full" onClick={handleOpenImage}>
              <a href={images} target="_blank">
                <img src={images} className="w-full h-full object-cover" />
              </a>
            </div>
          ) : (
            <div className="min-h-[50vh] flex items-center justify-center">
              <img src={"logo.png"} className="w-full h-full" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
