import Map from "@/components/Map";
import seatmapData from '../public/seatmap.json';

export default function Home() {
  return (
    <div className=" h-screen overflow-hidden flex items-center justify-items-center">
        <div className="h-full w-1/4"></div>
        <Map geojson={seatmapData} />
    </div>
  );
}
