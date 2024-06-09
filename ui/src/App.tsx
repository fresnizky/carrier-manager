import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import CarrierForm from "./components/CarrierForm";
import CarrierList from "./components/CarrierList";

function App() {
  return (
    <div
      className="flex flex-col items-center py-8"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2em 0",
      }}
    >
      <CarrierForm />
      <CarrierList />
      <ToastContainer />
    </div>
  );
}

export default App;
