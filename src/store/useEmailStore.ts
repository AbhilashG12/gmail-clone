import { create } from 'zustand';
import { hugeEmails } from '../data/generateEmails';
import {type Email } from '../data/emails';

interface EmailStore {
  emails: Email[];
  sendEmail: (to: string, subject: string, body: string) => void;
  saveDraft: (to: string, subject: string, body: string) => void;
  updateEmail: (id: string, updates: Partial<Email>) => void;
  moveToTrash: (id: string) => void;
}

export const useEmailStore = create<EmailStore>((set) => ({
  emails: hugeEmails,

  sendEmail: ( subject, body) => set((state) => ({
    emails: [{
      id: Date.now().toString(),
      sender: "Me",
      senderEmail: "me@gmail.clone",
      subject: subject || "(No Subject)",
      body: body || "",
      date: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      label: "sent",
      category: "primary"
    }, ...state.emails]
  })),

  saveDraft: (subject, body) => set((state) => ({
    emails: [{
      id: "draft-" + Date.now().toString(),
      sender: "Draft",
      senderEmail: "me@gmail.clone",
      subject: subject || "(No Subject)",
      body: body || "",
      date: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      label: "drafts",
      category: "primary"
    }, ...state.emails]
  })),


  updateEmail: (id, updates) => set((state) => ({
    emails: state.emails.map(email => 
      email.id === id ? { ...email, ...updates } : email
    )
  })),

  moveToTrash: (id) => set((state) => ({
    emails: state.emails.map(email => 
      email.id === id ? { ...email, label: 'trash' } : email
    )
  })),
}));