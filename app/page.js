import Map from "@/components/Map";
import seatmapData from '../public/seatmapt.json';

export default function Home() {
  return (
    <div className=" h-screen overflow-hidden flex items-center justify-items-center">
        <div className="h-full px-48"></div>
        <Map geojson={seatmapData} />
    </div>
  );
}
