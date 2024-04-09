import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  console.log(body);
  try {
    let image = "";
    await fetch("https://welcome-unlikely-minnow.ngrok-free.app/sdapi/v1/txt2img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${body.prompt.replace(/nude|nudity/gi, "").trim()}`,
        negative_prompt: `${body.negative_prompt}`,
        steps: 30,
        width: body.width,
        height: body.height,
      }),
    }).then(async (res) => {
      const { images } = await res.json();
      console.log(images);
      image = images;
    });
    return NextResponse.json({ image: image[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
  }
}
