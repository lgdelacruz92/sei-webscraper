import { Inter } from "next/font/google";
import { useState } from "react";

export default function Home() {
  const [collegeNames, setCollegeNames] = useState<string[]>([]);
  const getPage = async () => {
    const res = await fetch("http://localhost:3000/api/getPage");
    const result = await res.json();
    setCollegeNames(result.collegeNames);
  };
  return (
    <main>
      <div>
        <ul>
          {collegeNames.map((name, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => getPage()}>Click me</button>
    </main>
  );
}
