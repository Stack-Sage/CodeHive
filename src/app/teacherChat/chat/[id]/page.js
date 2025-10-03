'use client'
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useChat } from "@/context/chat.context";
import { useGlobalContext } from "@/context/global.context";
import { showInfo, showSuccess } from "@/ui/toast";
import ThreadChips from "@/components/chat/ThreadChips";
import Composer from "@/components/chat/Composer";
import ConversationList from "@/components/chat/ConversationList";
import ThreadHeader from "@/components/chat/ThreadHeader";
import AttachmentUploader from "@/components/chat/AttachmentUploader";

export default function TeacherChatPage() {
  const { id: peerId } = useParams();
  const router = useRouter();
  const { isStuLogin, user } = useGlobalContext();
  const {
    conversations,
    activePeerId,
    activePeer,
    openThread,
    hasMore,
    loadMore,
    messages,
    send,
    retrySend,
    edit,
    remove,
    markActiveThreadAsRead,
    currentUserId,
    isSending,
    search,
    isThreadMuted,
    toggleMute,
    getDraftForThread,
    setDraftForThread,
    setLastReadForThread,
    getMessageMeta,
  } = useChat();

  // Guard: teacher only
  useEffect(() => {
    if (isStuLogin === true || isStuLogin === "true" || !user?._id) {
      router.replace("/teacherChat/auth/login");
    }
  }, [isStuLogin, user, router]);

  // Open thread and mark as read
  useEffect(() => {
    if (!peerId || !user?._id) return;
    openThread(peerId).then(() => markActiveThreadAsRead());
  }, [peerId, user, openThread, markActiveThreadAsRead]);

  // Scroll flags, chips, last-read persistence
  const threadRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showNewChip, setShowNewChip] = useState(false);
  const [showJump, setShowJump] = useState(false);

  useEffect(() => {
    const c = threadRef.current;
    if (!c) return;
    const onScroll = () => {
      const atBottom = c.scrollTop + c.clientHeight >= c.scrollHeight - 20;
      setIsAtBottom(atBottom);
      setShowJump(!atBottom && c.scrollHeight - (c.scrollTop + c.clientHeight) > 600);
      if (atBottom) setShowNewChip(false);
      // persist last scroll
      setLastReadForThread({ lastScrollTop: c.scrollTop });
    };
    c.addEventListener("scroll", onScroll);
    return () => c.removeEventListener("scroll", onScroll);
  }, [setLastReadForThread]);

  useEffect(() => {
    const c = threadRef.current;
    if (!c) return;
    if (isAtBottom) {
      c.scrollTop = c.scrollHeight;
      setShowNewChip(false);
    } else {
      setShowNewChip(true);
    }
  }, [messages.length, isAtBottom]);

  const scrollToBottom = () => {
    const c = threadRef.current;
    if (!c) return;
    c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
    setShowNewChip(false);
  };

  // Draft persistence via prefs
  const [text, setText] = useState("");
  useEffect(() => {
    setText(getDraftForThread() || "");
  }, [getDraftForThread, activePeerId]);
  useEffect(() => {
    setDraftForThread(text || "");
  }, [text, setDraftForThread]);

  const onSend = async () => {
    const t = text.trim();
    if (!t) { showInfo("Type a message"); return; }
    await send({ text: t });
    setText("");
    setDraftForThread("");
  };

  // Search state/results
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const doSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return setResults([]);
    const res = await search(q);
    setResults(res);
  };
  const clearSearch = () => { setQuery(""); setResults([]); };
  const jumpTo = (id) => {
    const el = document.getElementById(`msg-${id}`);
    if (el && threadRef.current) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.classList.add("ring-2", "ring-emerald-400");
      setTimeout(() => el.classList.remove("ring-2", "ring-emerald-400"), 800);
    }
  };

  // First unread
  const firstUnreadId = useMemo(() => {
    const me = String(currentUserId || "");
    const m = (messages || []).find(msg => {
      if (msg.read === true) return false;
      const toStu = msg.toStudent && String(msg.toStudent?._id || msg.toStudent) === me;
      const toTeach = msg.toTeacher && String(msg.toTeacher?._id || msg.toTeacher) === me;
      return toStu || toTeach;
    });
    return m?._id;
  }, [messages, currentUserId]);

  // Helpers: date label + highlight
  const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const formatDateLabel = (d) => {
    const today = new Date(); const y = new Date(); y.setDate(today.getDate() - 1);
    if (isSameDay(d, today)) return "Today";
    if (isSameDay(d, y)) return "Yesterday";
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  };
  const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const highlightText = (text, q) => {
    if (!q || !text) return text;
    const re = new RegExp(`(${escapeRegExp(q)})`, "ig");
    return String(text).split(re).map((part, i) =>
      re.test(part) ? <mark key={i} className="bg-yellow-200 rounded px-0.5">{part}</mark> : <span key={i}>{part}</span>
    );
  };

  // Windowed render for long threads (show last 200)
  const windowedItems = useMemo(() => {
    const list = messages || [];
    const start = Math.max(0, list.length - 200);
    const slice = list.slice(start);
    const items = [];
    let lastKey = "";
    slice.forEach(m => {
      const d = new Date(m.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (key !== lastKey) { items.push({ type: "sep", key, label: formatDateLabel(d) }); lastKey = key; }
      items.push({ type: "msg", data: m });
    });
    return items;
  }, [messages]);

  const onEdit = async (m) => {
    const val = window.prompt("Edit your message", m.message || ""); if (val === null) return;
    const trimmed = val.trim(); if (!trimmed) return;
    await edit(m._id, trimmed); showSuccess("Message updated");
  };
  const onDelete = async (m) => {
    if (!window.confirm("Delete this message?")) return;
    await remove(m._id); showSuccess("Message deleted");
  };

  const [mobileTab, setMobileTab] = useState("chat"); // "chat" | "conversations"

  return (
    // Desktop shows both panes side-by-side; tabs control only on small screens
    <div className="flex h-screen">
      {/* Mobile tabs */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b">
        <div className="px-4 py-2 flex gap-2">
          <button
            onClick={() => setMobileTab("chat")}
            className={`px-3 py-1.5 rounded-md border text-sm ${mobileTab === "chat" ? "bg-emerald-600 text-white border-emerald-600" : "hover:bg-gray-50"}`}
          >
            Chat
          </button>
          <button
            onClick={() => setMobileTab("conversations")}
            className={`px-3 py-1.5 rounded-md border text-sm ${mobileTab === "conversations" ? "bg-emerald-600 text-white border-emerald-600" : "hover:bg-gray-50"}`}
          >
            Conversations
          </button>
        </div>
      </div>

      {/* Sidebar: always visible on md+; uses tab on small */}
      <aside
        className={`
          transition-all duration-200 border-r overflow-y-auto shrink-0
          ${mobileTab === "conversations" ? "block w-full pt-12" : "hidden"}
          md:block md:w-80 md:pt-0
        `}
      >
        <div className="px-4 py-3 border-b font-semibold hidden md:block">
          Conversations
        </div>
        {/* Full list when expanded or on mobile tab */}
        <div className={`${mobileTab === "conversations" ? "block" : "hidden"} md:block`}>
          <div className="hidden md:block px-4 py-2" />
          <ConversationList
            conversations={conversations}
            activePeerId={activePeerId}
            onSelect={(partnerId) => router.push(`/teacherChat/chat/${partnerId}`)}
          />
        </div>
      </aside>

      {/* Thread */}
      <main
        className={`
          min-w-0 flex-1 flex flex-col
          ${mobileTab === "chat" ? "block pt-12" : "hidden"}
          md:block md:pt-0
        `}
      >
        {/* Header with search/mute stays as-is */}
        <ThreadHeader
          partner={activePeer}
          muted={isThreadMuted()}
          onToggleMute={() => toggleMute()}
          right={(
            <form onSubmit={doSearch} className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search in chat..."
                className="h-9 px-3 rounded-md border outline-none w-40 sm:w-64"
              />
              <button type="submit" className="h-9 px-3 rounded-md border hover:bg-gray-50 text-sm">Search</button>
              <button
                type="button"
                onClick={clearSearch}
                disabled={!query && results.length === 0}
                className={`h-9 px-3 rounded-md text-sm border ${(!query && results.length === 0) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => firstUnreadId && jumpTo(firstUnreadId)}
                disabled={!firstUnreadId}
                className={`h-9 px-3 rounded-md text-sm border ${!firstUnreadId ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                title="Jump to first unread"
              >
                Unread
              </button>
            </form>
          )}
        />
        {results.length > 0 && (
          <div className="px-4 mt-2 max-h-40 overflow-auto border rounded-lg">
            {results.map((m) => (
              <div key={m._id} onClick={() => jumpTo(m._id)} className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                <div className="text-gray-700 truncate">{highlightText(m.message || "[attachment]", query)}</div>
                <div className="text-[11px] text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}

        {/* Thread area with chips */}
        <div ref={threadRef} className="relative flex-1 min-h-0 overflow-y-auto p-4 bg-gray-50">
          <ThreadChips
            showNew={!isThreadMuted() && showNewChip}
            onClickNew={scrollToBottom}
            showJump={showJump}
            onClickJump={scrollToBottom}
          />

          {hasMore && (
            <div className="text-center mb-3">
              <button onClick={loadMore} className="text-sm text-emerald-700 hover:text-emerald-800 hover:underline">
                Load older messages
              </button>
            </div>
          )}

          {windowedItems.map((it) => {
            if (it.type === "sep") {
              return (
                <div key={`sep-${it.key}`} className="flex justify-center my-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{it.label}</span>
                </div>
              );
            }
            const m = it.data;
            const meta = getMessageMeta(m);
            const mine = meta.isMine;
            const optimistic = !!m.__optimistic;
            const failed = !!m.__failed;

            return (
              <div id={`msg-${m._id}`} key={m._id} className={`flex mb-3 ${mine ? "justify-end" : "justify-start"} transition-all`}>
                <div className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Avatar */}
                  <img
                    src={meta.senderAvatar}
                    alt={meta.senderName}
                    className="w-8 h-8 rounded-full object-cover border shadow-sm"
                  />
                  {/* Bubble */}
                  <div
                    className={`group rounded-2xl px-3 py-2 shadow-sm hover:shadow-md transition ${
                      mine ? "bg-emerald-600 text-white" : "bg-white text-gray-900 border"
                    } max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[55%]`}
                  >
                    {/* Name */}
                    <div className={`text-xs mb-1 ${mine ? "text-white/90" : "text-gray-700 font-medium"}`}>{meta.senderName}</div>

                    {/* Text */}
                    {m.message && <div className="whitespace-pre-wrap break-words leading-relaxed">{m.message}</div>}

                    {/* Attachment */}
                    {m.fileUrl && (
                      <div className="mt-2">
                        <a
                          href={m.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`${mine ? "text-white underline" : "text-emerald-700 underline hover:text-emerald-800"}`}
                        >
                          View attachment
                        </a>
                      </div>
                    )}

                    {/* Meta row */}
                    <div className={`text-[11px] opacity-80 mt-1 flex items-center justify-end gap-2 ${mine ? "text-white/90" : "text-gray-500"}`}>
                      <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                      {!optimistic && mine && (
                        <span className={`${m.read ? (mine ? "text-white/90" : "text-emerald-600") : (mine ? "text-white/70" : "text-gray-400")}`}>{m.read ? "✓✓" : "✓"}</span>
                      )}
                      {optimistic && !failed && <span className="italic opacity-80">Sending…</span>}
                      {failed && (
                        <button onClick={() => retrySend(m._id)} className="text-[11px] underline decoration-red-400 text-red-200 hover:text-white" title="Retry send">
                          Failed. Retry
                        </button>
                      )}
                    </div>

                    {/* Actions: always rendered, disabled during optimistic */}
                    <div className={`mt-1 flex gap-2 justify-end text-[11px] ${optimistic ? "opacity-50 pointer-events-none" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                      <button onClick={() => onEdit(m)} className="underline hover:opacity-80">Edit</button>
                      <button onClick={() => onDelete(m)} className="underline text-red-600 hover:text-red-700">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Attachment uploader and composer */}
        <AttachmentUploader onPick={(url, type) => send({ fileUrl: url, fileType: type })} />
        <Composer value={text} onChange={(e) => setText(e.target.value)} onSend={onSend} isSending={isSending} />
      </main>
    </div>
  );
}