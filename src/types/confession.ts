export type NoteColor = 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple';

export interface Reaction {
  emoji: string;
  count: number;
  hasReacted: boolean;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: Date;
}

export interface Confession {
  id: string;
  text: string;
  color: NoteColor;
  rotation: number;
  timestamp: Date;
  reactions: Reaction[];
  comments: Comment[];
}

export type DayLabel = 'Today' | 'Yesterday' | string;

export interface DayWall {
  label: DayLabel;
  date: Date;
  confessions: Confession[];
}
