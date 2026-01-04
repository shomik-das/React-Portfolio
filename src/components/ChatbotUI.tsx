/* eslint-disable react-hooks/exhaustive-deps */
import { useAppSettings } from "../context/AppSettingsContext";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getGeminiResponse } from "../lib/geminiHandler";
import { formatMarkdownMessage } from "../utils/formatBotMessage";
import { TypingDots } from "./TypingDots";
import { useScrollLock } from "../hooks/useScrollLock";

const ChatBotUI = () => {
    const { theme } = useAppSettings(); // theme settings use krne ke liye.
    const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([]); // messages jo user bot se baat krega.
    const [input, setInput] = useState(""); // input set krne ke liye.
    const [loading, setLoading] = useState(false); // for loading animation ke liye.
    const [isOpen, setIsOpen] = useState(false); // yeh check krega ki bot box open hai ya nahi.
    const [hasUserSentMessage, setHasUserSentMessage] = useState(false); // yeh check krega ki user ne message sent kiya ya nahi.
    const [showIntro, setShowIntro] = useState(true); // iske help se hum show kr rhe h meet robohan on front page initial load.
    const messagesEndRef = useRef<HTMLDivElement>(null); // yeh message animation ke liye hai.

    const botName = "Robohan";
    const initialBotMessage = `Hi, I'm ${botName} 👋. I can guide you through everything about Rohan — his projects, skills, and journey.`;

    // quick message ke liye kuch prebuild question

    // scroll lock ke liye.
    useScrollLock(isOpen)

    const quickMessages = [
        "Who is Rohan Kumar Mahto?",
        "Show me Rohan's projects",
        "What tech stack does Rohan use?",
        "Tell me about the BotForge AI project"
    ];

    // initail message set kiya hai yaha pe

    useEffect(() => {
        setMessages([
            { text: "This is a temporary chat session. Once you close or reload the tab, all messages will be lost.", from: "bot" },
            { text: initialBotMessage, from: "bot" }
        ]);
        const timer = setTimeout(() => setShowIntro(false), 3000);
        return () => clearTimeout(timer);
    }, []);


    // jb mera overlay open hoga toh yeh code mere body ke scroll ko rokega

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    // yeh line scroll animation ke liye hai 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // iske help se hum message send kr rhe hai toh animated way me show ho raha hai.
    }, [messages]);

    //yaha pe actual messages set ho rhe hai

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userText = input.trim();
        setMessages((prev) => [...prev, { text: userText, from: "user" }]);
        setInput("");
        setLoading(true);
        setHasUserSentMessage(true);

        try {
            const botResponse = await getGeminiResponse(userText); // yaha pe await ka use iss liye kiya hai kyuki yeh function ek promise return krta hai.
            setMessages((prev) => [...prev, { text: botResponse ?? "", from: "bot" }]);
        } catch (error) {
            console.error("Error generating Gemini response:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Oops! Something went wrong while processing your message.",
                    from: "bot"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // handle quick message ka logic hai 

    const handleQuickMessage = (msg: string) => {
        setInput(msg);
        setHasUserSentMessage(true);
        sendMessage();
    };

    return (
        <>
            {/* Intro Message */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key={"showIntro"}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        className="fixed bottom-[1.9rem] right-23 z-10 text-100 text-sm px-4 py-2 rounded-lg bg-blur-lg"
                        style={{
                            border: `1px solid ${theme + "80"}`,
                            background: `linear-gradient(135deg, ${theme + "20"}, ${theme + "30"})`
                        }}
                    >
                        🤖 Meet Robohan
                    </motion.div>
                )}

                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-5 right-5 z-40 p-3 rounded-full border-2 shadow-2xl backdrop-blur-sm cursor-pointer"
                        style={{ background: `linear-gradient(135deg, ${theme}20, ${theme}40)`, borderColor: theme }}
                    >
                        <Bot size={32} style={{ color: theme }} />
                        <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                            style={{ backgroundColor: theme }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-sm z-50"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            className="fixed sm:h-[40rem] h-[93vh] sm:w-[30rem] w-[100vw] sm:bottom-5 bottom-0 sm:right-5 right-0 z-50 flex flex-col border-2 sm:rounded-xl overflow-hidden shadow-2xl"
                            style={{ background: `linear-gradient(135deg, #1a1a1a, #2d2d2d)`, borderColor: theme + "50" }}
                        >
                            {/* Header */}
                            <motion.div
                                className="p-4 border-b flex items-start justify-between relative"
                                style={{ background: `linear-gradient(135deg, ${theme}10, ${theme}05)`, borderBottomColor: `${theme}30` }}
                            >
                                <div className="flex gap-3 z-10">
                                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                                        <Bot size={40} style={{ color: theme }} />
                                    </motion.div>
                                    <div>
                                        <h2 className="text-lg font-bold text-100">{botName}</h2>
                                        <p className="text-xs text-green-500 flex items-center gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            Online
                                        </p>
                                        <p className="sm:text-sm text-[.8rem] text-400 mt-1">Ask me anything about Rohan's portfolio</p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="text-400 hover:bg-white/10 p-1 rounded-full z-10 cursor-pointer"
                                >
                                    <X size={20} />
                                </motion.button>
                            </motion.div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-2 text-sm space-y-3 bg-gradient-to-b from-neutral-900 to-neutral-800">
                                <AnimatePresence>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`max-w-[80%] w-fit px-4 py-3 rounded-2xl shadow-md ${msg.from === "user" ? "ml-auto text-left" : "mr-auto text-left"
                                                }`}
                                            style={{
                                                background:
                                                    msg.from === "user"
                                                        ? `linear-gradient(135deg, ${theme}80, ${theme}60)`
                                                        : "#303030",
                                                wordWrap: "break-word",
                                                overflowWrap: "break-word"
                                            }}
                                        >
                                            {msg.from === "bot" ? formatMarkdownMessage(msg.text) : <p className="text-left">{msg.text}</p>}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {loading && <div className="flex items-center gap-2">
                                    <TypingDots />
                                </div>}
                                <div ref={messagesEndRef}></div>
                            </div>

                            {/* Quick Replies */}
                            <AnimatePresence>
                                {!hasUserSentMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="px-4 py-3 border-t"
                                        style={{ background: `linear-gradient(135deg, ${theme}05, ${theme}10)`, borderTopColor: `${theme}30` }}
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            {quickMessages.map((q, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    onClick={() => handleQuickMessage(q)}
                                                    className="text-xs px-3 py-2 rounded-lg border cursor-pointer backdrop-blur-sm"
                                                    style={{ background: `linear-gradient(135deg, ${theme}10, ${theme}20)`, borderColor: `${theme}40` }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    {q}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Input */}
                            <motion.form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage(); // yaha se hum message ai ke pass send kr rhe hai.
                                }}
                                className="flex items-center px-4 py-3 gap-3 border-t bg-800"
                                style={{ borderTopColor: `${theme}30` }}
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    className="flex-1 bg-neutral-700 rounded-full px-4 py-2 outline-none text-100 text-sm border"
                                    style={{ borderColor: `${theme}30` }}
                                />
                                <motion.button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="p-2 rounded-full border cursor-pointer"
                                    style={{ background: `linear-gradient(135deg, ${theme}60, ${theme}80)`, borderColor: theme }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send size={18} className="text-100" />
                                </motion.button>
                            </motion.form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBotUI;
