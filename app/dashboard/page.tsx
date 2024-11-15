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

import Slack from "@/components/layout/slack";
import CanvasSideBar from "@/components/workFlow/side-bar";
import WorkFlowCanvas from "@/components/workFlow/workflow-canvas";
import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Slack className="h-full">
        <WorkFlowCanvas />
        <CanvasSideBar />
      </Slack>
    </div>
  );
};

export default Dashboard;
