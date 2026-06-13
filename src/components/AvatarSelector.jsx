import { useState } from 'react';

const POKEMONS = [
  { id: 25, name: 'Pikachu' },
  { id: 4, name: 'Charmander' },
  { id: 7, name: 'Squirtle' },
  { id: 1, name: 'Bulbasaur' },
  { id: 133, name: 'Eevee' }
];

export default function AvatarSelector({ selectedAvatar, onSelectAvatar, isDancing, setIsDancing }) {
  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'center' }}>
        Select Your Avatar
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {POKEMONS.map(poke => {
          const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
          const isSelected = selectedAvatar?.id === poke.id;
          
          return (
            <button
              key={poke.id}
              onClick={() => onSelectAvatar(poke)}
              style={{
                background: isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: `2px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                padding: '4px',
                transition: 'all 0.2s',
                transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isSelected ? '0 0 15px var(--accent)' : 'none'
              }}
              title={poke.name}
            >
              <img src={imgUrl} alt={poke.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </button>
          )
        })}
      </div>
      
      {selectedAvatar && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
          <button 
            onClick={() => setIsDancing(false)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              background: !isDancing ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
              color: !isDancing ? '#000' : '#fff',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            가만히
          </button>
          <button 
            onClick={() => setIsDancing(true)}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              background: isDancing ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
              color: isDancing ? '#000' : '#fff',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}
          >
            춤추기 🎵
          </button>
        </div>
      )}
    </div>
  );
}
