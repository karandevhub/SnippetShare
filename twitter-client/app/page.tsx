"use client";
import React from "react";

import TwitterLayout from "@/components/Layout/TwitterLayout";
import TweeterFeed from "@/components/Layout/TweeterFeed";

export default function Home() {
  return (
    <TwitterLayout>
      <TweeterFeed />
    </TwitterLayout>
  );
}
