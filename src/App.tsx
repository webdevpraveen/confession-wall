import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>

      {/* Global Toast */}
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
