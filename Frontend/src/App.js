import Navbar from "./Navbar/navbar";
import Container from "./Body/Container/Container";
function App() {
  return (
    <div>
      <Navbar/>
      <Container/>
    </div>
  );
}

export default App;




// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     const newChatHistory = [...chatHistory];
//     newChatHistory.push({ message, isUser: true });
//     setChatHistory(newChatHistory);
//     setMessage("");

//     // Code to send message to chatbot API or platform goes here
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>My Chatbot</h1>
//       </header>
//       <main>
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div key={index} className={chat.isUser ? "user-message" : "bot-message"}>
//               {chat.message}
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input type="text" value={message} onChange={handleMessageChange} />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
