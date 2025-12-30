import { useState } from "react";
import { Confession, DayWall } from "@/types/confession";

// ---------- HELPERS ----------
const generateId = () => Math.random().toString(36).slice(2);

const days = ["Today", "Yesterday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const colors = ["yellow", "pink", "blue", "green", "orange", "purple"] as const;

const sampleTexts = [
  "I pretend I'm confident but I'm not.",
  "College life looks fun online but feels lonely sometimes.",
  "I overthink everything at night.",
  "I act chill but I care a lot.",
  "I wish I could restart some days.",
  "I miss old me.",
  "I smile but feel empty.",
  "I hate this subject secretly.",
  "I wish someone understood me without explaining.",
];

// ---------- INITIAL DATA ----------
const createInitialWalls = (): DayWall[] =>
  days.map((label, dayIndex) => ({
    label,
    date: new Date(Date.now() - dayIndex * 86400000),
    confessions: Array.from({ length: dayIndex === 0 ? 6 : 9 }).map(() => ({
      id: generateId(),
      text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: (Math.random() - 0.5) * 6,
      timestamp: new Date(),
      reactions: [
        { emoji: "❤️", count: 0, hasReacted: false },
        { emoji: "😂", count: 0, hasReacted: false },
        { emoji: "😢", count: 0, hasReacted: false },
        { emoji: "🤯", count: 0, hasReacted: false },
        { emoji: "🫂", count: 0, hasReacted: false },
      ],
      comments: [],
    })),
  }));

// ---------- HOOK ----------
export const useConfessions = () => {
  const [walls, setWalls] = useState<DayWall[]>(createInitialWalls);
  const [selectedDay, setSelectedDay] = useState(0);

  const currentWall = walls[selectedDay];

  const addConfession = (text: string) => {
    const newConfession: Confession = {
      id: generateId(),
      text,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: (Math.random() - 0.5) * 6,
      timestamp: new Date(),
      reactions: [
        { emoji: "❤️", count: 0, hasReacted: false },
        { emoji: "😂", count: 0, hasReacted: false },
        { emoji: "😢", count: 0, hasReacted: false },
        { emoji: "🤯", count: 0, hasReacted: false },
        { emoji: "🫂", count: 0, hasReacted: false },
      ],
      comments: [],
    };

    setWalls((prev) => {
      const copy = [...prev];
      copy[0] = {
        ...copy[0],
        confessions: [newConfession, ...copy[0].confessions],
      };
      return copy;
    });
  };

  const addReaction = (id: string, emoji: string) => {
    setWalls((prev) =>
      prev.map((wall) => ({
        ...wall,
        confessions: wall.confessions.map((c) =>
          c.id !== id
            ? c
            : {
                ...c,
                reactions: c.reactions.map((r) =>
                  r.emoji !== emoji
                    ? r
                    : {
                        ...r,
                        count: r.hasReacted ? r.count - 1 : r.count + 1,
                        hasReacted: !r.hasReacted,
                      }
                ),
              }
        ),
      }))
    );
  };

  const addComment = (id: string, text: string) => {
    setWalls((prev) =>
      prev.map((wall) => ({
        ...wall,
        confessions: wall.confessions.map((c) =>
          c.id !== id
            ? c
            : {
                ...c,
                comments: [
                  ...c.comments,
                  { id: generateId(), text, timestamp: new Date() },
                ],
              }
        ),
      }))
    );
  };

  return {
    walls,
    selectedDay,
    setSelectedDay,
    currentWall,
    addConfession,
    addReaction,
    addComment,
  };
};
