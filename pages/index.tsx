"use client";
import { useState, useEffect } from "react";
import { CodeData, CollegeInfo, CollegesInfos } from "@/types";

export default function Home() {
  const [collegesInfos, setCollegesInfos] = useState<CollegeInfo[]>([]);
  const getPage = async () => {
    try {
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
    }
  };

  useEffect(() => {
    setInterval(async () => {
      const response = await fetch("/api/getColleges");
      const colleges = await response.json();
      setCollegesInfos(colleges);
    }, 3000);
  }, []);

  return (
    <main>
      <button onClick={() => getPage()}>Click me</button>
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
    </main>
  );
}
