import React, {useState} from "react";
import axios from "axios";
import style from './container.module.css'
import ChatHeader from "../../chatUI/header/header";
import InputBox from "../../chatUI/inputBox/input";
function Container(){
    const [messages, setMessages] = useState([]);

    const sendMessage = async (message) => {
      const userMessage = {
        type: 'sent',
        text: message.text,
        audio: message.audio,
      };
      const botResponse = {
        type: 'received',
        text: 'This is a bot response',
      };
      setMessages([...messages, userMessage, botResponse]);
      const link = URL.createObjectURL(message.audio);



  const config = {
    responseType: 'blob'
  };
  axios.get(link, config)
    .then(response => {
      if (response.status === 200) {
        console.log('Audio fetched as URL');
        console.log(link);
        // do something with the response data
      } else {
        console.log('Error:', response.statusText);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });

    
    try {
      const response = await axios.post("http://localhost:5000/api/data", {
        audioLink: link,
      });

      if (response.status === 200) {
        console.log("Data saved to the database");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }


};



    return(

    <div className={style.container}>
    <div className={style.box}>
      <ChatHeader contactName="UsBhai" />
      <div className={style.chatArea}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${style.chatBubble} ${message.type === 'sent' ? style.sent : style.received}`}
          >
            {message.text}
            {message.audio && (
              <audio controls>
                <source  src={URL.createObjectURL(message.audio)} type="audio/wav" />
              </audio>
            )}
          </div>
        ))}
      </div>
      <InputBox sendMessage={sendMessage} />
    </div>
  </div>
    )
}

export default Container;



