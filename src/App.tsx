import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FormEvent, useEffect, useState } from "react";
import { icon } from "leaflet";

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
  const [isp, setIsp] = useState<string>("");
  const [ip, setIp] = useState<string>("");

  //  TODO: 3. useEffect > Fetch IP Position > save in state
  console.log(location);

  useEffect(() => {
    fetch(
      "https://geo.ipify.org/api/v2/country,city?apiKey=" +
        import.meta.env.VITE_GEO_IP
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLocation(data.location);
        setIp(data.ip);
        setIsp(data.isp);
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
      "https://geo.ipify.org/api/v2/country,city?apiKey=" +
        import.meta.env.VITE_GEO_IP +
        "&ipAddress=" +
        ip
    )
      //1 C. hago una funcion que capture el resultaado de la promesa, y retorne un json()
      .then((res) => {
        return res.json();
      })
      //1 d.hago una funcion que capture el resultaado de la promesa, y setea estados
      .then((data) => {
        setLocation(data.location);
        setIp(data.ip);
        setIsp(data.isp);
      });
  }

  console.log(ip);

  const iconUrl = "/icon-location.svg";
  const iconComp = icon({
    iconUrl,
    iconSize: [30, 38], // size of the icon
    iconAnchor: [15, 38], // point of the icon which will correspond to marker's location
  });

  return (
    <div className="w-full min-h-screen bg-slate-700 justify-center m-auto font-rubik relative ">
      <div className=" absolute flex flex-col gap-14 p-10 items-center w-full z-10 ">
        <div className="text-white font-semibold text-[30px] ">
          IP Address Tracker
        </div>
        <form onSubmit={handleSubmit} className="max-w-[500px]   w-full flex ">
          <input
            placeholder="Search for any IP address or domain"
            type="text"
            name="ip"
            className="rounded-l-lg h-10 w-full pl-3"
          />
          <button
            className="bg-black rounded-r-lg w-10  h-10 px-4 text-white"
            type="submit"
          >
            {">"}
          </button>
        </form>
        <div className="bg-white p-7 max-w-[300px] md:max-w-[1000px] w-full m-auto rounded-xl text-center md:text-start flex flex-col items-center md:items-start md:grid md:grid-cols-4 gap-3 sm:gap-0">
          <div>
            <div className="text-[10px] mb-2 font-semibold tracking-[2px] text-[#959595] ">
              IP ADDRESS
            </div>
            <div className="font-semibold text-xl">{ip}</div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="md:bg-slate-200 h-12 w-[1px]"></div>
            <div>
              <div className="text-[10px] mb-2 font-semibold tracking-[2px] text-[#959595]">
                LOCATION
              </div>
              <div className="font-semibold text-xl ">{location?.city}</div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="md:bg-slate-200 h-12 w-[1px] "></div>
            <div>
              <div className="text-[10px] mb-2 font-semibold tracking-[2px] text-[#959595]">
                TIMEZONE
              </div>
              <div className="font-semibold text-xl">
                UTC {location?.timezone}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="md:bg-slate-200 h-12 w-[1px]"></div>
            <div>
              <div className="text-[10px] font-semibold tracking-[2px] mb-2 text-[#959595]">
                ISP
              </div>
              <div className="font-semibold text-xl">{isp}</div>
            </div>
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
            <Marker icon={iconComp} position={coordinates}>
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
