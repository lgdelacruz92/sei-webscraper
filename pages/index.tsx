"use client";

import LoadingBar from "@/components/loading-bar";
import { Button, TextInput } from "@mantine/core";

const url = "https://bigfuture.collegeboard.org/college-search";

export default function Home() {
  const onStartScraping = () => {};
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
        <LoadingBar progress={50} description="Scraping College List" />
      </div>
    </main>
  );
}
