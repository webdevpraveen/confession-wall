import { Header } from "@/components/Header";
import { NewConfessionForm } from "@/components/NewConfessionForm";
import { DaySelector } from "@/components/DaySelector";
import { ConfessionWall } from "@/components/ConfessionWall";
import { useConfessions } from "@/hooks/useConfessions";
import { toast } from "sonner";

const Index = () => {
  const {
    walls,
    selectedDay,
    setSelectedDay,
    currentWall,
    addConfession,
    addReaction,
    addComment,
  } = useConfessions();

  const handleNewConfession = (text: string) => {
    addConfession(text);
    toast.success("Confession added to the wall 🧷", {
      description: "Stay anonymous. Stay honest.",
    });
    setSelectedDay(0); // always jump to Today
  };

  return (
    <div className="min-h-screen cork-board">
      <div className="container max-w-6xl mx-auto pb-12">
        {/* Header */}
        <Header />

        {/* New Confession */}
        <section className="px-4 mb-12">
          <NewConfessionForm onSubmit={handleNewConfession} />
        </section>

        {/* Day Selector */}
        <section className="mb-10">
          <DaySelector
            walls={walls}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </section>

        {/* Wall Title */}
        <div className="text-center mb-6">
          <h2 className="font-handwriting text-3xl text-foreground/80">
            {currentWall.label}'s Wall
          </h2>
          <p className="text-sm text-muted-foreground">
            {currentWall.confessions.length} confessions
          </p>
        </div>

        {/* Confession Wall */}
        <ConfessionWall
          confessions={currentWall.confessions}
          onReact={addReaction}
          onComment={addComment}
        />
      </div>
    </div>
  );
};

export default Index;
