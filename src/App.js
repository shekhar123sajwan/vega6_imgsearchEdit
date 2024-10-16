import "./App.css";
import ImageSearch from "./components/ImageSearch";

function App() {
  return (
    <div className="App p-5">
      <a href="/" className="text-3xl font-bold mb-3 underline to-blue-600">
        Home
      </a>
      <h1 className="text-3xl font-bold mb-4">Name: Shekhar Sajwan </h1>
      <h1 className="text-3xl font-bold mb-4">
        Email: shekharsajwan97@gmail.com{" "}
      </h1>
      <div className="container p-6 ">
        <ImageSearch />
      </div>
    </div>
  );
}

export default App;
