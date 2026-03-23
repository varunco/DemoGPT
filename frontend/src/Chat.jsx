import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    // typing effect
    useEffect(() => {
        if (!reply) {
            setLatestReply(null);
            return;
        }

        const words = reply.split(" ");
        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(words.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= words.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [reply]);

    return (
        <>
            
            {/* CHAT AREA */}
            <div className="chats">
                {prevChats?.map((chat, idx) => {
                    if (!chat.content) return null;

                    const isLast = idx === prevChats.length - 1;
                    const isUser = chat.role === "user";

                    return (
                        <div
                            key={idx}
                            className={isUser ? "userDiv" : "gptDiv"}
                        >
                            {isUser ? (
                                <p className="userMessage">
                                    {chat.content}
                                </p>
                            ) : (
                                <div className="gptMessage">
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                        {isLast
                                            ? (latestReply ?? chat.content)
                                            : chat.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Chat;