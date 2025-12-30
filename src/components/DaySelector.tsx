import { DayWall } from "@/types/confession";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DaySelectorProps {
  walls: DayWall[];
  selectedDay: number;
  onSelectDay: (index: number) => void;
}

export const DaySelector = ({
  walls,
  selectedDay,
  onSelectDay,
}: DaySelectorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 px-4">
      {/* Left Arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSelectDay(selectedDay + 1)}
        disabled={selectedDay >= walls.length - 1}
        className="shrink-0"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {/* Day Pills */}
      <div className="flex gap-2 overflow-x-auto px-2 py-2 scrollbar-hide max-w-full">
        {walls.map((wall, index) => (
          <button
            key={wall.label}
            onClick={() => onSelectDay(index)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
              "transition-all duration-200 hover:scale-105 active:scale-95",
              index === selectedDay
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-secondary/60 text-secondary-foreground hover:bg-secondary"
            )}
          >
            {wall.label}
            <span className="ml-1.5 text-xs opacity-70">
              ({wall.confessions.length})
            </span>
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onSelectDay(selectedDay - 1)}
        disabled={selectedDay <= 0}
        className="shrink-0"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
