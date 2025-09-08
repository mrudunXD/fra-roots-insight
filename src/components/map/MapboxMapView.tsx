import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Maximize2, ZoomIn, ZoomOut, Layers } from "lucide-react";
import { MapboxTokenGate } from "@/components/map/MapboxTokenGate";

interface MapboxMapViewProps {
  layers: {
    fraIFR: boolean;
    fraCFR: boolean;
    fraCR: boolean;
    villages: boolean;
    forests: boolean;
    agricultural: boolean;
    water: boolean;
    settlements: boolean;
    satellite: boolean;
  };
  filters: {
    state: string;
    district: string;
    claimType: string;
    status: string;
  };
}

export const MapboxMapView = ({ layers }: MapboxMapViewProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("mapbox_token") : null
  );
  const [mapReady, setMapReady] = useState(false);
  const [center, setCenter] = useState<{ lng: number; lat: number }>({ lng: 85, lat: 20.5 });
  const [zoom, setZoom] = useState(5.5);
  const [selected, setSelected] = useState<{ lng: number; lat: number } | null>(null);

  const styleUrl = useMemo(
    () => (layers.satellite ? "mapbox://styles/mapbox/satellite-streets-v12" : "mapbox://styles/mapbox/light-v11"),
    [layers.satellite]
  );

  // Initialize map
  useEffect(() => {
    if (!token || !mapContainer.current || mapRef.current) return;
    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: [center.lng, center.lat],
      zoom,
      attributionControl: true,
      cooperativeGestures: true,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

    mapRef.current.on("load", () => setMapReady(true));

    mapRef.current.on("move", () => {
      const c = mapRef.current!.getCenter();
      setCenter({ lng: c.lng, lat: c.lat });
      setZoom(mapRef.current!.getZoom());
    });

    mapRef.current.on("click", (e) => {
      setSelected({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [token]);

  // Update style when satellite toggled
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(styleUrl);
  }, [styleUrl]);

  // Update marker when selection changes
  useEffect(() => {
    if (!mapRef.current) return;
    if (selected) {
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker().setLngLat([selected.lng, selected.lat]).addTo(mapRef.current);
      } else {
        markerRef.current.setLngLat([selected.lng, selected.lat]);
      }
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [selected]);

  const zoomIn = () => mapRef.current?.zoomIn();
  const zoomOut = () => mapRef.current?.zoomOut();
  const toggleBase = () => {
    // Quick toggle for demo
    const newToken = token; // keep same token
    setSelected(null);
    // style change handled by parent via layers.satellite; this is a placeholder to show control
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Token Gate */}
      {!token && <MapboxTokenGate onSave={(t) => setToken(t)} />}

      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="bg-card" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-card" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-card" onClick={toggleBase} title="Base Layers">
          <Layers className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-card">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Coordinate display */}
      <div className="absolute bottom-4 left-4 z-10 bg-card/90 backdrop-blur-sm rounded px-3 py-1 text-sm font-mono">
        {selected ? (
          <span>
            Selected: {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
          </span>
        ) : (
          <span>
            {center.lat.toFixed(3)}, {center.lng.toFixed(3)} | Zoom: {zoom.toFixed(2)}
          </span>
        )}
      </div>

      {/* Scale bar placeholder */}
      <div className="absolute bottom-4 right-4 z-10 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-12 h-0.5 bg-foreground"></div>
          <span>50 km</span>
        </div>
      </div>

      {/* Layer badges */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {layers.fraIFR && <Badge variant="outline" className="bg-fra-ifr text-white">IFR Claims</Badge>}
        {layers.fraCFR && <Badge variant="outline" className="bg-fra-cfr text-white">CFR Claims</Badge>}
        {layers.fraCR && <Badge variant="outline" className="bg-fra-cr text-white">CR Claims</Badge>}
        {layers.forests && <Badge variant="outline" className="bg-layer-forest text-white">Forest Cover</Badge>}
        {layers.water && <Badge variant="outline" className="bg-layer-water text-white">Water Bodies</Badge>}
      </div>

      {/* Hint */}
      <Card className="absolute top-4 left-4 z-10 p-3 text-xs text-muted-foreground">
        Click on the map to select coordinates and drop a marker.
      </Card>
    </div>
  );
};
