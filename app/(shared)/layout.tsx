import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const LayoutShared = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default LayoutShared;
