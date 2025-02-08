import { ReactNode } from "react";

import Drawer from "@/components/Drawer/Drawer";

function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Drawer />
      {children}
    </>
  );
}

export default EditorLayout;
