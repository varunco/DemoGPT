import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { SyncLoader } from "react-spinners";
import { authFetch } from "./utils/api";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getReply = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const response = await authFetch("http://localhost:8080/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    message: prompt,
                    threadId: currThreadId
                })
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
            setPrevChats(prev => ([
                ...prev,
                { role: "user", content: prompt },
                { role: "assistant", content: reply }
            ]));
        }

        setPrompt("");
    }, [reply]);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const isEmpty = !prevChats || prevChats.length === 0;

    return (
        <div className="chatWindow">

            <div className="navbar">
                <span>DemoGPT</span>

                <div className="userIconDiv" onClick={() => setIsOpen(prev => !prev)}>
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>

            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem" onClick={logout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}

            {isEmpty && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "16px",
                    pointerEvents: "none"
                }}>
                    {!loading && <h1 style={{ color: "#fff", fontSize: "42px" }}>Start a New Chat!</h1>}
                    {loading && <SyncLoader color="#fff" />}
                </div>
            )}

            <Chat />

            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder="Ask anything"
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