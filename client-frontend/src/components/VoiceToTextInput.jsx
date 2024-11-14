import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";

function VoiceToTextInput({ inputText, setInputText }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Cleanup the recognition instance when the component unmounts
    return () => {
      if (recognition) {
        recognition.stop();
        setRecognition(null);
      }
    };
  }, [recognition]);

  const handleStartListening = () => {
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(true);
      console.log("Speech recognition stopped");
      return;
    }

    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const newRecognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onstart = () => {
        setIsListening(true);
        console.log("Speech recognition started");
      };

      newRecognition.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
      };

      newRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setInputText(transcript);
        console.log("Transcript:", transcript);
      };

      newRecognition.start();
      setRecognition(newRecognition);
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  };

  const handleStopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      console.log("Speech recognition stopped manually");
    }
  };

  return (
      <div style={{ display: "inline-block", marginLeft: "1vh" }}>
        <button onClick={handleStartListening} disabled={isListening}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button onClick={handleStopListening} style={{ marginLeft: "0.5vh" }}>
          <FontAwesomeIcon icon={faStop} />
        </button>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Speak into the microphone..."
          style={{ display: "none" }}
          rows={4}
        />
      </div>
  );
}

export default VoiceToTextInput;
