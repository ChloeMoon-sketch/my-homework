import { useState } from 'react';
import Timer from './components/Timer';
import SoundSelector from './components/SoundSelector';
import MenuSelector from './components/MenuSelector';
import AvatarSelector from './components/AvatarSelector';
import EthicalGate from './components/EthicalGate';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';
import './index.css';

function App() {
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isDancing, setIsDancing] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'terms' | 'privacy' | null
  const [isAgreed, setIsAgreed] = useState(() => {
    return localStorage.getItem('ethical_agreed') === 'true';
  });

  const handleAgree = () => {
    localStorage.setItem('ethical_agreed', 'true');
    setIsAgreed(true);
  };

  if (!isAgreed) {
    return <EthicalGate onAgree={handleAgree} />;
  }

  return (
    <div className="app-container">
      {/* Settings Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: '60px', right: 0,
        width: '400px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        zIndex: 10,
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(4px)'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px' }}>Study Cafe</h1>
        
        <Timer />
        <SoundSelector />
        <MenuSelector selectedDrink={selectedDrink} onSelectDrink={setSelectedDrink} />
        <AvatarSelector 
          selectedAvatar={selectedAvatar} 
          onSelectAvatar={setSelectedAvatar}
          isDancing={isDancing}
          setIsDancing={setIsDancing}
        />
      </div>

      {/* Main View Area */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: '60px', right: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '40px', // Adjusted since bottom is 60px now
        zIndex: 5
      }}>
        {selectedAvatar && (
          <div className="animate-fade-in" style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedAvatar.id}.png`} 
              alt="Avatar"
              className={isDancing ? 'animate-dance' : ''}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
              }}
            />
            
            {selectedDrink && (
              <div className="animate-fade-in" style={{ position: 'relative', bottom: '20px' }}>
                <img 
                  src={selectedDrink.img} 
                  alt={selectedDrink.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    border: '4px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 15px 25px rgba(0,0,0,0.4)',
                    background: 'white'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  fontWeight: 600
                }}>
                  {selectedDrink.name}
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedAvatar && (
          <div style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '16px 32px',
            borderRadius: '24px',
            backdropFilter: 'blur(8px)',
            fontSize: '1.2rem'
          }}>
            오른쪽 패널에서 아바타와 음료를 선택하고 타이머를 시작해보세요.
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer onOpenModal={(type) => setActiveModal(type)} />

      {/* Policy and Terms Modal */}
      <PolicyModal 
        type={activeModal} 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
      />
    </div>
  );
}

export default App;

