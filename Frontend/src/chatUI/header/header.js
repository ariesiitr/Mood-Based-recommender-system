import React,{useState} from 'react';
import style from './header.module.css'
import tech from "./assets/tech.png"
function ChatHeader({ contactName, sendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(inputValue);
      setInputValue(' ');
    }
  }
  return (
    <>

    <div className={style.chatHeader}>
      <img src={tech} alt="Contact Avatar" className={style.contactAvatar}/>
      <div className={style.contactInfo}>
        <h2 className={style.contactName}>{contactName}</h2>
        <span className={style.contactStatus}>Online</span>
      </div>
      <div className={style.headerIcons}>
        <i className="fas fa-search"></i>
        <i className="fas fa-paperclip"></i>
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
 
      </>
  );
}

export default ChatHeader;
