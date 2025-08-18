import { onCLS, onFID, onLCP } from 'web-vitals';

// פונקציה שמריצה את שלוש המדידות העיקריות של ביצועי האתר
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
  }
};

export default reportWebVitals;