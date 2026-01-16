import { useState, useMemo, useRef, useEffect } from "react";
import { type VirtuosoHandle } from "react-virtuoso";
import { hugeEmails } from "../data/generateEmails";
import { useSettingsStore } from "../store/useSettingsStore";
import { useSearchStore } from "../store/useSearchStore";

export const useInboxLogic = () => {
  const [page, setPage] = useState(1);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const { density, itemsPerPage, sortBy } = useSettingsStore();
  const { query } = useSearchStore();

  // 1. Filter Data
  const filteredEmails = useMemo(() => {
    if (!query) return hugeEmails;

    const lowerQuery = query.toLowerCase();
    return hugeEmails.filter((email) =>
      email.subject.toLowerCase().includes(lowerQuery) ||
      email.sender.toLowerCase().includes(lowerQuery) ||
      email.body.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  // 2. Sort Data (The New Feature)
  const sortedEmails = useMemo(() => {
    const sorted = [...filteredEmails];
    switch (sortBy) {
      case 'date-desc': // Newest First
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'date-asc': // Oldest First
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'unread': 
        return sorted.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
      case 'starred': 
        return sorted.sort((a, b) => (a.isStarred === b.isStarred ? 0 : b.isStarred ? 1 : -1));
      default:
        return sorted;
    }
  }, [filteredEmails, sortBy]);

  // 3. Reset Page on Change
  const [prevItemsPerPage, setPrevItemsPerPage] = useState(itemsPerPage);
  const [prevQuery, setPrevQuery] = useState(query);
  const [prevSort, setPrevSort] = useState(sortBy);

  if (itemsPerPage !== prevItemsPerPage || query !== prevQuery || sortBy !== prevSort) {
    setPrevItemsPerPage(itemsPerPage);
    setPrevQuery(query);
    setPrevSort(sortBy);
    setPage(1);
  }

  // 4. Pagination
  const itemHeight = density === "comfortable" ? 72 : 48;
  const totalItems = sortedEmails.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedEmails.slice(start, end);
  }, [page, itemsPerPage, sortedEmails]);

  useEffect(() => {
    virtuosoRef.current?.scrollTo({ top: 0 });
  }, [page]);

  const handlers = {
    handleNext: () => setPage((p) => Math.min(p + 1, totalPages)),
    handlePrev: () => setPage((p) => Math.max(p - 1, 1)),
  };

  return {
    state: {
      page,
      totalPages,
      totalItems,
      currentData,
      itemHeight,
      query,
      sortBy,
    },
    virtuosoRef, // Expose directly to fix ESLint error
    handlers,
  };
};