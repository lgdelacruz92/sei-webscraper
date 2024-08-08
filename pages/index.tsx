"use client";

import { Button, TextInput } from "@mantine/core";

const url = "https://bigfuture.collegeboard.org/college-search";

export default function Home() {
  const onStartScraping = () => {};
  return (
    <main>
      <div className="app-container flex flex-col items-center">
        <TextInput
          label="URL"
          placeholder={url}
          disabled
          className="m-4 min-w-[80%]"
        />
        <Button onClick={onStartScraping}>Start Scraping</Button>
      </div>
    </main>
  );
}
