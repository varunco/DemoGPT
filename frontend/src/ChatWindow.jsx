import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { SyncLoader } from "react-spinners";
import { authFetch } from "./utils/api";
import { API_URL } from "./config";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const name = localStorage.getItem("name") || "User";

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await authFetch(`${API_URL}/api/chat`, {
        method: "POST",
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId,
        }),
      });

      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("email");

  window.location.reload();
};

  const isEmpty = !prevChats || prevChats.length === 0;

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>✨ DemoGPT</span>

        <div
          className="userIconDiv"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="userIcon">{initials}</div>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem" onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            &nbsp; Log out
          </div>
        </div>
      )}

      {isEmpty && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "18px",
            pointerEvents: "none",
          }}
        >
          {!loading && (
            <>
              <h1
                style={{
                  color: "#fff",
                  fontSize: "54px",
                  fontWeight: 700,
                }}
              >
                ✨ DemoGPT
              </h1>

              <p
                style={{
                  color: "#9ca3af",
                  fontSize: "18px",
                }}
              >
                How can I help you today?
              </p>
            </>
          )}

          {loading && <SyncLoader color="#4f9cff" />}
        </div>
      )}

      <Chat />

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Message DemoGPT..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;