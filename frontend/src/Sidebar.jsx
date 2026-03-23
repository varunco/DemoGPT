import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import { authFetch } from "./utils/api";

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

    const getAllThreads = async () => {
        try {
            const response = await authFetch("http://localhost:8080/api/thread");
            const res = await response.json();

            setAllThreads(res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);

    const createNewChat = () => {
        const newId = uuidv1();
        setCurrThreadId(newId);
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setPrevChats([]);
    };

    const changeThread = async (newThreadId) => {
        try {
            const response = await authFetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();

            setPrevChats(res.messages || []);
            setCurrThreadId(newThreadId);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThread = async (threadId) => {
        await authFetch(`http://localhost:8080/api/thread/${threadId}`, {
            method: "DELETE"
        });

        setAllThreads(prev => prev.filter(t => t.threadId !== threadId));
    };

    return (
        <section className={`sidebar ${open ? "" : "collapsed"}`}>

            <div className="top">
                <img src="src/assets/logosq.png" className="logo" />
                <button className="toggle-btn" onClick={() => setOpen(!open)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {open && (
                <div className="logo-row" onClick={createNewChat}>
                    <i className="fa-regular fa-pen-to-square new-chat"></i>
                    <h4>New Chat</h4>
                </div>
            )}

            <div className="chats-section">
                {open && <p className="section-title">Your chats</p>}

                {open && (
                    <ul className="history">
                        {allThreads?.map(thread => (
                            <li
                                key={thread.threadId}
                                onClick={() => changeThread(thread.threadId)}
                                className={thread.threadId === currThreadId ? "active" : ""}
                            >
                                <span>{thread.title}</span>

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

            <div className="sign">
                <div className="avatar">VJ</div>
                {open && <span>Varun Juneja</span>}
            </div>

        </section>
    );
}

export default Sidebar;