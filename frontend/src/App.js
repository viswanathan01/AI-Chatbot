import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const res = await axios.post("http://localhost:5000/api/chat", { message: input });
    setMessages([...messages, { user: input, ai: res.data.reply }]);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2f3 0%, #dfe9f3 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ color: "#222", marginBottom: "30px", fontWeight: 700, fontSize: "2rem" }}>
        💬 AI Chatbot
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            maxHeight: "70vh",
            scrollBehavior: "smooth",
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    backgroundColor: "#e8f0fe",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    maxWidth: "85%",
                    fontSize: "0.95rem",
                    marginBottom: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}
                >
                  <b style={{ color: "#1a73e8" }}>You:</b> {msg.user}
                </div>

                <div
                  style={{
                    backgroundColor: "#f4f9f1",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    maxWidth: "85%",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    overflowX: "auto",
                  }}
                >
                  <ReactMarkdown
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      pre: ({ node, ...props }) => (
                        <pre
                          style={{
                            background: "#f5f5f5",
                            borderRadius: "8px",
                            padding: "12px",
                            overflowX: "auto",
                          }}
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }) => (
                        <code
                          style={{
                            background: inline ? "#f0f0f0" : "none",
                            padding: inline ? "2px 5px" : "0",
                            borderRadius: inline ? "4px" : "0",
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                          }}
                          {...props}
                        />
                      ),
                    }}
                  >
                    {msg.ai}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                fontStyle: "italic",
                marginTop: "100px",
              }}
            >
              No messages yet. Start the conversation!
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #e0e0e0",
            padding: "16px",
            backgroundColor: "#fafafa",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              marginRight: "8px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "12px 24px",
              border: "none",
              backgroundColor: "#1a73e8",
              color: "#fff",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1669c1")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1a73e8")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
