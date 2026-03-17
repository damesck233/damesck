import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PerformanceContextValue {
  isLowPerf: boolean;
  togglePerfMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  isLowPerf: false,
  togglePerfMode: () => {},
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isLowPerf, setIsLowPerf] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('performance-mode') === 'low';
  });

  useEffect(() => {
    localStorage.setItem('performance-mode', isLowPerf ? 'low' : 'normal');
    if (isLowPerf) {
      document.documentElement.setAttribute('data-perf', 'low');
    } else {
      document.documentElement.removeAttribute('data-perf');
    }
  }, [isLowPerf]);

  const togglePerfMode = () => setIsLowPerf(prev => !prev);

  return (
    <PerformanceContext.Provider value={{ isLowPerf, togglePerfMode }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformanceMode = () => useContext(PerformanceContext);
