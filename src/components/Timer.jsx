import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Bell } from 'lucide-react';
import { playAlarm as playSynthAlarm, stopAlarm as stopSynthAlarm } from '../utils/audioSynth';

export const ALARM_SOUNDS = [
  { id: 'bowl', name: '싱잉볼' },
  { id: 'peace', name: '평화로운 음악' },
  { id: 'fanfare', name: '팡파레' }
];

export default function Timer() {
  const [h, setH] = useState(0);
  const [m, setM] = useState(25);
  const [s, setS] = useState(0);
  
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(ALARM_SOUNDS[0]);

  const alarmTimeoutRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      triggerAlarm();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const triggerAlarm = () => {
    setAlarmPlaying(true);
    playSynthAlarm(selectedAlarm.id);
    
    // Stop after 30 seconds
    if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current);
    alarmTimeoutRef.current = setTimeout(() => {
      stopAlarm();
    }, 30000);
  };

  const stopAlarm = () => {
    setAlarmPlaying(false);
    stopSynthAlarm();
    if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current);
  };

  const startTimer = () => {
    if (h === 0 && m === 0 && s === 0) return;
    const totalSeconds = h * 3600 + m * 60 + s;
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel" style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      
      {alarmPlaying ? (
        <div className="animate-pulse" style={{ textAlign: 'center', color: 'var(--accent)' }}>
          <Bell size={40} style={{ margin: '0 auto 8px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Time is up!</h2>
          <button className="btn-primary" onClick={stopAlarm} style={{ marginTop: '12px' }}>알람 끄기</button>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Focus Timer</div>
          
          {isRunning || timeLeft > 0 ? (
            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '1px', color: 'var(--accent)' }}>
              {formatTime(timeLeft)}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input type="number" min="0" max="23" value={h} onChange={e => setH(parseInt(e.target.value) || 0)} style={inputStyle} />
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>:</span>
              <input type="number" min="0" max="59" value={m} onChange={e => setM(parseInt(e.target.value) || 0)} style={inputStyle} />
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>:</span>
              <input type="number" min="0" max="59" value={s} onChange={e => setS(parseInt(e.target.value) || 0)} style={inputStyle} />
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            {!isRunning ? (
              <button className="btn-icon" onClick={timeLeft > 0 ? () => setIsRunning(true) : startTimer} style={{ background: 'var(--accent)', color: '#000' }}>
                <Play size={20} fill="currentColor" />
              </button>
            ) : (
              <button className="btn-icon" onClick={pauseTimer}>
                <Pause size={20} fill="currentColor" />
              </button>
            )}
            <button className="btn-icon" onClick={stopTimer}>
              <Square size={16} fill="currentColor" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginTop: '12px', width: '100%' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>종료 알람 소리</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {ALARM_SOUNDS.map(alarm => (
                <button
                  key={alarm.id}
                  onClick={() => setSelectedAlarm(alarm)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: selectedAlarm.id === alarm.id ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${selectedAlarm.id === alarm.id ? 'var(--accent)' : 'transparent'}`,
                    color: '#fff',
                    fontSize: '0.8rem'
                  }}
                >
                  {alarm.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  padding: '6px',
  borderRadius: '6px',
  width: '44px',
  fontSize: '1.2rem',
  textAlign: 'center',
  outline: 'none',
  fontFamily: 'monospace'
};
