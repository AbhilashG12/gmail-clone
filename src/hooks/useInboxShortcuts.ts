import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type VirtuosoHandle } from "react-virtuoso";
import { type Email } from "../data/emails";
import { useEmailStore } from "../store/useEmailStore";
import { useKeyboardStore } from "../store/useKeyboardStore";
import { useInboxLogic } from "./useInbox";

export const useInboxShortcuts = (
  emails: Email[], 
  virtuosoRef: React.RefObject<VirtuosoHandle | null>, 
  handlers: ReturnType<typeof useInboxLogic>['handlers']
) => {
  const navigate = useNavigate();
  const { toggleStar } = useEmailStore();
  const { focusedIndex, setFocusedIndex } = useKeyboardStore();
  const { activeFolder, searchQuery } = useInboxLogic().state;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      const total = emails.length;
      if (total === 0) return;

      switch (e.key) {
        case "j": // Next
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = Math.min(prev + 1, total - 1);
            virtuosoRef.current?.scrollIntoView({ index: next, behavior: "auto" });
            return next;
          });
          break;

        case "k": // Previous
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = Math.max(prev - 1, 0);
            virtuosoRef.current?.scrollIntoView({ index: next, behavior: "auto" });
            return next;
          });
          break;

        case "x": // Select
          e.preventDefault();
          if (focusedIndex >= 0 && emails[focusedIndex]) {
            handlers.toggleSelection(emails[focusedIndex].id);
          }
          break;

        case "s": // Star
          e.preventDefault();
          if (focusedIndex >= 0 && emails[focusedIndex]) {
            toggleStar(emails[focusedIndex].id);
          }
          break;

        case "Enter": // Open
          e.preventDefault();
          if (focusedIndex >= 0 && emails[focusedIndex]) {
            const basePath = searchQuery ? "search" : activeFolder;
            navigate(`/mail/${basePath}/${emails[focusedIndex].id}${window.location.search}`);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [emails, focusedIndex, activeFolder, searchQuery, navigate, handlers, toggleStar, setFocusedIndex, virtuosoRef]);
};