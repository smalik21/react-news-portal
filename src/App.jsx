import { Routes, Route } from "react-router-dom";
import NewsList from "./components/NewsList";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/:category" element={<NewsList />} />
      </Routes>
    </>
  )
}