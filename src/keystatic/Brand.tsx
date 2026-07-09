// Brand logo za Keystatic admin — klik vodi natrag na naslovnicu web sajta.
export function mark() {
  return (
    <a
      href="/"
      title="Natrag na naslovnicu web sajta"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <img
        src="/images/2025/02/RFHP_Logofinal_round-105x83.png"
        alt=""
        height={24}
        style={{ display: 'block' }}
      />
      <span style={{ fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap' }}>
        ← Web
      </span>
    </a>
  );
}
