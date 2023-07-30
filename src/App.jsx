import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import Home from "./Pages/Home";
import Profile from "./Pages/profile/[walletAddress]";



export default function App() {
  const address = useAddress()
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path={`/profile/${address}`} element={<Profile/>} />
      </Routes>
    </Router>
  );
}
