// App.jsx — page orchestrator (with visitor-name gate)
const { useEffect: useEffectApp, useState: useStateApp } = React;

function App() {
  const [loaded, setLoaded] = useStateApp(false);
  const [visitorName, setVisitorName] = useVisitorName();

  useEffectApp(() => {
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
      {loaded && <NameGate name={visitorName} onSubmit={setVisitorName}/>}
      <Chrome visitorName={visitorName} onClearName={() => setVisitorName('')}/>
      <Hero visitorName={visitorName}/>
      <RSVP visitorName={visitorName}/>
      <Messages visitorName={visitorName}/>
      <Timeline/>
      <FinalMessage/>
      <Ending/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
