import { useEffect, useState } from 'react';

interface SectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

const useSectionObserver = (options: SectionObserverOptions = {}) => {
  const [currentSection, setCurrentSection] = useState<string>('');

  useEffect(() => {
    const { threshold = 0.3, rootMargin = '0px' } = options;

    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin]);

  return currentSection;
};

export default useSectionObserver;
