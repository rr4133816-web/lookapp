import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Search as SearchField } from "@/components/ui/search";
import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const ATTACHMENT_TYPES = [
  { value: "image", label: "Photo", icon: ImageIcon },
  { value: "document", label: "Document", icon: FileText },
] as const;

type AttachmentType = (typeof ATTACHMENT_TYPES)[number]["value"];

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ProMessages() {
  const { conversations, sendMessage, markConversationRead } = useApp();
  const [activeId, setActiveId] = useState(conversations[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [attachment, setAttachment] = useState<AttachmentType | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = useMemo(
    () => conversations.find((conversation) => conversation.id === activeId),
    [conversations, activeId],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return conversations;
    return conversations.filter(
      (conversation) =>
        conversation.participantName.toLowerCase().includes(term) ||
        conversation.lastMessage.toLowerCase().includes(term),
    );
  }, [conversations, query]);

  useEffect(() => {
    if (activeId) markConversationRead(activeId);
  }, [activeId, markConversationRead]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-scroll to the latest message when the active thread or its message count changes
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [activeId, active?.messages.length, typing]);

  // Simulated "client is typing" indicator, reset whenever the thread changes.
  useEffect(() => {
    if (!activeId) return;
    setTyping(false);
    const start = window.setTimeout(() => setTyping(true), 1200);
    const stop = window.setTimeout(() => setTyping(false), 4200);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [activeId]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !activeId) return;
    setDraft("");
    setAttachment(null);
    setAttachOpen(false);
    sendMessage(activeId, text);
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Messages
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Client conversations
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Answer questions, share preparation notes and keep every booking on
          track.
        </p>
      </header>

      <div className="grid gap-4 overflow-hidden rounded-[calc(var(--radius)+4px)] border border-border/60 bg-card shadow-elevated lg:grid-cols-[320px_1fr] lg:gap-0">
        <div className="border-border/60 lg:border-r">
          <div className="border-b border-border/60 p-4">
            <SearchField
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search clients"
              aria-label="Search conversations"
              data-ocid="pro_messages.search_input"
            />
          </div>
          <ul className="max-h-[420px] overflow-y-auto lg:max-h-[560px]">
            {filtered.map((conversation) => {
              const isActive = conversation.id === activeId;
              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(conversation.id)}
                    aria-current={isActive}
                    data-ocid={`pro_messages.conversation.${filtered.indexOf(conversation) + 1}`}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-smooth",
                      isActive ? "bg-primary-soft" : "hover:bg-muted/60",
                    )}
                  >
                    <Avatar
                      src={conversation.participantAvatar}
                      name={conversation.participantName}
                      size="md"
                      online={conversation.online}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {conversation.participantName}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread > 0 ? (
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] font-semibold text-accent-foreground">
                        {conversation.unread}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {active ? (
          <div className="flex min-h-[420px] flex-col lg:min-h-[560px]">
            <div className="flex items-center gap-3 border-b border-border/60 p-4">
              <Avatar
                src={active.participantAvatar}
                name={active.participantName}
                size="md"
                online={active.online}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {active.participantName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {active.online ? "Online now" : "Customer"}
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4"
              data-ocid="pro_messages.thread"
            >
              {active.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "me" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 shadow-xs",
                      message.sender === "me"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm border border-border/60 bg-card",
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={cn(
                        "mt-1 font-mono text-[10px]",
                        message.sender === "me"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {typing ? (
                <div
                  className="flex justify-start"
                  data-ocid="pro_messages.typing_indicator"
                >
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border/60 bg-card px-4 py-3 shadow-xs">
                    <span className="sr-only">
                      {active.participantName} is typing
                    </span>
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: dot * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <form onSubmit={submit} className="border-t border-border/60 p-4">
              {attachment ? (
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary"
                    data-ocid="pro_messages.attachment_chip"
                  >
                    {attachment === "image" ? (
                      <ImageIcon className="size-3.5" />
                    ) : (
                      <FileText className="size-3.5" />
                    )}
                    {attachment === "image" ? "photo.jpg" : "document.pdf"}
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      onClick={() => setAttachment(null)}
                      className="transition-smooth hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                </div>
              ) : null}

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Attach a file"
                    aria-expanded={attachOpen}
                    onClick={() => setAttachOpen((open) => !open)}
                    data-ocid="pro_messages.attach_button"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  {attachOpen ? (
                    <div
                      className="absolute bottom-12 left-0 z-10 w-44 overflow-hidden rounded-[var(--radius)] border border-border/60 bg-card p-1 shadow-elevated"
                      data-ocid="pro_messages.attachment_menu"
                    >
                      {ATTACHMENT_TYPES.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setAttachment(option.value);
                            setAttachOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-smooth hover:bg-muted"
                        >
                          <option.icon className="size-4 text-muted-foreground" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <label className="sr-only" htmlFor="pro-message-draft">
                  Write a message
                </label>
                <Input
                  id="pro-message-draft"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={`Reply to ${active.participantName.split(" ")[0]}…`}
                  data-ocid="pro_messages.input"
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Send message"
                  disabled={!draft.trim()}
                  data-ocid="pro_messages.send_button"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <EmptyState
              icon={MessageSquare}
              title="No conversation selected"
              description="Choose a client from the list to read and reply."
            />
          </div>
        )}
      </div>
    </div>
  );
}
