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
        <ul>
          {collegesInfos.map((collegeInfo, i) => (
            <li key={i}>
              <div>{collegeInfo.name}</div>
              <div>
                {collegeInfo.city},{collegeInfo.state}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => getPage()}>Click me</button>
    </main>
  );
}
