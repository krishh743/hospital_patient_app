import PatientList from "./components/PatientList"
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
function App() {
  return (
<div>
        <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/patients" element={<PatientList />} />
</Routes>
</div>
  );
}

export default App;
