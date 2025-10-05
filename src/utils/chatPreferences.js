export class ChatPreferences {
  constructor(currentUserId) {
    this.currentUserId = currentUserId;
  }

  prefKey = (peerId) => `chatPrefs:${this.currentUserId}:${peerId}`;

  readPrefs = (peerId) => {
    if (!this.currentUserId || !peerId) return {};
    try {
      const raw = localStorage.getItem(this.prefKey(peerId));
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  writePrefs = (updates, peerId) => {
    if (!this.currentUserId || !peerId) return {};
    const current = this.readPrefs(peerId);
    const next = { ...current, ...updates };
    try { 
      localStorage.setItem(this.prefKey(peerId), JSON.stringify(next)); 
    } catch {}
    return next;
  };

  // Mute helpers
  isThreadMuted = (peerId) => {
    const p = this.readPrefs(peerId);
    return !!p.muted;
  };

  toggleMute = (peerId) => {
    const p = this.readPrefs(peerId);
    const next = !p.muted;
    this.writePrefs({ muted: next }, peerId);
    return next;
  };

  // Draft helpers
  getDraftForThread = (peerId) => {
    const p = this.readPrefs(peerId);
    return p.draft || "";
  };

  setDraftForThread = (value, peerId) => {
    this.writePrefs({ draft: value || "" }, peerId);
  };

  // Read/scroll helpers
  setLastReadForThread = (opts = {}, peerId) => {
    this.writePrefs({ 
      lastReadAt: opts.lastReadAt || new Date().toISOString(), 
      lastScrollTop: opts.lastScrollTop ?? 0 
    }, peerId);
  };

  // Pin helpers
  getPinnedMessageForThread = (peerId) => {
    const p = this.readPrefs(peerId);
    return p.pinnedMessageId || null;
  };

  setPinnedMessageForThread = (messageId = null, peerId) => {
    this.writePrefs({ pinnedMessageId: messageId }, peerId);
  };

  // Block helpers
  isThreadBlocked = (peerId) => {
    const p = this.readPrefs(peerId);
    return !!p.blocked;
  };

  toggleBlockThread = (peerId) => {
    const p = this.readPrefs(peerId);
    const next = !p.blocked;
    this.writePrefs({ blocked: next }, peerId);
    return next;
  };
}
