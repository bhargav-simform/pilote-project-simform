import { useState, useCallback } from 'react';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          setIsCopied(text);
          setTimeout(() => setIsCopied(null), 2000); 
        },
        () => setIsCopied(null)
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(text);
      setTimeout(() => setIsCopied(null), 2000);
    }
  }, []);

  return { copyToClipboard, isCopied };
};

export default useCopyToClipboard;
