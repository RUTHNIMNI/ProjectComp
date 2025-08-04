import { useEffect, useState } from "react";

export default function ClockDisplay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),1000);
    return () => clearInterval(timer);
  }, [time]);

  return <div>Current Time: {time}</div>;
}
