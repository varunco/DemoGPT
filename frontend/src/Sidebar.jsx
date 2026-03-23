import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const [open, setOpen] = useState(true);

    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats,
        prevChats
    } = useContext(MyContext);

    // FETCH THREADS
    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();

            const backendThreads = res.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));

            setAllThreads(prev => {
                const localOnly = prev.filter(
                    local => !backendThreads.some(b => b.threadId === local.threadId)
                );

                return [...localOnly, ...backendThreads];
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    // CREATE NEW CHAT
    const createNewChat = () => {
        const newId = uuidv1();

        setCurrThreadId(newId);
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setPrevChats([]);

        setAllThreads(prev => [
            {
                threadId: newId,
                title: "New Chat"
            },
            ...prev
        ]);
    };

    // CHANGE THREAD
    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();

            setPrevChats(res.messages || []);
            setNewChat(false);
            setReply(null);

        } catch (err) {
            console.log(err);
        }
    };

    // DELETE THREAD
    const deleteThread = async (threadId) => {
        try {
            await fetch(`http://localhost:8080/api/thread/${threadId}`, {
                method: "DELETE"
            });

            setAllThreads(prev =>
                prev.filter(thread => thread.threadId !== threadId)
            );

            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    };

    // UPDATE TITLE AFTER FIRST MESSAGE
    useEffect(() => {
        if (!currThreadId) return;
        if (!prevChats || prevChats.length === 0) return;

        const firstUserMessage = prevChats.find(m => m.role === "user");
        if (!firstUserMessage) return;

        setAllThreads(prev =>
            prev.map(thread =>
                thread.threadId === currThreadId
                    ? {
                          ...thread,
                          title: firstUserMessage.content.slice(0, 25)
                      }
                    : thread
            )
        );
    }, [prevChats, currThreadId]);

    return (
        <section className={`sidebar ${open ? "" : "collapsed"}`}>

            {/* TOP */}
            <div className="top">
                <img
                    src="src/assets/logosq.png"
                    className="logo"
                />

                <button className="toggle-btn" onClick={() => setOpen(!open)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* NEW CHAT */}
            {open && (
                <div className="logo-row" onClick={createNewChat}>
                    <i className="fa-regular fa-pen-to-square new-chat"></i>
                    <h4>New Chat</h4>
                </div>
            )}

            {/* CHAT LIST */}
            <div className="chats-section">

                {open && <p className="section-title">Your chats</p>}

                {open && (
                    <ul className="history">
                        {allThreads?.map((thread) => (
                            <li
                                key={thread.threadId}
                                onClick={() => changeThread(thread.threadId)}
                                className={
                                    thread.threadId === currThreadId ? "active" : ""
                                }
                            >
                                {thread.title}

                                <i
                                    className="fa-solid fa-trash"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteThread(thread.threadId);
                                    }}
                                ></i>
                            </li>
                        ))}
                    </ul>
                )}

            </div>

            {/* BOTTOM */}
            <div className="sign">
                <div className="avatar">VJ</div>
                {open && <span>Varun Juneja</span>}
            </div>

        </section>
    );
}

export default Sidebar;