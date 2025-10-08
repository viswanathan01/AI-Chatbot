import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://ai-chatbot-1pc7.onrender.com/chat",
      { message }
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
