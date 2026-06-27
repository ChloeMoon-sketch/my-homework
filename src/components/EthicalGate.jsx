import React from 'react';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';

function EthicalGate({ onAgree }) {
  const guidelines = [
    {
      id: 1,
      title: "가이드 1. 활용 목적",
      values: ["주도성", "합목적성"],
      highlight: "생성형 AI 활용의 목적과 범위를 스스로 설정하고 책임져요.",
      desc: "생성형 AI를 어떤 목적으로, 어느 범위까지 활용할지 스스로 기준을 세워요. 그 기준이 상황마다 흔들린다면, 생성형 AI를 활용하는 게 아니라 끌려다니는 거예요. 활용한 결과에 대한 책임은 언제나 나에게 있어요."
    },
    {
      id: 2,
      title: "가이드 2. 주도적 학습",
      values: ["주도성"],
      highlight: "내가 먼저 시도하고, 생성형 AI의 결과물에 나만의 통찰을 담아 완성해요.",
      desc: "생성형 AI는 훌륭한 도구일 뿐, 나를 대신할 수는 없어요. 생성형 AI에게 묻기 전, 주제에 대해 나의 가설이나 논리 구조를 먼저 세워요. 생성형 AI의 결과물이 나오면, 그대로 복사하지 않고 나의 경험, 비판적 시각, 독창적인 해석을 덧입혀 나만의 색깔을 담아 최종 결과물을 만들어요."
    },
    {
      id: 3,
      title: "가이드 3. 비판적 검증",
      values: ["주도성"],
      highlight: "생성형 AI의 한계를 분석하고, 자료를 찾아 결과물을 비판적으로 검증해요.",
      desc: "생성형 AI는 확률적으로 그럴싸한 답변을 내놓을 뿐, 항상 진실만을 말하지는 않아요. 생성형 AI가 제시한 수치, 인물, 사건이 사실인지 반드시 교과서, 원본, 공신력 있는 기관의 자료를 통해 교차 검증해요. 생성형 AI의 답변 속 숨겨진 편향성을 찾아내고, 중립적인 시각에서 정보를 재구성해요."
    },
    {
      id: 4,
      title: "가이드 4. 사고의 확장",
      values: ["주도성", "합목적성"],
      highlight: "생성형 AI를 보조 도구로 삼아 사고의 범위와 깊이를 확장해요.",
      desc: "생성형 AI를 ‘내 사고를 확장하는 지적 대화 파트너’로 활용해요. ‘나의 생각에 대한 반론을 제시해 줘’, ‘다른 관점에서 나의 생각을 분석해 줘’와 같은 심화 질문을 통해 생각의 범위를 넓혀요. 혼자 해결하기 어려운 복잡한 데이터나 추상적인 개념을 이해할 때는 생성형 AI를 보조도구로 활용하여 깊이를 더해요."
    },
    {
      id: 5,
      title: "가이드 5. 안전과 관계",
      values: ["안전성"],
      highlight: "데이터 보안과 정서적 자립을 통해 디지털 시민성을 완성해요.",
      desc: "나 또는 타인의 민감한 정보를 생성형 AI에 입력하지 않으며, 공용기기 로그아웃 등 기본 보안 수칙을 잘 지켜요. 생성형 AI가 주는 편리함이나 인위적 공감에 매몰되지 않도록 정서적 주체성을 잃지 않도록 주의해요. 선생님 또는 친구와의 실제적인 교류와 토론을 통해 건강한 자아를 확립하고 정서적 독립을 유지해요."
    },
    {
      id: 6,
      title: "가이드 6. 투명성·윤리",
      values: ["투명성"],
      highlight: "생성형 AI 활용 사실을 투명하게 공개하며 학술적 정직성을 실천해요.",
      desc: "어떤 단계에서 어떤 생성형 AI를 사용했는지, 프롬프트는 무엇이었는지 명확히 기록해요. 생성형 AI의 도움을 받은 부분을 투명하게 밝힘으로써 자신의 노력이 들어간 부분과 생성형 AI의 기여를 구분하고, 표절 시비로부터 나의 학문적 정당성을 보호해요."
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: "url('/bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      overflowY: 'auto',
      padding: '20px 0',
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.75)',
        zIndex: 0
      }} />

      {/* Glassmorphism content card */}
      <div 
        className="glass-panel animate-fade-in" 
        style={{
          width: '95%',
          maxWidth: '850px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          zIndex: 1,
          border: '1px solid rgba(255, 183, 3, 0.25)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(255, 183, 3, 0.12)',
          border: '2px dashed var(--accent)',
          color: 'var(--accent)',
        }}>
          <ShieldCheck size={32} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            marginBottom: '8px',
            background: 'linear-gradient(45deg, #ffffff, var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            생성형 AI 활용 윤리 핵심가이드
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            본 학습 활동을 시작하기 전에 생성형 AI 활용 윤리 가이드라인을 반드시 확인하고 실천해 주세요.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '16px',
        }}>
          {guidelines.map((g) => (
            <div 
              key={g.id} 
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'border-color 0.2s, background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 183, 3, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 183, 3, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent)' }}>
                  {g.title}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {g.values.map((v, i) => (
                    <span 
                      key={i} 
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '2px 8px',
                        borderRadius: '20px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ 
                fontSize: '0.92rem', 
                fontWeight: '700', 
                color: '#fff', 
                lineHeight: '1.4',
                wordBreak: 'keep-all'
              }}>
                {g.highlight}
              </div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: 'var(--text-muted)', 
                lineHeight: '1.5',
                wordBreak: 'keep-all'
              }}>
                {g.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Agreement Button */}
        <button
          onClick={onAgree}
          className="btn-primary animate-pulse"
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '16px 24px',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '14px',
            marginTop: '8px',
            boxShadow: '0 8px 24px rgba(255, 183, 3, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Check size={20} />
          나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
        </button>
      </div>
    </div>
  );
}

export default EthicalGate;

