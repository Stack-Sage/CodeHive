import { useMemo } from 'react';

export const useActivePeer = (activePeerId, conversations, messages, role, visitedUser) => {
  return useMemo(() => {
    if (!activePeerId) return null;

    // 1) Try conversations (fast path)
    const c =
      (conversations || []).find(x => {
        const partnerId = x?.partner?._id || x?.partner?.id || x?.partner?.userId;
        return String(partnerId || "") === String(activePeerId);
      }) ||
      (conversations || []).find(x => String(x._id) === String(activePeerId)); // fallback

    if (c?.partner) {
      return { ...c.partner, conversationId: c._id };
    }

    // 2) Derive from populated messages if conversations not ready
    const deriveFromMessages = () => {
      if (!Array.isArray(messages) || messages.length === 0) return null;

      for (const m of messages) {
        if (role === "Student") {
          const t =
            (m.fromTeacher && typeof m.fromTeacher === "object" && m.fromTeacher) ||
            (m.toTeacher && typeof m.toTeacher === "object" && m.toTeacher) ||
            null;
          if (t && t._id) return t;
        } else {
          const s =
            (m.fromStudent && typeof m.fromStudent === "object" && m.fromStudent) ||
            (m.toStudent && typeof m.toStudent === "object" && m.toStudent) ||
            null;
          if (s && s._id) return s;
        }
      }
      return null;
    };

    const derived = deriveFromMessages();
    if (derived) return derived;

    // 3) FINAL FALLBACK: use visitedUser if it matches the route peerId
    if (visitedUser && String(visitedUser._id) === String(activePeerId)) {
      return {
        _id: String(visitedUser._id),
        fullname: visitedUser.fullname || visitedUser.username || undefined,
        username: visitedUser.username,
        email: visitedUser.email,
        avatar: visitedUser.avatar,
        role: visitedUser.role,
      };
    }

    return null;
  }, [conversations, activePeerId, messages, role, visitedUser]);
};
