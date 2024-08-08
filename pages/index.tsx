"use client";
import { useState, useEffect } from "react";
import { CodeData, CollegeInfo, CollegesInfos } from "@/types";

function formatTimeElapsed(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default function Home() {
  const [collegesInfos, setCollegesInfos] = useState<CollegeInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [startFetching, setStartFetching] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const getPage = async () => {
    try {
      setPageLoading(true);
      setStartFetching(new Date().getTime());
      const res = await fetch("/api/getPage");
      const result: CollegesInfos = await res.json();
      if (result.collegesInfos.length > 0) {
        for (let i = 0; i < result.collegesInfos.length; i++) {
          const params = new URLSearchParams({
            link: result.collegesInfos[i].link,
          });
          const codeResponse = await fetch(`/api/getCode?${params.toString()}`);
          if (codeResponse.status === 200) {
            const { name, city, state, link } = result.collegesInfos[i];
            const { code }: CodeData = await codeResponse.json();
            const postCollegeResponse = await fetch("/api/postCollege", {
              method: "POST", // Specify the HTTP method as POST
              headers: {
                "Content-Type": "application/json", // Set the Content-Type header to application/json for JSON data
              },
              body: JSON.stringify({ name, city, state, code, link }), // Convert the data object to a JSON string
            });
          }
        }
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setPageLoading(false);
      setStartFetching(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => setTimeElapsed(new Date().getTime() - startFetching),
      3000
    );
    return () => {
      clearInterval(interval);
    };
  }, [startFetching]);

  return (
    <main>
      <button onClick={() => getPage()}>Click me</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      {pageLoading ? (
        <div>
          Please wait while we query colleges. This takes about 10 mins.{" "}
          {formatTimeElapsed(timeElapsed)}
        </div>
      ) : (
        <div>
          <div>
            {collegesInfos.map((collegeInfo, i) => (
              <div key={i} className="grid grid-cols-4">
                <div className="text-wrap border border-slate-400">
                  {collegeInfo.name}
                </div>
                <div className="text-wrap border border-slate-400">
                  {collegeInfo.city}
                </div>
                <div className="text-wrap border border-slate-400">
                  {collegeInfo.state}
                </div>
                <div className="text-wrap border border-slate-400">
                  {collegeInfo.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
