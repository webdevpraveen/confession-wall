import { useState } from "react";
import { Confession } from "@/types/confession";
import { StickyNote } from "./StickyNote";
import { ConfessionModal } from "./ConfessionModal";

interface ConfessionWallProps {
  confessions: Confession[];
  onReact: (confessionId: string, emoji: string) => void;
  onComment: (confessionId: string, text: string) => void;
}

export const ConfessionWall = ({
  confessions,
  onReact,
  onComment,
}: ConfessionWallProps) => {
  const [activeConfession, setActiveConfession] =
    useState<Confession | null>(null);

  return (
    <>
      {/* Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {confessions.map((confession, index) => (
          <div
            key={confession.id}
            className="animate-pop-in"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <StickyNote
              confession={confession}
              onClick={() => setActiveConfession(confession)}
            />
          </div>
        ))}

        {/* Empty Wall */}
        {confessions.length === 0 && (
          <div className="col-span-full flex justify-center py-20">
            <div
              className="sticky-note sticky-yellow max-w-sm text-center"
              style={{ transform: "rotate(-2deg)" }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-md" />
              <p className="font-handwriting text-xl text-foreground/70 pt-2">
                No confessions here yet.  
                Be the first to pin one 🧷
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ConfessionModal
        confession={activeConfession}
        isOpen={!!activeConfession}
        onClose={() => setActiveConfession(null)}
        onReact={onReact}
        onComment={onComment}
      />
    </>
  );
};
