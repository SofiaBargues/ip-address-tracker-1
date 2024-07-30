import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FormEvent, useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  // 2.a Cambiar tipo del estado a:
  //   {
  //     "country": "US",
  //     "region": "California",
  //     "city": "Mountain View",
  //     "lat": 37.40599,
  //     "lng": -122.078514,
  //     "postalCode": "94043",
  //     "timezone": "-07:00",
  //     "geonameId": 5375481
  // } || null\
  // 2.b renombrar position y setPosition como location y set location
  // 2.c Inicializar con null
  // 2.d cuando el estado null no mostrar MapContainer
  // 2.e el useEfect en vez de guardar coordenadas, "location"
  // 2.f crear una constante coordinates = [location.lat, location.lng] y usarla en todo el MapContainer

  //  TODO: 3. useEffect > Fetch IP Position > save in state
  useEffect(() => {
    fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_6Th4tJ6FGawlQdq2YjUIHzpHHtDzP"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosition([data.location.lat, data.location.lng]);
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //1 a. uso event para traer las coordenadas
    const formData = new FormData(e.currentTarget);
    const ip = formData.get("ip");
    console.log(ip);
    //1 b. fecht (url con ip)
    await fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=at_6Th4tJ6FGawlQdq2YjUIHzpHHtDzP&ipAddress=" +
        ip
    )
      //1 C. hago una funcion que capture el resultaado de la promesa, y retorne un json()
      .then((res) => {
        return res.json();
      })
      //1 d.hago una funcion que capture el resultaado de la promesa, y setea estados
      .then((data) => {
        setPosition([data.location.lat, data.location.lng]);
      });
  }

  console.log(position);
  return (
    <div className="w-[325px] h-screen bg-slate-700 justify-center">
      <img
        src="/pattern-bg-mobile.png"
        alt=""
        className="h-[310px] w-[380px]"
      />
      {/* --- (5) Add leaflet map container --- */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="ip" />
        <button type="submit">{">"} </button>
      </form>
      <div>
        <MapContainer
          className="h-[500px] w-[325px]"
          key={JSON.stringify(position)}
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
