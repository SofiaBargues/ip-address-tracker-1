import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

function App() {
  // TODO: 2. Geo position State
  // const [count, setCount] = useState(0);

  //  TODO: 3. useEffect > Fetch IP Position > save in state

  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
    // TODO: 1. Show Map with position from state
  );
}
export default App;
