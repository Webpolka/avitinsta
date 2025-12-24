import { Map, Marker } from "pigeon-maps";

export default function PasteMap() {
  return (
    <Map height={300} defaultCenter={[55.75, 37.61]} defaultZoom={11}>
      <Marker width={50} anchor={[55.75, 37.61]} />
    </Map>
  );
}
