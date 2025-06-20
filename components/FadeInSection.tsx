import React, { useRef, useEffect, useState, PropsWithChildren } from "react";

export function FadeInSection({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-section${isVisible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}