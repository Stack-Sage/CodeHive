export const getTextFromMessage = (m) => {
  if (!m) return "";
  const raw =
    typeof m?.message === "string" ? m.message
    : typeof m?.text === "string" ? m.text
    : typeof m?.message?.text === "string" ? m.message.text
    : "";
  return typeof raw === "string" ? raw : String(raw ?? "");
};

export const normalizeMessage = (m) => {
  if (!m || typeof m !== "object") return m;
  return { ...m, message: getTextFromMessage(m) };
};

export const previewFromConversation = (conv) => {
  const raw =
    typeof conv?.lastMessage === "string" ? conv.lastMessage
    : typeof conv?.lastMessage?.text === "string" ? conv.lastMessage.text
    : "";
  return typeof raw === "string" ? raw : String(raw ?? "");
};
