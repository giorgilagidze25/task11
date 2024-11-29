import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [videoId, setVideoId] = useState('yqCXIu3lq5w'); 
  const timerRef = useRef(null);
  const imageRef = useRef(null);
  const playerRef = useRef(null);

  const incrementTime = () => {
    setTime((prevTime) => prevTime + 1);
  };

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(incrementTime, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1.2)';
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1)';
    }
  };

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId, 
          events: {
            onReady: () => {
              console.log('Player is ready');
            },
          },
        });
      };
    };

    loadYouTubeAPI();
  }, []);

  const changeVideo = (newVideoId) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(newVideoId); 
      setVideoId(newVideoId);
    }
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div>
      <h1>{time} წამი</h1>
      <div>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>
        <button onClick={resetTimer}>Reset Timer</button>
      </div>

      <div>
        <h1>Zoomable Image</h1>
        <img
          ref={imageRef}
          src="/assets/1.png"
          alt="Zoomable"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      <div>
        <div id="youtube-player"  className='youtubeDiv' ></div>
        <div>
          <button onClick={playVideo}>Play</button>
          <button onClick={pauseVideo}>Pause</button>
        </div>
        <div>
          <button onClick={() => changeVideo('yqCXIu3lq5w')}>Video 1</button>
          <button onClick={() => changeVideo('qHH2PMfRPds')}>Video 2</button>
        </div>
      </div>
    </div>
  );
};

export default App;
