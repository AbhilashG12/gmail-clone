import { useState, useRef, useEffect } from "react";
import { useSearchStore } from "../store/useSearchStore";

export const useSearchLogic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localTerm, setLocalTerm] = useState(""); 
  
  const setGlobalQuery = useSearchStore(state => state.setQuery); 
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalQuery(localTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [localTerm, setGlobalQuery]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!localTerm) setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [localTerm]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handlers = {
    open: () => setIsOpen(true),

    close: () => { 
        setIsOpen(false);
        setLocalTerm("");
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocalTerm(e.target.value),
    clearSearch: () => {
        setLocalTerm("");
        inputRef.current?.focus();
    }
  };

  return {
    isOpen,
    searchTerm: localTerm,
    containerRef,
    inputRef,
    handlers
  };
};