import { Ghost, Lock } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center py-8 px-4">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Ghost className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-handwriting text-5xl sm:text-6xl text-foreground">
          Confess
        </h1>
      </div>
      
      <p className="text-muted-foreground max-w-md mx-auto text-lg mb-2">
        Share what you can't say out loud. <br></br> No login. No identity. Just raw honesty.
      </p>
      
      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 bg-muted/50 px-4 py-2 rounded-full">
        <Lock className="h-3.5 w-3.5" />
        <span>100% Anonymous • Auto-deletes in 7 days</span>
      </div>
    </header>
  );
};
