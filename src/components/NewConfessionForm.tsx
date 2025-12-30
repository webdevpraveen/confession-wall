import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewConfessionFormProps {
  onSubmit: (text: string) => void;
}

export const NewConfessionForm = ({ onSubmit }: NewConfessionFormProps) => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const maxChars = 500;

  const submit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div
      className={cn(
        "sticky-note sticky-yellow mx-auto max-w-md",
        "transition-all duration-300",
        focused && "scale-[1.03] shadow-2xl"
      )}
      style={{ transform: "rotate(-1deg)" }}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md z-10" />

      <div className="space-y-4 pt-2">
        {/* Header */}
        <div className="flex items-center gap-2 text-foreground/70">
          <Sparkles className="h-4 w-4" />
          <span className="font-handwriting text-lg">
            Share your confession…
          </span>
        </div>

        {/* Textarea */}
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxChars))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Write what you can’t say out loud…"
          className={cn(
            "min-h-[120px] bg-transparent border-none resize-none",
            "font-handwriting text-xl leading-relaxed",
            "focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
          <span
            className={cn(
              "text-xs",
              text.length > maxChars * 0.9
                ? "text-destructive"
                : "text-muted-foreground"
            )}
          >
            {text.length}/{maxChars}
          </span>

          <Button
            onClick={submit}
            disabled={!text.trim()}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Post
          </Button>
        </div>
      </div>

      {/* Fold */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-foreground/5 to-transparent" />
    </div>
  );
};
