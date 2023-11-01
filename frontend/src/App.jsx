import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchDataparams() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts/`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        console.log("result: ", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataparams();
  }, []);
  console.log("dddd", data);
  return (
    <>
      <p>hello world</p>
    </>
  );
}

export default App;
