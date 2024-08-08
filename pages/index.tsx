"use client";
import { useState, useEffect } from "react";
import { CodeData, CollegeInfo, CollegesInfos } from "@/types";

export default function Home() {
  const [collegesInfos, setCollegesInfos] = useState<CollegeInfo[]>([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const getPage = async () => {
    try {
      setPageLoading(true);
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
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const params = new URLSearchParams({
  //       page: `${page}`,
  //       pageSize: "3",
  //     });
  //     const response = await fetch(
  //       `/api/getCollegesPagination?${params.toString()}`
  //     );
  //     const { colleges } = await response.json();
  //     setCollegesInfos(colleges);
  //   }, 3000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [page]);

  return (
    <main>
      <button onClick={() => getPage()}>Click me</button>
      <button onClick={() => setPage(page + 1)}>Next Page</button>
      {pageLoading ? (
        <div>
          Please wait while we query colleges. This takes about 10 mins.
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
