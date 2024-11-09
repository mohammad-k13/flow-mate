import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import "@xyflow/react/dist/style.css";
import WorkFlowCanvas from "@/components/workFlow/workflow-canvas";
import CanvasSideBar from "@/components/workFlow/side-bar";

const Home = () => {
  return (
    <section className="w-full h-screen p-5 font-work-sans">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel className="rounded-md">
          <main className="w-[99%] h-[99%] border-4 border-black rounded-md shadow-2">
            <WorkFlowCanvas />
          </main>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <main
            className="w-[99%] h-[99%] border-4 border-black rounded-md shadow-2 bg-yellow-200"
          >
            <CanvasSideBar />
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default Home;
