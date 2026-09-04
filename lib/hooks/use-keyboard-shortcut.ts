import { useEffect } from "react";

type ShortcutKey = string;

interface ShortcutOptions {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  key: ShortcutKey,
  callback: (e: KeyboardEvent) => void,
  options: ShortcutOptions = { metaKey: true, ctrlKey: true, preventDefault: true }
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchKey = event.key.toLowerCase() === key.toLowerCase();
      const matchMetaOrCtrl =
        (options.metaKey && event.metaKey) || (options.ctrlKey && event.ctrlKey);

      if (matchKey && matchMetaOrCtrl) {
        if (options.preventDefault !== false) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, options]);
}
