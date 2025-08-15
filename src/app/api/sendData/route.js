// app/api/sendData/route.js
import axios from "axios";

export async function POST(req) {
  try {
    const { text } = await req.json(); // نستقبل فقط حقل text

    if (!text || text.trim() === "") {
      return new Response(
        JSON.stringify({ success: false, error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await axios.post(
      `https://api.telegram.org/bot8203421351:AAHL_hPYA0LQHiz-5YPyJEX_Bo0mSuOc4hk/sendMessage?chat_id=-1002746960519&text=${encodeURIComponent(
        text
      )}`
    );

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
