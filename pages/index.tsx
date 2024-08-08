"use client";

import { Button, TextInput } from "@mantine/core";

const url = "https://bigfuture.collegeboard.org/college-search";

export default function Home() {
  const onStartScraping = () => {};
  return (
    <main>
      <TextInput label="URL" placeholder={url} disabled />
      <Button onClick={onStartScraping}>Start Scraping</Button>
    </main>
  );
}
