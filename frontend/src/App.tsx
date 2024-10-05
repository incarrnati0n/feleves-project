import { useState } from "react";
import Bar from "./Bar";
import LogPopup from "./LogPopup";

export default function App() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <Bar />
      <button onClick={() => setOpenPopup(true)}>Open me!</button>
      <LogPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    </>
  );
}
