import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FormEvent, useCallback, useState } from "react";

function App() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);

  //  TODO: 3. useEffect > Fetch IP Position > save in state

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e);
    // TODO: Fetch in handle submit
  }
  return (
    <div className="w-[325px] h-screen bg-slate-700 justify-center">
      <img
        src="/pattern-bg-mobile.png"
        alt=""
        className="h-[310px] w-[380px]"
      />
      {/* --- (5) Add leaflet map container --- */}
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">{">"} </button>
      </form>
      <div>
        <MapContainer
          className="h-[500px] w-[325px]"
          center={position}
          zoom={6}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>{" "}
    </div>
    // TODO: 1. Show Map with position from state
  );
}
export default App;
