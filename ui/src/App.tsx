import "./App.css";
import CarrierForm from "./components/CarrierForm";
import CarrierList from "./components/CarrierList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2em 0",
      }}
    >
      <CarrierForm />
      <CarrierList />
    </div>
  );
}

export default App;
