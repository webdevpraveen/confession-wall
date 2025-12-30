import { Confession } from "@/types/confession";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  confession: Confession;
  onClick: () => void;
}

const colorClasses = {
  yellow: "sticky-yellow",
  pink: "sticky-pink",
  blue: "sticky-blue",
  green: "sticky-green",
  orange: "sticky-orange",
  purple: "sticky-purple",
};

export const StickyNote = ({ confession, onClick }: StickyNoteProps) => {
  const totalReactions = confession.reactions.reduce(
    (sum, r) => sum + r.count,
    0
  );

  const topEmojis = confession.reactions
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div
      onClick={onClick}
      className={cn(
        "sticky-note flex flex-col justify-between",
        "transition-all duration-300 cursor-pointer",
        "hover:-translate-y-3 hover:scale-[1.02]",
        "active:scale-[0.99]",
        colorClasses[confession.color]
      )}
      style={{
        transform: `rotate(${confession.rotation}deg)`,
      }}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md z-10" />

      {/* Text */}
      <p className="font-handwriting text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {confession.text}
      </p>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-foreground/10">
        {/* Reactions */}
        <div className="flex items-center gap-1">
          {topEmojis.map((reaction) => (
            <span key={reaction.emoji} className="text-sm">
              {reaction.emoji}
            </span>
          ))}
          {totalReactions > 0 && (
            <span className="text-xs text-muted-foreground ml-1">
              {totalReactions}
            </span>
          )}
        </div>

        {/* Comments count */}
        {confession.comments.length > 0 && (
          <span className="text-xs text-muted-foreground">
            💬 {confession.comments.length}
          </span>
        )}
      </div>

      {/* Fold effect */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-foreground/5 to-transparent" />
    </div>
  );
};
