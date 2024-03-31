import { NavButton } from "../components/navButton";
import { MyStopwatch } from "../components/timer";
import { useEffect } from "react";

function Main() {
  const handleBeforeUnloadEvent = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnloadEvent, true);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnloadEvent, true);
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-evenly h-screen">
        <NavButton flag={true} />
        <MyStopwatch />
      </div>
    </div>
  );
}
export default Main;
