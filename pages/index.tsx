"use client";

import LoadingBar from "@/components/loading-bar";
import { Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const url = "https://bigfuture.collegeboard.org/college-search";

export default function Home() {
  const [scrapingStarted, setScrapingStarted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const onStartScraping = async () => {
    await fetch("http://localhost:4000/start-task", { method: "POST" });
    setScrapingStarted(true);
  };

  useEffect(() => {
    if (!scrapingStarted) return;
    const interval = setInterval(async () => {
      const resp = await fetch("http://localhost:4000/progress");
      const { progress, completed, data } = await resp.json();
      if (completed) {
        console.log(data.length);
        setScrapingStarted(false);
      } else {
        setProgressValue(progress);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [scrapingStarted]);
  return (
    <main>
      <div className="app-container flex flex-col items-center gap-y-4">
        <TextInput
          label="URL"
          placeholder={url}
          disabled
          className="m-4 min-w-[80%]"
        />
        <Button onClick={onStartScraping}>Start Scraping</Button>
        <LoadingBar
          progress={progressValue}
          description="Scraping College List"
        />
      </div>
    </main>
  );
}
