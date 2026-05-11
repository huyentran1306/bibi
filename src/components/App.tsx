'use client';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import NameGate from './NameGate';
import Chrome from './Chrome';
import Hero from './Hero';
import RSVP from './RSVP';
import Messages from './Messages';
import Timeline from './Timeline';
import FinalMessage from './FinalMessage';
import Ending from './Ending';
import { useVisitorName } from '@/hooks/useVisitorName';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { name: visitorName, saveName, clearName } = useVisitorName();

  useEffect(() => {
    if (!loaded) return;
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [loaded, visitorName]);

  return (
    <div className="app">
      {!loaded && <Loading onDone={() => setLoaded(true)}/>}
      {loaded && <NameGate name={visitorName} onSubmit={saveName}/>}
      <Chrome visitorName={visitorName} onClearName={clearName}/>
      <Hero visitorName={visitorName}/>
      <RSVP visitorName={visitorName}/>
      <Messages visitorName={visitorName}/>
      <Timeline/>
      <FinalMessage/>
      <Ending/>
    </div>
  );
}
