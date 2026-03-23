import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { SyncLoader } from "react-spinners";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getReply = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
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

    const handleProfileClick = () => {
        setIsOpen(prev => !prev);
    };

    const isEmpty = !prevChats || prevChats.length === 0;

    return (
        <div className="chatWindow">

            {/* NAVBAR */}
            <div className="navbar">
                <span>
                    DemoGPT <i className="fa-solid fa-chevron-down"></i>
                </span>

                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>

            {/* DROPDOWN */}
            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem">
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}

            {/* CENTER STATE */}
            {isEmpty && (
                <div
                    style={{
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
                        textAlign: "center",
                        pointerEvents: "none" // ✅ FIX: allow clicks through
                    }}
                >
                    {!loading && (
                        <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: "600" }}>
                            Start a New Chat!
                        </h1>
                    )}

                    {loading && (
                        <>
                            <h1 style={{ color: "#fff", fontSize: "42px", fontWeight: "600" }}>
                                Start a New Chat!
                            </h1>
                            <SyncLoader color="#ffffff" />
                        </>
                    )}
                </div>
            )}

            {/* CHAT */}
            <Chat />

            {/* INPUT */}
            <div className="chatInput">
                <div className="inputBox">
                    <input
                        placeholder="Ask anything"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") getReply();
                        }}
                    />

                    <div id="submit" onClick={getReply}>
                        <i className="fa-solid fa-paper-plane"></i>
                    </div>
                </div>

                <p className="info">
                    DemoGPT can make mistakes. Check important info.
                </p>
            </div>

        </div>
    );
}

export default ChatWindow;