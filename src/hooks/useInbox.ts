import { useState, useMemo, useRef } from "react";
import { type VirtuosoHandle } from "react-virtuoso";
import { useParams, useSearchParams } from "react-router-dom";
import { useEmailStore } from "../store/useEmailStore"; 
import { useSettingsStore } from "../store/useSettingsStore";

const CATEGORIES = ["primary", "social", "promotions", "updates"];

export const useInboxLogic = () => {
  const { folder } = useParams<{ folder: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [page, setPage] = useState(1);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { density, itemsPerPage, sortBy } = useSettingsStore();
  const { emails } = useEmailStore();

  const activeLabel = folder || "inbox";
  const isSearchMode = window.location.pathname.includes("/search");

  const filteredEmails = useMemo(() => {
    let data = emails;

    if (isSearchMode && query) {
       const lowerQuery = query.toLowerCase();
       data = data.filter((email) =>
        email.subject.toLowerCase().includes(lowerQuery) ||
        email.sender.toLowerCase().includes(lowerQuery) ||
        email.body.toLowerCase().includes(lowerQuery)
      );
    } else {
       if (activeLabel === "starred") {
         data = data.filter((email) => email.isStarred);
       } 
       else if (CATEGORIES.includes(activeLabel)) {
         data = data.filter((email) => email.category === activeLabel);
       }
       else {
         data = data.filter((email) => email.label === activeLabel);
       }
    }
    return data;
  }, [query, activeLabel, emails, isSearchMode]);

  const sortedEmails = useMemo(() => {
    const sorted = [...filteredEmails];
    switch (sortBy) {
        case 'date-desc': return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'date-asc': return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'unread': return sorted.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
        case 'starred': return sorted.sort((a, b) => (a.isStarred === b.isStarred ? 0 : b.isStarred ? 1 : -1));
        default: return sorted;
    }
  }, [filteredEmails, sortBy]);

  const itemHeight = density === "comfortable" ? 72 : 48;
  const totalItems = sortedEmails.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedEmails.slice(start, end);
  }, [page, itemsPerPage, sortedEmails]);

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAllPage = () => {
    const allSelected = currentData.length > 0 && currentData.every(e => selectedIds.has(e.id));
    const newSet = new Set(selectedIds);
    currentData.forEach(e => {
        if (allSelected) newSet.delete(e.id);
        else newSet.add(e.id);
    });
    setSelectedIds(newSet);
  };
  
  const clearSelection = () => setSelectedIds(new Set());

  const handlers = {
    handleNext: () => setPage((p) => Math.min(p + 1, totalPages)),
    handlePrev: () => setPage((p) => Math.max(p - 1, 1)),
    toggleSelection,
    toggleAllPage,
    clearSelection
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
      selectedIds,
      activeFolder: isSearchMode ? "Search Results" : activeLabel,
      searchQuery: query
    },
    virtuosoRef,
    handlers,
  };
};