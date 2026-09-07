import { useEffect, useState } from "react";

const STORAGE_KEY = "scrollHintSeen";

export default function ScrollHint() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    if (!visible) return;

    function dismiss() {
      setVisible(false);
      localStorage.setItem(STORAGE_KEY, "1");
    }

    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    return () => window.removeEventListener("scroll", dismiss);
  }, [visible]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-hint"
      onClick={() => {
        setVisible(false);
        localStorage.setItem(STORAGE_KEY, "1");
      }}
    >
      <span className="scroll-hint-arrow">⌄</span>
      <span className="scroll-hint-text">Scroll to explore</span>
    </button>
  );
}
