import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { BackgroundSound } from '../utils/audioSynth';

export const BG_SOUNDS = [
  { id: 'sea', name: '바다 소리' },
  { id: 'bird', name: '새 소리' },
  { id: 'wind', name: '나뭇잎 소리' },
  { id: 'noise', name: '백색 소음' }
];

export default function SoundSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSound, setActiveSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const synthRef = useRef(null);

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.setVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.stop();
    }
    if (activeSound && isPlaying) {
      synthRef.current = new BackgroundSound(activeSound.id);
      synthRef.current.play(volume);
    }
  }, [activeSound, isPlaying]);

  const handleSelectSound = (sound) => {
    if (activeSound?.id === sound.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSound(sound);
      setIsPlaying(true);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={24} /> 자연의 소리
        </div>
        <button className="btn-icon" onClick={() => setIsOpen(!isOpen)}>
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {BG_SOUNDS.map(sound => (
              <button
                key={sound.id}
                onClick={() => handleSelectSound(sound)}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  background: activeSound?.id === sound.id && isPlaying ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)',
                  color: activeSound?.id === sound.id && isPlaying ? '#000' : '#fff',
                  border: 'none',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {activeSound?.id === sound.id && isPlaying ? <Pause size={16} /> : <Play size={16} />}
                {sound.name}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
            <Volume2 size={16} />
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--accent)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
