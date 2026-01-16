import { useState, useMemo, useRef, useEffect } from "react";
import { type VirtuosoHandle } from "react-virtuoso";
import { useEmailStore } from "../store/useEmailStore"; 
import { useSettingsStore } from "../store/useSettingsStore";
import { useSearchStore } from "../store/useSearchStore";

export const useInboxLogic = (activeLabel: string) => {
  const [page, setPage] = useState(1);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const { density, itemsPerPage, sortBy } = useSettingsStore();
  const { query } = useSearchStore();
  
  const { emails } = useEmailStore(); 

  const filteredEmails = useMemo(() => {
    let data = emails;

    if (activeLabel === "starred") {
      data = data.filter((email) => email.isStarred);
    } else {
      data = data.filter((email) => email.label === activeLabel);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      data = data.filter((email) =>
        email.subject.toLowerCase().includes(lowerQuery) ||
        email.sender.toLowerCase().includes(lowerQuery) ||
        email.body.toLowerCase().includes(lowerQuery)
      );
    }

    return data;
  }, [query, activeLabel, emails]); 

  const sortedEmails = useMemo(() => {
    const sorted = [...filteredEmails];
    switch (sortBy) {
      case 'date-desc': 
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'date-asc': 
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'unread': 
        return sorted.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
      case 'starred': 
        return sorted.sort((a, b) => (a.isStarred === b.isStarred ? 0 : b.isStarred ? 1 : -1));
      default:
        return sorted;
    }
  }, [filteredEmails, sortBy]);

  const [prevItemsPerPage, setPrevItemsPerPage] = useState(itemsPerPage);
  const [prevQuery, setPrevQuery] = useState(query);
  const [prevSort, setPrevSort] = useState(sortBy);
  const [prevLabel, setPrevLabel] = useState(activeLabel);

  if (itemsPerPage !== prevItemsPerPage || query !== prevQuery || sortBy !== prevSort || activeLabel !== prevLabel) {
    setPrevItemsPerPage(itemsPerPage);
    setPrevQuery(query);
    setPrevSort(sortBy);
    setPrevLabel(activeLabel);
    setPage(1);
  }

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
  }, [page, activeLabel]);

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
      activeLabel
    },
    virtuosoRef,
    handlers,
  };
};