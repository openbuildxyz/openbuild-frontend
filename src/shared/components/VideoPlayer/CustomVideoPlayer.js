/**
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';
import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function CustomVideoPlayer({ url, width = '100%', height = '100%' }) {
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showRateMenu, setShowRateMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-hide controls after 3 seconds when playing
  useEffect(() => {
    if (playing && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [playing, showControls]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleShowControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Reset auto-hide timer when showing controls
    if (playing) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleVideoClick = () => {
    handleShowControls();
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    handleShowControls();
  };

  const handleProgress = state => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = e => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  const handleSeekTouchStart = () => {
    setSeeking(true);
    handleShowControls();
  };

  const handleSeekTouchEnd = e => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const handleToggleMuted = () => {
    setMuted(!muted);
  };

  const handleDuration = duration => {
    setDuration(duration);
  };

  const handlePlaybackRateChange = rate => {
    setPlaybackRate(rate);
    setShowRateMenu(false);
  };

  const handleToggleFullscreen = () => {
    const container = document.querySelector('.video-container');

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    handleShowControls();
  };

  const handleContextMenu = e => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className="video-container relative w-full h-full bg-black group"
      onContextMenu={handleContextMenu}
      onClick={handleVideoClick}
      onMouseMove={handleShowControls}
      onTouchStart={handleShowControls}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width={width}
        height={height}
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ position: 'absolute', top: 0, left: 0 }}
        config={{
          file: {
            attributes: {
              onContextMenu: handleContextMenu,
              controlsList: 'nodownload',
            },
          },
        }}
      />

      {/* Custom Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          onTouchStart={handleSeekTouchStart}
          onTouchEnd={handleSeekTouchEnd}
          className="w-full h-1 mb-3 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
            >
              {playing ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className="hidden md:flex items-center group/volume">
              <button
                onClick={handleToggleMuted}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
              >
                {muted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                )}
              </button>

              <div className="flex items-center w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-200 ml-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 appearance-none bg-gray-600 rounded cursor-pointer accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(muted ? 0 : volume) * 100}%, #4b5563 ${(muted ? 0 : volume) * 100}%, #4b5563 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Mobile Volume Control */}
            <div className="flex md:hidden items-center">
              <button
                onClick={handleToggleMuted}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
              >
                {muted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 ml-2 appearance-none bg-gray-600 rounded cursor-pointer accent-blue-500"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(muted ? 0 : volume) * 100}%, #4b5563 ${(muted ? 0 : volume) * 100}%, #4b5563 100%)`,
                }}
              />
            </div>

            {/* Time Display */}
            <div className="text-sm">
              {formatTime(played * duration)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Playback Rate */}
            <div className="relative">
              <button
                onClick={() => setShowRateMenu(!showRateMenu)}
                className="px-2 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors text-sm"
              >
                {playbackRate}x
              </button>

              {showRateMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded py-1 min-w-[80px]">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={`w-full px-3 py-1 text-sm hover:bg-white/20 text-left ${
                        playbackRate === rate ? 'text-blue-500' : ''
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Center Play Button Overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={handlePlayPause}
            className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all backdrop-blur-sm pointer-events-auto"
          >
            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomVideoPlayer;
