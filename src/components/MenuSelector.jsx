import { useState, useEffect } from 'react';
import { Coffee, ChevronRight, Check } from 'lucide-react';

export default function MenuSelector({ selectedDrink, onSelectDrink }) {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/mega-menu/menu/menu.php?page=1&menu_category1=1&menu_category2=1&category=&list_checkbox_all=all');
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        const items = [];
        const liElements = doc.querySelectorAll('#menu_list > li');
        
        liElements.forEach(li => {
          const imgEl = li.querySelector('.cont_gallery_list_img img');
          const nameEl = li.querySelector('.cont_text_title .text1 b');
          const descEl = li.querySelector('.cont_text_info .text2');
          
          if (nameEl && imgEl) {
            items.push({
              id: nameEl.textContent.trim(),
              name: nameEl.textContent.trim(),
              img: imgEl.src.replace(window.location.origin, 'https://www.mega-mgccoffee.com'),
              desc: descEl ? descEl.textContent.trim() : ''
            });
          }
        });

        // If fetch fails or empty, provide fallbacks
        if (items.length === 0) {
          items.push(
            { id: 'americano', name: '아메리카노', img: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20231010165747_1696924667104_2nKxY1r_wM.jpg' },
            { id: 'latte', name: '카페라떼', img: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20210219154446_1613717086884_jB101oD_wM.jpg' }
          );
        }

        setDrinks(items);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch mega coffee menu:", error);
        setDrinks([
          { id: 'americano', name: '아메리카노 (Fallback)', img: 'https://img.79plus.co.kr/megahp/manager/upload/menu/20231010165747_1696924667104_2nKxY1r_wM.jpg' }
        ]);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="menu-selector-container" style={{ position: 'relative' }}>
      <button 
        className="glass-panel" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '16px 24px',
          width: '100%',
          justifyContent: 'space-between',
          background: selectedDrink ? 'rgba(255, 255, 255, 0.25)' : 'var(--glass-bg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedDrink ? (
            <img src={selectedDrink.img} alt={selectedDrink.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <Coffee size={24} />
          )}
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>
            {selectedDrink ? selectedDrink.name : 'Choose a drink from Mega Coffee'}
          </span>
        </div>
        <ChevronRight size={20} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
      </button>

      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          marginTop: '8px', 
          maxHeight: '300px', 
          overflowY: 'auto',
          zIndex: 10,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading menu...</div>
          ) : (
            drinks.map(drink => (
              <button 
                key={drink.id}
                onClick={() => {
                  onSelectDrink(drink);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid transparent',
                  transition: '0.2s',
                  color: 'white',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <img src={drink.img} alt={drink.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: 'white' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{drink.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {drink.desc}
                  </div>
                </div>
                {selectedDrink?.id === drink.id && <Check size={20} color="var(--accent)" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
