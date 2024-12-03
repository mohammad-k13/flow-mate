import ProfileForm from "@/components/form/profile-form";
import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import React from "react";

const Profile = async () => {
    return (
        <section className="w-full h-full">
            <header className="w-full px-2 h-16">
                <Slack className="w-full" justify="between">
                    <Title level={2}>My Profile</Title>
                </Slack>
            </header>
            <main className="w-full overflow-scroll pb-5" style={{height: "calc(100vh - 4rem)"}}>
                <Slack className="w-full h-full">
                    <ProfileForm />
                </Slack>
            </main>
        </section>
    );
};

export default Profile;
