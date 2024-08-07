import { useState } from "react";
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
            collegesInfos.push({ name, city, state, code, link });
            setCollegesInfos([...collegesInfos]);
          }
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <main>
      <div>
        <div>
          {collegesInfos.map((collegeInfo, i) => (
            <div key={i}>
              <div className="grid grid-cols-4">
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
                  {collegeInfo.link}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => getPage()}>Click me</button>
    </main>
  );
}
