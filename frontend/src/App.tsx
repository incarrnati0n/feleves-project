import Bar from "./Bar";
import LogPopup from "./LogPopup";
import GuestLog from "./GuestLog";
import { useState } from "react";

export default function App() {
  const [reload, setReload] = useState(0);

  return (
    <>
      <Bar />
      <LogPopup reload={reload} setReload={setReload} />
      <GuestLog reload={reload} />
    </>
  );
}
