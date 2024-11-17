// import { signOut } from '@/auth'
// import Slack from '@/components/layout/slack'
// import { Button } from '@/components/ui/button'
// import React from 'react'

// const Dashboard = async () => {
//   const onClick =  async () => {
//     "use server"
//     await signOut();
//   }
//   return (
//     <section className='w-full h-screen'>
//       <Slack className='w-full h-full'>
//         <Button onClick={onClick}>Sign Out</Button>
//       </Slack>
//     </section>
//   )
// }

// export default Dashboard

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkFlowSidebar from "@/components/workFlow/side-bar";
import WorkFlowCanvas from "@/components/workFlow/workflow-canvas";
import React from "react";

const Dashboard = () => {
  return (
    <section className="w-full h-full font-work-sans">
      <ResizablePanelGroup direction="horizontal" className="">
        <ResizablePanel className="rounded-md">
          <main className="w-[99%] h-[99%] border-4 border-black rounded-md shadow-2">
            <WorkFlowCanvas />
          </main>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel>
          <main className="w-[99%] h-[99%] border-4 border-black rounded-md shadow-2">
            <WorkFlowSidebar />
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default Dashboard;
