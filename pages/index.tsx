import { useState } from "react";
import { CollegeInfo, CollegesInfos } from "@/types";

export default function Home() {
  const [collegesInfos, setCollegesInfos] = useState<CollegeInfo[]>([]);
  const getPage = async () => {
    try {
      const res = await fetch("/api/getPage");
      const result: CollegesInfos = await res.json();
      setCollegesInfos(result.collegesInfos);
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
