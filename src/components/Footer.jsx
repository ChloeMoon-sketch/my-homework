import React from 'react';

function Footer({ onOpenModal }) {
  return (
    <footer style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '60px',
      background: 'rgba(10, 10, 12, 0.5)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.6)',
      zIndex: 15,
      boxSizing: 'border-box',
    }}>
      {/* Copyright and Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>© 2026 Study Cafe. All rights reserved.</span>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        <span>
          개인정보책임자: <strong>문정원</strong> 교사 (서울사대부고)
        </span>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        <span>문의: 서울사대부고 교무실</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => onOpenModal('terms')} 
          style={{
            background: 'none',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'underline',
            padding: 0,
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
        >
          이용약관
        </button>
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        <button 
          onClick={() => onOpenModal('privacy')} 
          style={{
            background: 'none',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'underline',
            padding: 0,
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
        >
          개인정보처리방침
        </button>
      </div>
    </footer>
  );
}

export default Footer;
