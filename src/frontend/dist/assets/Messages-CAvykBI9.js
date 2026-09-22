import { f as useApp, r as reactExports, j as jsxRuntimeExports, A as Avatar, e as cn, m as motion, X, M as MessageSquare, S as Search$1 } from "./index-Dpq2E7IO.js";
import { B as Button } from "./button-Cfz4lVsS.js";
import { E as EmptyState } from "./empty-state-CDVyvI3T.js";
import { I as Input } from "./input-ndI6bRbf.js";
import { S as Search } from "./search-Gr-DNfPO.js";
import { I as Image, P as Paperclip, S as Send } from "./send-DoR7TpxO.js";
import { F as FileText } from "./file-text-CyPRTlyH.js";
const ATTACHMENT_TYPES = [
  { value: "image", label: "Photo", icon: Image },
  { value: "document", label: "Document", icon: FileText }
];
function formatTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}
function formatDay(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const today = /* @__PURE__ */ new Date();
  const isToday = date.toDateString() === today.toDateString();
  if (isToday) return "Today";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function Messages() {
  var _a;
  const { conversations, sendMessage, markConversationRead } = useApp();
  const [activeId, setActiveId] = reactExports.useState(((_a = conversations[0]) == null ? void 0 : _a.id) ?? "");
  const [query, setQuery] = reactExports.useState("");
  const [draft, setDraft] = reactExports.useState("");
  const [typing, setTyping] = reactExports.useState(false);
  const [attachOpen, setAttachOpen] = reactExports.useState(false);
  const [attachment, setAttachment] = reactExports.useState(null);
  const scrollRef = reactExports.useRef(null);
  const active = reactExports.useMemo(
    () => conversations.find((conversation) => conversation.id === activeId),
    [conversations, activeId]
  );
  const filtered = reactExports.useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return conversations;
    return conversations.filter(
      (conversation) => conversation.participantName.toLowerCase().includes(term) || conversation.lastMessage.toLowerCase().includes(term)
    );
  }, [conversations, query]);
  reactExports.useEffect(() => {
    if (activeId) markConversationRead(activeId);
  }, [activeId, markConversationRead]);
  reactExports.useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [activeId, active == null ? void 0 : active.messages.length, typing]);
  reactExports.useEffect(() => {
    if (!activeId) return;
    setTyping(false);
    const start = window.setTimeout(() => setTyping(true), 1200);
    const stop = window.setTimeout(() => setTyping(false), 4200);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [activeId]);
  const submit = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !activeId) return;
    setDraft("");
    setAttachment(null);
    setAttachOpen(false);
    sendMessage(activeId, text);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Messages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl", children: "Conversations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "Keep every detail of a booking in one thread, before and after the session." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated lg:grid-cols-[320px_1fr] lg:gap-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-border/60 lg:border-r", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border/60 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            value: query,
            onChange: (event) => setQuery(event.target.value),
            onClear: () => setQuery(""),
            placeholder: "Search conversations",
            "aria-label": "Search conversations",
            "data-ocid": "messages.search_input"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-[420px] overflow-y-auto lg:max-h-[560px]", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "p-6 text-center text-sm text-muted-foreground", children: "No conversations match that search." }) : filtered.map((conversation) => {
          const isActive = conversation.id === activeId;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveId(conversation.id),
              "aria-current": isActive,
              "data-ocid": `messages.conversation.${filtered.indexOf(conversation) + 1}`,
              className: cn(
                "flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-smooth",
                isActive ? "bg-primary-soft" : "hover:bg-muted/60"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    src: conversation.participantAvatar,
                    name: conversation.participantName,
                    size: "md",
                    online: conversation.online
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: conversation.participantName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-[10px] text-muted-foreground", children: formatDay(conversation.lastMessageAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: conversation.participantRole }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-1 text-xs text-muted-foreground", children: conversation.lastMessage })
                ] }),
                conversation.unread > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] font-semibold text-accent-foreground", children: conversation.unread }) : null
              ]
            }
          ) }, conversation.id);
        }) })
      ] }),
      active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[420px] flex-col lg:min-h-[560px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-border/60 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Avatar,
            {
              src: active.participantAvatar,
              name: active.participantName,
              size: "md",
              online: active.online
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: active.participantName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: active.online ? "Online now" : active.participantRole })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: scrollRef,
            className: "flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4",
            "data-ocid": "messages.thread",
            children: [
              active.messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.25 },
                  className: cn(
                    "flex",
                    message.sender === "me" ? "justify-end" : "justify-start"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs",
                        message.sender === "me" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm border border-border/60 bg-card"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: message.text }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: cn(
                              "mt-1 font-mono text-[10px]",
                              message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                            ),
                            children: formatTime(message.timestamp)
                          }
                        )
                      ]
                    }
                  )
                },
                message.id
              )),
              typing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex justify-start",
                  "data-ocid": "messages.typing_indicator",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border/60 bg-card px-4 py-3 shadow-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only", children: [
                      active.participantName,
                      " is typing"
                    ] }),
                    [0, 1, 2].map((dot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        className: "size-1.5 rounded-full bg-muted-foreground",
                        animate: { opacity: [0.3, 1, 0.3], y: [0, -2, 0] },
                        transition: {
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: dot * 0.15,
                          ease: "easeInOut"
                        }
                      },
                      dot
                    ))
                  ] })
                }
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "border-t border-border/60 p-4", children: [
          attachment ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary",
              "data-ocid": "messages.attachment_chip",
              children: [
                attachment === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5" }),
                attachment === "image" ? "photo.jpg" : "document.pdf",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Remove attachment",
                    onClick: () => setAttachment(null),
                    className: "transition-smooth hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
                  }
                )
              ]
            }
          ) }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Attach a file",
                  "aria-expanded": attachOpen,
                  onClick: () => setAttachOpen((open) => !open),
                  "data-ocid": "messages.attach_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "size-4" })
                }
              ),
              attachOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-12 left-0 z-10 w-44 overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card p-1 shadow-elevated",
                  "data-ocid": "messages.attachment_menu",
                  children: ATTACHMENT_TYPES.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setAttachment(option.value);
                        setAttachOpen(false);
                      },
                      className: "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-smooth hover:bg-muted",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(option.icon, { className: "size-4 text-muted-foreground" }),
                        option.label
                      ]
                    },
                    option.value
                  ))
                }
              ) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "sr-only", htmlFor: "message-draft", children: "Write a message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "message-draft",
                value: draft,
                onChange: (event) => setDraft(event.target.value),
                placeholder: `Message ${active.participantName.split(" ")[0]}…`,
                "data-ocid": "messages.input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                size: "icon",
                "aria-label": "Send message",
                disabled: !draft.trim(),
                "data-ocid": "messages.send_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
              }
            )
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: MessageSquare,
          title: "No conversation selected",
          description: "Choose a conversation from the list to read and reply."
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search$1, { className: "size-3.5" }),
      "Messages are stored locally for this demonstration."
    ] })
  ] });
}
export {
  Messages as default
};
