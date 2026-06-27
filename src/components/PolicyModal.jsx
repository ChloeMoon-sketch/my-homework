import React from 'react';
import { X } from 'lucide-react';

function PolicyModal({ type, isOpen, onClose }) {
  if (!isOpen) return null;

  const title = type === 'privacy' ? '개인정보처리방침' : '이용약관';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(10, 10, 12, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
    }}>
      {/* Modal Card */}
      <div 
        className="glass-panel animate-fade-in" 
        style={{
          width: '90%',
          maxWidth: '700px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '20px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '12px',
        }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--accent)',
          }}>
            {title}
          </h3>
          <button 
            onClick={onClose} 
            className="btn-icon"
            style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Container (Scrollable) */}
        <div style={{
          overflowY: 'auto',
          paddingRight: '8px',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: 'rgba(255, 255, 255, 0.85)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {type === 'privacy' ? (
            <>
              <p>Study Cafe(이하 '본 서비스')은(는) 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</p>
              
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제1조 (개인정보의 처리 목적)</h4>
                <p>본 서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'disc' }}>
                  <li><strong>학생 회원 가입 및 관리</strong>: 학급 구성원 식별, 학습 진도율 확인, 교사의 피드백 제공</li>
                  <li><strong>서비스 제공</strong>: 학습 콘텐츠 제공, 과제 제출 및 기록 저장, 학습 이력 관리</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제2조 (개인정보의 처리 및 보유기간)</h4>
                <p>1. 본 서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                <p>2. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'disc' }}>
                  <li><strong>보유 기간</strong>: 해당 학년도 종료 시(익년 2월 말) 또는 학생의 졸업/진급 시까지</li>
                  <li><strong>파기 시점</strong>: 보유 기간 종료 후 지체 없이(5일 이내) 파기</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제3조 (처리하는 개인정보 항목)</h4>
                <p>본 서비스는 학습 지원을 위해 필요한 최소한의 개인정보만을 수집합니다.</p>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'disc' }}>
                  <li><strong>수집 항목</strong>: 아이디, 비밀번호, 이름(또는 닉네임), 학년, 반, 번호</li>
                  <li><strong>수집하지 않는 항목</strong>: 주민등록번호, 주소, 전화번호, 이메일 등 불필요한 민감 정보</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제4조 (만 14세 미만 아동의 개인정보 처리에 관한 사항)</h4>
                <p>1. 본 서비스는 만 14세 미만 아동의 개인정보를 처리하기 위하여 가입 단계 또는 학기 초 학교 가정통신문(개인정보 수집·이용 동의서)을 통하여 법정대리인의 동의를 받습니다.</p>
                <p>2. 법정대리인이 동의하지 않는 경우, 해당 아동은 서비스 가입 및 이용이 제한될 수 있습니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제5조 (개인정보의 파기 절차 및 방법)</h4>
                <p>1. 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
                <p>2. <strong>파기 방법</strong>: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기(DB 영구 삭제)하며, 종이 문서는 분쇄하거나 소각하여 파기합니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제6조 (개인정보의 안전성 확보조치)</h4>
                <p>본 서비스는 개인정보 보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
                <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'disc' }}>
                  <li><strong>비밀번호 암호화</strong>: 이용자의 비밀번호는 일방향 암호화(Hash) 되어 저장 및 관리되며, 개발자(관리자)도 알 수 없습니다.</li>
                  <li><strong>해킹 등에 대비한 기술적 대책</strong>: 보안 인증을 획득한 전문 클라우드 플랫폼(Vercel)을 기반으로 운영되며, 전 구간 보안 통신(HTTPS)을 사용하여 데이터를 암호화하여 전송합니다.</li>
                  <li><strong>개인정보 취급 직원의 최소화</strong>: 개인정보를 처리하는 담당자를 개발 교사 1인으로 지정하여 접근 권한을 관리합니다.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제7조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h4>
                <p>1. 정보주체(학생) 및 법정대리인은 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</p>
                <p>2. 권리 행사는 서비스 내 [회원탈퇴] 기능을 통하여 즉시 가능하며, 또는 개발 교사에게 구두나 서면으로 요청하면 지체 없이 조치하겠습니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제8조 (개인정보 보호책임자)</h4>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li><strong>성명</strong>: 문정원 (개발자)</li>
                  <li><strong>소속</strong>: 서울사대부고</li>
                  <li><strong>직위</strong>: 교사</li>
                  <li><strong>연락처</strong>: 학교 교무실 (※ 개인정보보호를 위해 교사의 개인 휴대전화 번호는 기재하지 않습니다.)</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제9조 (개인정보 처리방침 변경)</h4>
                <p>이 개인정보 처리방침은 2026년 6월 27일부터 적용됩니다.</p>
              </div>
            </>
          ) : (
            <>
              <p>본 이용약관(이하 '약관')은 Study Cafe(이하 '본 서비스')이 제공하는 교육용 웹 애플리케이션 서비스의 이용에 관한 사항을 규정합니다.</p>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제1조 (목적)</h4>
                <p>이 약관은 본 서비스가 제공하는 무료 교육용 웹 애플리케이션 서비스(이하 '서비스')를 이용함에 있어 서비스 제공자와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제2조 (정의)</h4>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li><strong>'서비스'</strong>란 본 플랫폼에서 제공하는 교육용 웹 애플리케이션을 말합니다.</li>
                  <li><strong>'이용자'</strong>란 본 서비스에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                  <li><strong>'회원'</strong>이란 본 서비스에 회원등록을 한 자로서, 서비스를 이용할 수 있는 자를 말합니다.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제3조 (약관의 명시와 개정)</h4>
                <p>1. 본 서비스는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
                <p>2. 본 서비스는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                <p>3. 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스 내에 그 적용일자 7일 이전부터 공지합니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제4조 (서비스의 제공)</h4>
                <p>1. 본 서비스는 교육 목적의 무료 웹 애플리케이션을 제공합니다.</p>
                <p>2. 서비스의 이용은 무료이며, 별도의 유료 결제가 필요하지 않습니다.</p>
                <p>3. 본 서비스는 교육 활동 지원을 목적으로 하며, 상업적 목적으로 운영되지 않습니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제5조 (서비스의 중단)</h4>
                <p>1. 본 서비스는 시스템 점검, 교체 및 고장, 통신 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</p>
                <p>2. 본 서비스는 무료로 제공되는 교육용 서비스이므로, 서비스 중단으로 인한 별도의 보상은 제공되지 않습니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제6조 (회원가입)</h4>
                <p>1. 이용자는 서비스가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의함으로써 회원가입을 신청합니다.</p>
                <p>2. 만 14세 미만의 아동은 학교 가정통신문 등을 통해 보호자(법정대리인)의 동의를 받은 후 서비스를 이용할 수 있습니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제7조 (회원 탈퇴)</h4>
                <p>회원은 본 서비스에 언제든지 탈퇴를 요청할 수 있으며, 서비스는 즉시 회원탈퇴를 처리합니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제8조 (이용자의 의무)</h4>
                <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
                  <li>허위 내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>서비스에 게시된 정보의 무단 변경</li>
                  <li>서비스의 운영을 방해하는 행위</li>
                  <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
                  <li>공서양속에 반하는 정보를 게시하는 행위</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제9조 (저작권)</h4>
                <p>1. 본 서비스가 작성한 저작물에 대한 저작권은 서비스 제공자(개발자 문정원)에게 귀속합니다.</p>
                <p>2. 이용자는 서비스를 이용하여 얻은 정보를 서비스 제공자의 사전 승낙 없이 복제, 송신, 출판, 배포하여서는 안 됩니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제10조 (면책조항)</h4>
                <p>1. 본 서비스는 무료로 제공되는 교육용 서비스로서, 서비스 이용 중 발생하는 기술적 문제나 오류에 대해 제한적 책임을 집니다.</p>
                <p>2. 본 서비스가 연결하는 외부 웹 애플리케이션의 내용에 대해서는 해당 애플리케이션 제공자가 책임을 집니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>제11조 (분쟁해결)</h4>
                <p>본 서비스와 이용자 간에 발생한 분쟁에 관하여는 대한민국 법을 적용하며, 소송이 제기되는 경우 서비스 제공자의 소재지(서울사대부고)를 관할하는 법원을 관할법원으로 합니다.</p>
              </div>

              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px' }}>부칙</h4>
                <p>이 약관은 2026년 6월 27일부터 시행됩니다.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer of Modal */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '12px',
        }}>
          <button 
            onClick={onClose} 
            className="btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.9rem',
              borderRadius: '8px',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PolicyModal;
