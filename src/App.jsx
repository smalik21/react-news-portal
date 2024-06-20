import { Routes, Route, Navigate } from "react-router-dom";
import NewsList from "./components/NewsList";
import SearchList from "./components/SearchList";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Article from "./components/Article";

export default function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/:category" element={<NewsList />} />
        <Route path="/search/:keyword" element={<SearchList />} />
        <Route path="/article/:number" element={<Article />} />
        <Route path="/" element={<Navigate to="/general" replace={true} />} />
      </Routes>
    </>
  )
}