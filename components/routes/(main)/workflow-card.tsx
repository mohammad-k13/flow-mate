import { Eye } from "lucide-react";
import React from "react";

//typeography
import Text from "@/components/typeography/text";

//ui
import Slack from "@/components/layout/slack";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Title from "@/components/typeography/title";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const WorkflowCard = () => {
    return (
        <section className="w-[95%] max-w-[325px] shadow-border-3 p-3 py-4 group hover:border-[#EE2A69] hover:shadow-[#EE2A69] transition-colors hover:bg-[#EE2A69]/10">
            <header className="w-full">
                <Slack className="w-full" justify="between">
                    <Badge className="p-3 py-2 text-sm rounded-full group-hover:bg-white transition-colors">
                        {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </Badge>
                    <Slack gap={3}>
                        <Eye color="#EE2A69"/>
                        <Text>232</Text>
                    </Slack>
                </Slack>
            </header>
            <main className="w-full mt-5">
                  <Slack className="w-full mb-4" justify="between">
                        <Slack dir="col" align="start">
                              <Text>mohammad-k13</Text>
                              <Title level={5}>
                              EcoTrack
                              </Title>
                        </Slack>
                        <Avatar>
                              <AvatarFallback>AV</AvatarFallback>
                              <AvatarImage src="https://s3-alpha-sig.figma.com/img/5a4e/62ef/4acb39bbf6680544289dd6b03a883537?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aQDxzDGqWeO7z90e~5v9IFRD947-8XfnOoE085vf2eXgzwWlKpZsgdaoxlidaaqLqwI5WVLogr8c1OoZrf1M8xM4AjP8LCnqd2qLu62Gmj7MA64AhmqrnfcKYm0XUts9k1Ue8faBkHi1T1~JDex9kf6anRzvWp1VZgWCrvxM6rMxb1untqyplQLaVNUpfzTbrLAInK~yfBBwyYr3B0HrahiQu2kEgD8l4jMUZZcek0xOhudZ1FCTVLKbA9plYNl05FqtUI~nutCYDYbh4usq1zb7WkDCBH1uXiTRKLGIXmKbOWH3ERl2RxrddgbGIk~i~-6wTToEQXyvWrXMJUbWHQ__"/>
                        </Avatar>
                  </Slack>
                  <Text>A mobile app that helps users track and reduce their carbo and best ins...</Text>
                  <img src={"https://s3-alpha-sig.figma.com/img/df65/bfac/7c36fe2d2a57b4ee3889e04148e6d6c6?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NlVx0I9hAmYEPelZrMIYgW5nINjnneWAjM4vcOEYn1Cc8XLQMDfbigV8EWxY8F1Q3eSxyHhuEIjUsd0VDEcRO2Y5Z0aQC02MVvD5K4ApwAfPW073StNnUyKHUMyNKdGzXp~9sBcSGGbt9xlYYohyM3TWY0S2N7oynAynvSjJ2vjzKnqLhv9lcreBPsT901d3RvfJa1xowQH4lkUcNlWKing9jv8Nux4b-v~YXd8JChJaWmuCGr~-Nn0ZmPvFaCwsa-Jv8iikpM~g8Er4stEQtXZMJo7bceeUpif4XQJ6MIOnV3WCccOJz-Wrflr75-~j-q1HnSGyQdrk085cQ3xqew__"} alt="workflow-Image" className="aspect-video w-full rounded-md mt-2"/>
            </main>
            <footer className="mt-5">
                  <Slack className="w-full" justify="between">
                        <Text>Senior level</Text>
                        <button className="px-5 py-2 rounded-full bg-foreground text-background hover:bg-foreground/80 transition-colors">Details</button>
                  </Slack>
            </footer>
        </section>
    );
};

export default WorkflowCard;
