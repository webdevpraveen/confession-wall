import { useState } from "react";
import { Confession } from "@/types/confession";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";

interface ConfessionModalProps {
  confession: Confession | null;
  isOpen: boolean;
  onClose: () => void;
  onReact: (confessionId: string, emoji: string) => void;
  onComment: (confessionId: string, text: string) => void;
}

const colorClasses = {
  yellow: "sticky-yellow",
  pink: "sticky-pink",
  blue: "sticky-blue",
  green: "sticky-green",
  orange: "sticky-orange",
  purple: "sticky-purple",
};

export const ConfessionModal = ({
  confession,
  isOpen,
  onClose,
  onReact,
  onComment,
}: ConfessionModalProps) => {
  const [commentText, setCommentText] = useState("");

  if (!confession) return null;

  const submitComment = () => {
    if (!commentText.trim()) return;
    onComment(confession.id, commentText.trim());
    setCommentText("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "border-none shadow-2xl p-0 overflow-hidden",
          "max-w-lg w-[95vw]",
          colorClasses[confession.color]
        )}
      >
        <DialogHeader className="sr-only" />

        {/* Content */}
        <div className="p-6">
          <p className="font-handwriting text-2xl leading-relaxed text-foreground/90">
            {confession.text}
          </p>
        </div>

        {/* Reactions */}
        <div className="px-6 py-4 border-t border-foreground/10 flex flex-wrap gap-2">
          {confession.reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => onReact(confession.id, reaction.emoji)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "transition-all duration-200 hover:scale-110 active:scale-95",
                reaction.hasReacted
                  ? "bg-primary/20 ring-2 ring-primary/40"
                  : "bg-foreground/5 hover:bg-foreground/10"
              )}
            >
              <span className="text-lg">{reaction.emoji}</span>
              <span className="text-sm font-medium">
                {reaction.count}
              </span>
            </button>
          ))}
        </div>

        {/* Comments */}
        <div className="px-6 py-4 border-t border-foreground/10">
          <h4 className="text-sm font-medium text-foreground/80 mb-3">
            Comments ({confession.comments.length})
          </h4>

          <div className="max-h-40 overflow-y-auto space-y-3 mb-4">
            {confession.comments.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No comments yet.
              </p>
            ) : (
              confession.comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-foreground/5 rounded-lg p-3 animate-fade-in"
                >
                  <p className="text-sm">{c.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Add comment */}
          <div className="flex gap-2">
            <Textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add an anonymous comment…"
              className="min-h-[60px] bg-foreground/5 resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submitComment();
                }
              }}
            />
            <Button
              onClick={submitComment}
              disabled={!commentText.trim()}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
