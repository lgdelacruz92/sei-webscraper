"use client";

import LoadingBar from "@/components/loading-bar";
import { Button, TextInput } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

const url = "https://bigfuture.collegeboard.org/college-search";

export default function Home() {
  const [runGetCollegesList, setRunGetCollegesList] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [codesProgressValue, setCodesProgressValue] = useState(0);
  const [runGetCollegesCodes, setRunGetCollegesCodes] = useState(false);

  const isLoading = () => {
    return runGetCollegesCodes || runGetCollegesList;
  };
  const onStartScraping = async () => {
    await fetch("http://localhost:4000/start-task", { method: "POST" });
    setRunGetCollegesList(true);
  };

  useEffect(() => {
    if (!runGetCollegesList) return;
    const interval = setInterval(async () => {
      const resp = await fetch("http://localhost:4000/progress");
      const { progress, completed, data } = await resp.json();
      if (completed) {
        setRunGetCollegesList(false);
        await fetch("http://localhost:4000/get-school-codes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to application/json for JSON data
          },
          body: JSON.stringify({ data }),
        });
        setRunGetCollegesCodes(true);
        setProgressValue(100);
      } else {
        setProgressValue(progress);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [runGetCollegesList]);

  useEffect(() => {
    if (!runGetCollegesCodes) return;
    const interval = setInterval(async () => {
      const resp = await fetch("http://localhost:4000/school-codes-progress");
      const { progress, completed } = await resp.json();
      if (completed) {
        setRunGetCollegesCodes(false);
        setCodesProgressValue(100);
      } else {
        setCodesProgressValue(progress);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [runGetCollegesCodes]);
  return (
    <main>
      <div className="app-container flex flex-col items-center gap-y-4">
        <TextInput
          label="URL"
          placeholder={url}
          disabled
          className="m-4 min-w-[80%]"
        />
        <Button onClick={onStartScraping} disabled={isLoading()}>
          Start Scraping
        </Button>
        <div className="flex flex-col items-center">
          <div>Crawling website to all colleges from home page</div>

          <LoadingBar
            progress={progressValue}
            description="Scraping Colleges List"
          />
        </div>
        <div className="flex flex-col items-center">
          <div>Crawling website to get all the college codes</div>
          <LoadingBar
            progress={codesProgressValue}
            description="Getting Colleges Codes"
          />
        </div>
        {progressValue === 100 && codesProgressValue === 100 && (
          <div className="flex flex-col items-center">
            <Link
              href="/colleges"
              type="button"
              className="border px-4 rounded text-cyan-700"
            >
              See Records
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
