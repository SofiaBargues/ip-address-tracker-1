import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FormEvent, useEffect, useState } from "react";

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
// } || null

type Location = {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
};

function App() {
  // 2.b renombrar position y setPosition como location y set location
  // 2.c Inicializar con null
  const [location, setLocation] = useState<Location | null>(null);

  //  TODO: 3. useEffect > Fetch IP Position > save in state
  console.log(location);

  useEffect(() => {
    setLocation({
      country: "GB",
      region: "England",
      city: "Manchester",
      lat: 53.48095,
      lng: -2.23743,
      postalCode: "",
      timezone: "+01:00",
      geonameId: 2643123,
    });
    return;
    fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=" +
        import.meta.env.VITE_GEO_IP
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // 2.e el useEffect en vez de guardar coordenadas, "location"

        setLocation(data.location);
      });
  }, []);

  // 2.f crear una constante coordinates = [location.lat, location.lng] y usarla en todo el MapContainer
  const coordinates: [number, number] = [
    location?.lat || 0,
    location?.lng || 0,
  ];
  // 2.g Actualizar el fetch del handleSubmit

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
        setLocation(data.location);
      });
  }

  console.log(location);

  return (
    <div className="w-full min-h-screen bg-slate-700 justify-center m-auto font-rubik relative ">
      <div className=" absolute flex flex-col gap-9 p-10 items-center w-full z-10 ">
        <div className="text-white font-semibold text-[30px] ">
          IP Address Tracker
        </div>
        <form onSubmit={handleSubmit} className="max-w-[500px]   w-full flex ">
          <input
            placeholder="Search for any IP address or domain"
            type="text"
            name="ip"
            className="rounded-l-lg h-10 w-full pl-2"
          />
          <button
            className="bg-black rounded-r-lg w-10  h-10 px-4 text-white"
            type="submit"
          >
            {">"}
          </button>
        </form>
        <div className="bg-white p-10 max-w-[500px] sm:max-w-[1000px] w-full m-auto rounded-xl text-center sm:text-start flex flex-col sm:flex-row gap-3 sm:gap-20 sm:items-start ">
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] text-[#959595]">
              IP ADDRESS
            </div>
            <div className="font-semibold text-xl">192.212.174.101</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] text-[#959595]">
              LOCATION
            </div>
            <div className="font-semibold text-xl">Brooklyn, NY 10001</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] text-[#959595]">
              TIMEZONE
            </div>
            <div className="font-semibold text-xl">UTC -05:00</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] text-[#959595]">
              ISP
            </div>
            <div className="font-semibold text-xl">SpaceX Starlink</div>
          </div>
        </div>
      </div>
      <div className="h-full relative z-0 grid grid-rows-[300px_1fr]">
        <img
          src="/pattern-bg-mobile.png"
          alt=""
          className="w-full h-[300px] object-cover sm:hidden"
        />
        <img
          src="/pattern-bg-desktop.png"
          alt=""
          className="w-full h-[300px] object-cover hidden sm:block"
        />

        {location && (
          <MapContainer
            className="h-[600px] w-full"
            key={JSON.stringify(coordinates)}
            center={coordinates}
            zoom={6}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coordinates}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
    // TODO: 1. Show Map with position from state
  );
}
export default App;
