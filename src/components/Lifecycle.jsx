import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { SectionTitle } from './ui/SectionTitle';
import { Reveal } from './ui/Reveal';
import { getStatus } from '../services/api.js';

export function Lifecycle() {
  const steps = ['Client', 'Express API', 'Validation', 'Auth / RBAC', 'Business logic', 'MongoDB', 'Response'];
  const [active, setActive] = useState(-1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (loading) return;
    setResult(null);
    setLoading(true);
    setActive(0);
    const start = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const travel = (async () => {
      if (!reduced) {
        for (let i = 1; i < steps.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 160));
          setActive(i);
        }
      }
    })();

    try {
      const response = await getStatus();
      const elapsed = Math.round(performance.now() - start);
      await travel;
      setResult({ status: response.status, time: elapsed, json: response.data });
    } catch (error) {
      await travel;
      setResult({ error: error.name === 'AbortError' ? 'Request timed out.' : error.message });
    } finally {
      setActive(steps.length - 1);
      setLoading(false);
    }
  }

  return (
    <section className="section lifecycle">
      <div className="container">
        <div className="lifecycle-head">
          <SectionTitle 
            number="03.1" 
            kicker="UNDER THE HOOD" 
            title={<>A real request.<br /><em>A real response.</em></>} 
            description="This portfolio runs an Express API. Send a request and inspect its live response." 
          />
          <button className="button button-primary" onClick={run} disabled={loading}>
            <Activity size={18} />
            {loading ? 'Sending request…' : 'Send request'}
          </button>
        </div>
        
        <Reveal className="lifecycle-panel">
          <div className="flow">
            {steps.map((step, i) => (
              <React.Fragment key={step}>
                <div className={active === i ? 'flow-step active' : 'flow-step'}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <span>{step}</span>
                </div>
                {i < steps.length - 1 && <span className="flow-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
          <div className="response">
            <div className="response-bar">
              <span>
                <span className="live-dot" /> GET /api/status
              </span>
              <span>
                {result?.status 
                  ? `${result.status} OK · ${result.time}ms` 
                  : loading 
                    ? 'REQUESTING…' 
                    : 'AWAITING REQUEST'}
              </span>
            </div>
            <pre aria-live="polite">
              {result?.json 
                ? JSON.stringify(result.json, null, 2) 
                : result?.error 
                  ? `// ${result.error}\n// The API may be unavailable. Please try again later.` 
                  : '// Click “Send request” to call the live Express API.\n// The response will appear here.'}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
