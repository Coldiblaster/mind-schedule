'use client';

import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { AddressProps } from '@/data/mock/professional';

const myIcon = new L.Icon({
  iconUrl: './marker.svg',
  iconRetinaUrl: './marker.svg',
  popupAnchor: [-0, -16],
  iconSize: [40, 40],
});

interface MapProps {
  address: AddressProps;
}

export default function Map({ address }: MapProps) {
  return (
    <>
      <MapContainer
        center={[-22.1151321, -51.3993314]}
        zoom={15}
        scrollWheelZoom={true}
        className="relative z-0 h-80 w-full rounded-md"
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX}`}
          attribution='Map data &copy;
          <a href="https://www.openstreetmap.org/">OpenStreetMap</a>
          contributors,
          <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
          Imagery &copy;
          <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        <Marker position={[-22.1151321, -51.3993314]} icon={myIcon}>
          <Popup>
            <div className="flex flex-col gap-2">
              <h1 className="text-sm font-bold">Clínica</h1>

              <span className="text-xs">
                {`${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''} - ${address.neighborhood}, ${address.zipCode ? `, ${address.zipCode}` : ''}`}
              </span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
