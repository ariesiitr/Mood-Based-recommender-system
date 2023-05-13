import React, { useState , useRef} from 'react';
import style from './input.module.css'
import send from './assets/send.png';
import mic from './assets/mic.png'
function InputBox({ sendMessage }) {
  const [inputValue, setInputValue] = useState('');
  // const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const audioRef = useRef();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  }




  const handleSend = () => {
    if (inputValue || audioRef.current) {
      sendMessage({
        type: 'sent',
        text: inputValue,
        audio: audioRef.current,
        audioBlob: audioRef.current ? URL.createObjectURL(audioRef.current) : null,

      });
      setInputValue('');
      audioRef.current = null;
    }
  };
  

  
  const handleMicDown = () => {
    navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        mediaRecorder.start();
        setRecording(true);
      })
      .catch((err) => {
        console.log('Unable to access microphone: ', err);
      });
  };

  const handleMicUp = () => {
    mediaRecorder.stop();
    setRecording(false);
  };

  const handleAudioData = (event) => {
    const chunks = [];
    chunks.push(event.data);
    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
    // const audioBlob = new Blob(chunks, { type: 'application/octet-stream' });

    audioRef.current = audioBlob;
  };

  if (mediaRecorder) {
    mediaRecorder.ondataavailable = handleAudioData;
    mediaRecorder.onstop = handleMicUp;
  }

  
  return (

    <div className={style.inputBox}>
    <i className="fas fa-grin"></i>
    <input
      type="text"
      placeholder="Type a message"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
    />
    <img
      src={mic}
      alt="Microphone"
      onMouseDown={handleMicDown}
      onMouseUp={handleMicUp}
      onTouchStart={handleMicDown}
      onTouchEnd={handleMicUp}
    />
    <img src={send} alt="Send" onClick={handleSend} />
  </div>
  );
}

export default InputBox;
