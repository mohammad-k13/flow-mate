"use client"

import React, { type DragEvent } from "react";
import Slack from "../layout/slack";
import Title from "../typeography/title";
import Text from "../typeography/text";
import { NodeTypes } from "@/lib/types";

const CanvasSideBar = () => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: NodeTypes
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <Slack dir="col" gap={12} className="py-12 w-full">
      <Slack gap={5} align="center" justify="center" className="" dir="col">
        <Title level={5}>Your Cards</Title>
        <Text>This is a Description for Each Card</Text>
      </Slack>

      <div className="w-[80%] h-[3px] bg-black my-3"></div>

      <Slack
        dir="col"
        align="start"
        draggable
        className="w-[80%] max-md:w-full h-fit p-2 shadow-3 border-2 border-black rounded-md cursor-grab"
        onDragStart={(event) => onDragStart(event, "feild")}
      >
        <Title level={5}>Input Card</Title>
        <Text className="capitalize">
          This Card is For Creating a message to share with children.
        </Text>
        <button className="self-start bg-black mt-3 rounded-md text-yellow-200 p-2">
          Add To Canvas
        </button>
      </Slack>

      <Slack
        dir="col"
        align="start"
        draggable
        className="w-[80%] max-md:w-full h-fit p-2 shadow-3 border-2 border-black rounded-md cursor-grab"
        onDragStart={(event) => onDragStart(event, "text")}
      >
        <Title level={5}>Text Card</Title>
        <Text className="capitalize">
          This Card displays its parent input card.
        </Text>
        <button className="self-start bg-black mt-3 rounded-md text-yellow-200 p-2">
          Add To Canvas
        </button>
      </Slack>
    </Slack>
  );
};

export default CanvasSideBar;