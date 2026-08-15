"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import { useData } from "./DataContext";
import { Play, Pause, Volume2, VolumeX, Radio, AlertCircle } from "lucide-react";

export default function PersistentPlayer() {
  const { t } = useLanguage();
  const { settings } = useData();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isOnline = settings.player_status === "online";
  const transmissionType = settings.radio_transmission_type || "live";
  const audioUrl = transmissionType === "recorded" 
    ? (settings.radio_recorded_url || "") 
    : (settings.radio_stream_url || "");
  const shouldLoop = transmissionType === "recorded" && (settings.radio_recorded_loop ?? true);

  const isPlayable = transmissionType === "recorded" || isOnline;

  useEffect(() => {
    let wasPlaying = isPlaying;
    
    if (typeof window !== "undefined" && audioUrl) {
      const audio = new Audio(audioUrl);
      audio.volume = volume;
      audio.loop = shouldLoop;
      
      audio.addEventListener("error", () => {
        setHasError(true);
        setIsPlaying(false);
      });
      
      audio.addEventListener("ended", () => {
        if (!shouldLoop) {
          setIsPlaying(false);
        }
      });

      audioRef.current = audio;

      if (wasPlaying && isPlayable) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Auto-resume play failed:", err);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl, shouldLoop, isPlayable]);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !isPlayable) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setHasError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const statusLabel = transmissionType === "recorded" 
    ? "REPRODUZINDO ÁUDIO / LOOP" 
    : (isOnline ? "AO VIVO / ONLINE" : "OFFLINE");

  const statusColor = transmissionType === "recorded"
    ? (isPlaying ? "bg-emerald-600 text-white animate-pulse" : "bg-emerald-800 text-emerald-100")
    : (isOnline ? "bg-red-600 text-white animate-pulse" : "bg-gray-600 text-gray-300");

  const statusPing = transmissionType === "recorded" 
    ? (isPlaying ? "animate-ping" : "") 
    : (isOnline ? "animate-ping" : "");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-primary-main text-white shadow-[0_-4px_20px_rgba(26,64,41,0.15)] border-t border-accent-gold/20 backdrop-blur-md px-4 py-3 md:py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Radio Info */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`p-2.5 rounded-xl flex items-center justify-center ${
            isPlaying ? "bg-accent-gold text-primary-main animate-pulse" : "bg-primary-dark text-white/70"
          }`}>
            <Radio className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-wide">
                {t("playerRadioTitle")}
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 ${statusColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-white ${statusPing}`} />
                {statusLabel}
              </span>
            </div>
            <span className="text-[11px] text-white/75 font-medium leading-none mt-1">
              {transmissionType === "recorded" 
                ? "Transmissão Especial Gravada em Loop" 
                : (isOnline ? t("playerRadioDesc") : t("contentRadioOffline"))}
            </span>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            disabled={!isPlayable}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              !isPlayable 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : isPlaying 
                  ? "bg-accent-gold text-primary-main" 
                  : "bg-white text-primary-main hover:bg-gray-100"
            }`}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Status Text for clarity */}
          <div className="flex flex-col text-xs font-semibold">
            <span className={isPlayable ? "text-accent-gold" : "text-gray-400"}>
              {transmissionType === "recorded" 
                ? "Status: Loop de Áudio" 
                : (isOnline ? `Status: ${t("playerOnline")}` : `Status: ${t("playerOffline")}`)}
            </span>
            {hasError && (
              <span className="text-red-400 text-[10px] flex items-center gap-1 mt-0.5">
                <AlertCircle className="w-3 h-3" />
                Erro ao conectar
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Volume Controls */}
        <div className="hidden md:flex items-center gap-2.5 w-44">
          <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 rounded-lg bg-white/20 accent-accent-gold cursor-pointer"
            aria-label="Volume"
          />
        </div>

      </div>
    </div>
  );
}
