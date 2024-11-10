import React from "react";
import Slack from "../layout/slack";
import Title from "../typeography/title";

const TagLine = () => {
  return (
    <section className="bg-section py-10">
      <Slack justify="start" dir="col" className="h-full" gap={20}>
        <div className="bg-[#eebd2b] p-3 px-10 rounded-md relative">
          <div className="absolute left-2 top-2 w-[12px] h-[12px] bg-black before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bottom-[-11px] before:right-[-11px] before:rotate-45 before:bg-[#eebd2b] before: overflow-hidden"></div>
          <Slack>
            <Title level={5} className="text-black">
              Made, Trigger, Won
            </Title>
          </Slack>
          <div className="absolute right-2 bottom-2 w-[12px] h-[12px] rotate-180 bg-black before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:bottom-[-11px] before:right-[-11px] before:rotate-45 before:bg-[#eebd2b] before: overflow-hidden"></div>
        </div>

        <div className="bg-black text-center p-5 rounded-md">
          <Title level={1} className="text-white max-md:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
            Pitch Your Startup,
            <br />
            Connect with Entrepreneurs,
          </Title>
        </div>
      </Slack>
    </section>
  );
};

export default TagLine;
