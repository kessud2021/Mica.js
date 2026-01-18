import { useCallback, useState } from 'react';

type UseClipboardReturn = {
  copy: (text: string) => Promise<void>;
  paste: () => Promise<string | null>;
  clear: () => Promise<void>;
  copied: boolean;
};

const useClipboard = (): UseClipboardReturn => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, []);

  const paste = useCallback(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (error) {
      console.error('Failed to paste:', error);
      return null;
    }
  }, []);

  const clear = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('');
    } catch (error) {
      console.error('Failed to clear clipboard:', error);
    }
  }, []);

  return { copy, paste, clear, copied };
};

export default useClipboard;
