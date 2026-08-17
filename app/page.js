'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [review, setReview] = useState('');
  const [industry, setIndustry] = useState('General Professional');
  const [location, setLocation] = useState('Generic Market');
  const [loading, setLoading] = useState(false);
  const [paywall, setPaywall] = useState(false);
  const [vectors, setVectors] = useState(null);

  useEffect(() => {
    const uses = parseInt(localStorage.getItem('smr_usage_credits') || '0');
    if (uses >= 3) setPaywall(true);
  }, []);

  const handleShieldExecution = async () => {
    if (!review.trim()) return alert('Please input review transcript to run analysis.');
    setLoading(true);

    try {
      const res = await fetch('/api/shield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, industry, location }),
      });
      
      const data = await res.json();
      if (res.status === 402) {
        setPaywall(true);
        setLoading(false);
        return;
      }

      setVectors(data.vectors);
      localStorage.setItem('smr_usage_credits', (parseInt(localStorage.getItem('smr_usage_credits') || '0') + 1).toString());
    } catch (err) {
      alert('Operational communication variance. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyVectorData = (text) => {
    navigator.clipboard.writeText(text);
    alert('Strategic corporate response text copied to dashboard clipboard.');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid var(--primary-color)', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-georgia), serif', fontSize: '2.5rem', fontWeight: 400, color: 'var(--primary-color)' }}>ShieldMyReview</h1>
        <p style={{ fontFamily: 'var(--font-georgia), serif', fontStyle: 'italic', color: '#666', marginTop: '5px' }}>Corporate-grade reputation protection and crisis defense for independent enterprise.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '30px', opacity: paywall ? 0.4 : 1 }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Paste Public Customer Review</label>
          <textarea 
            value={review} 
            onChange={(e) => setReview(e.target.value)}
            disabled={paywall}
            placeholder="Paste the exact text of the negative or difficult review here..."
            style={{ width: '100%', height: '150px', padding: '12px', border: '1px solid var(--border-color)', marginBottom: '20px', fontSize: '1rem' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Industry Context</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} disabled={paywall} style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', backgroundColor: '#FFF' }}>
                <option value="General Professional">General Professional</option>
                <option value="Contracting & Trades">Contracting & Trades (Plumbing, Roofing, HVAC)</option>
                <option value="Medical & Dental">Medical & Dental (HIPAA Protected)</option>
                <option value="Automotive & Repair">Automotive Repair</option>
                <option value="Hospitality & Restaurant">Hospitality & Food Service</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Your Market Location</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                disabled={paywall}
                placeholder="e.g. Chicago, IL" 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', fontSize: '1rem' }}
              />
            </div>
          </div>

          <button onClick={handleShieldExecution} disabled={paywall || loading} style={{ backgroundColor: 'var(--primary-color)', color: '#FFF', border: 'none', padding: '15px 30px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', width: '100%' }}>
            {loading ? 'Analyzing Vectors...' : 'Shield My Business'}
          </button>
        </div>

        {paywall && (
          <div style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed var(--primary-color)', background: '#FFF' }}>
            <h3 style={{ fontFamily: 'var(--font-georgia), serif', fontSize: '1.5rem', marginBottom: '10px' }}>Trial Protection Limit Reached</h3>
            <p style={{ marginBottom: '20px', color: '#555' }}>You have exhausted your complimentary credits. Secure your digital brand reputation indefinitely.</p>
            <button onClick={() => window.location.href='https://stripe.com'} style={{ backgroundColor: 'var(--primary-color)', color: '#FFF', padding: '15px 40px', border: 'none', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase' }}>
              Unlock Unlimited Access — $14/mo
            </button>
          </div>
        )}

        {vectors && !paywall && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-georgia), serif', fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Strategic Response Vectors</h2>
            
            {Object.entries(vectors).map(([key, text]) => (
              <div key={key} style={{ background: '#FFF', border: '1px solid var(--border-color)', padding: '25px', marginBottom: '20px' }}>
                <div style={{ fontFamily: 'var(--font-georgia), serif', fontWeight: 600, color: 'var(--primary-color)', marginBottom: '10px', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div style={{ fontFamily: 'var(--font-georgia), serif', background: '#FAF8F5', padding: '15px', border: '1px solid #EAE8E5', marginBottom: '15px', white-space: 'pre-wrap' }}>{text}</div>
                <button onClick={() => copyVectorData(text)} style={{ background: 'none', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', padding: '8px 16px', cursor: 'pointer', fontWeight: 600 }}>Copy Strategy</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', fontSize: '0.85rem', color: '#888', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        &copy; 2026 ShieldMyReview Operations. All rights reserved. Self-serve dashboard via Stripe Management Systems.
      </footer>
    </div>
  );
}
