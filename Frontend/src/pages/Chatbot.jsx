import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (msgText) => {
    const text = msgText || input;
    if (text.trim() === "") return;
    setMessages([...messages, { from: "user", text }]);
    setInput("");

    // simple bot replies (rule-based)
    let reply = "I'm not sure about that. Please contact support.";
    if (text.toLowerCase().includes("register")) {
      reply = "You can register by clicking on the 'Register' button in the event details.";
    } else if (text.toLowerCase().includes("cancel")) {
      reply = "Yes, you can cancel your registration from your Dashboard under 'My Events'.";
    } else if (text.toLowerCase().includes("events")) {
      reply = "Upcoming events are listed on the Home page. Check them out!";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    }, 500);
  };

  const handleFAQClick = (question) => {
    handleSend(question);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <span>🤖 RoboEvents Assistant</span>
            <X size={20} className="close-btn" onClick={toggleChat} />
          </div>

          <div className="chatbox-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />

            {/* Suggested FAQs */}
            <div className="faq-section">
              <p className="faq-title">💡 Suggested Questions:</p>
              <button onClick={() => handleFAQClick("How do I register for an event?")}>
                How do I register for an event?
              </button>
              <button onClick={() => handleFAQClick("Can I cancel my registration?")}>
                Can I cancel my registration?
              </button>
              <button onClick={() => handleFAQClick("Where can I see upcoming events?")}>
                Where can I see upcoming events?
              </button>
              <button onClick={() => handleFAQClick("Who can I contact for help?")}>
                Who can I contact for help?
              </button>
            </div>
          </div>

          <div className="chatbox-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <button className="chatbot-toggle" onClick={toggleChat}>
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
