import { useState, useCallback } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(text);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setIsCopied(null);
    }
  }, []);

  return { copyToClipboard, isCopied };
};

export default useCopyToClipboard;
