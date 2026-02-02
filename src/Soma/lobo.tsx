export default function Rayo() {
  return (
    <section
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: '#e0e0ff',
          textShadow: '0 0 25px rgba(120,120,255,0.6)',
          marginBottom: '20px',
        }}
      >
        Soma
      </h1>
      <h2>Portal Lobo</h2>
      <p>Prototipo en desarrollo</p>
    </section>
  );
}