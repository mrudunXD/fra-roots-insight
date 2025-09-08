import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize2, ZoomIn, ZoomOut, Layers } from "lucide-react";

interface MapViewProps {
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

// Mock FRA claim data for demonstration
const mockClaims = [
  {
    id: "FRA001",
    name: "Ramesh Kumar",
    village: "Bastar",
    state: "Madhya Pradesh",
    claimType: "IFR",
    area: "2.5 ha",
    status: "Granted",
    lat: 19.5,
    lng: 81.8,
  },
  {
    id: "FRA002", 
    name: "Sunita Devi",
    village: "Keonjhar",
    state: "Odisha",
    claimType: "CFR",
    area: "15.0 ha",
    status: "Pending",
    lat: 21.6,
    lng: 85.6,
  },
  {
    id: "FRA003",
    name: "Tribal Community",
    village: "Agartala",
    state: "Tripura", 
    claimType: "CR",
    area: "8.2 ha",
    status: "Verified",
    lat: 23.8,
    lng: 91.3,
  },
];

export const MapView = ({ layers, filters }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedClaim, setSelectedClaim] = useState<typeof mockClaims[0] | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5, lng: 85.0 });
  const [zoomLevel, setZoomLevel] = useState(6);

  // Filter claims based on active filters
  const filteredClaims = mockClaims.filter(claim => {
    if (filters.state !== 'all' && claim.state !== filters.state) return false;
    if (filters.claimType !== 'all' && claim.claimType !== filters.claimType) return false;
    if (filters.status !== 'all' && claim.status !== filters.status) return false;
    return true;
  });

  const getClaimColor = (claimType: string) => {
    switch (claimType) {
      case 'IFR': return 'bg-fra-ifr';
      case 'CFR': return 'bg-fra-cfr'; 
      case 'CR': return 'bg-fra-cr';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Granted': return 'bg-success';
      case 'Verified': return 'bg-accent';
      case 'Pending': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="relative h-full bg-gradient-to-br from-blue-50 to-green-50">
      {/* Map Canvas - This would integrate with Mapbox or similar */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `,
        }}
      >
        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="bg-card">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-card">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-card">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-card">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Coordinate display */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded px-3 py-1 text-sm font-mono">
          {mapCenter.lat.toFixed(3)}, {mapCenter.lng.toFixed(3)} | Zoom: {zoomLevel}
        </div>

        {/* Scale bar */}
        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded px-2 py-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-12 h-0.5 bg-foreground"></div>
            <span>50 km</span>
          </div>
        </div>

        {/* FRA Claims markers */}
        {filteredClaims.map((claim) => (
          <div
            key={claim.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${((claim.lng - 68) / (97 - 68)) * 100}%`,
              top: `${((28 - claim.lat) / (28 - 8)) * 100}%`,
            }}
            onClick={() => setSelectedClaim(claim)}
          >
            <div className={`w-3 h-3 rounded-full ${getClaimColor(claim.claimType)} border-2 border-white shadow-md`}></div>
          </div>
        ))}

        {/* Forest cover overlay simulation */}
        {layers.forests && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-24 bg-layer-forest/30 rounded-lg"></div>
            <div className="absolute top-40 right-32 w-40 h-32 bg-layer-forest/30 rounded-lg"></div>
            <div className="absolute bottom-32 left-1/3 w-48 h-36 bg-layer-forest/30 rounded-lg"></div>
          </div>
        )}

        {/* Water bodies overlay */}
        {layers.water && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-24 h-6 bg-layer-water/50 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-layer-water/50 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Claim Details Popup */}
      {selectedClaim && (
        <Card className="absolute top-4 left-4 w-80 p-4 shadow-lg z-10">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold">{selectedClaim.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedClaim.village}, {selectedClaim.state}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedClaim(null)}
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getClaimColor(selectedClaim.claimType)}>
                {selectedClaim.claimType}
              </Badge>
              <Badge variant="outline" className={getStatusColor(selectedClaim.status)}>
                {selectedClaim.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Claim ID:</span>
                <p className="font-mono">{selectedClaim.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Area:</span>
                <p className="font-semibold">{selectedClaim.area}</p>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button size="sm" variant="outline">View Details</Button>
              <Button size="sm" variant="outline">Asset Map</Button>
              <Button size="sm">DSS Analysis</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Layer indicators */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {layers.fraIFR && <Badge variant="outline" className="bg-fra-ifr text-white">IFR Claims</Badge>}
        {layers.fraCFR && <Badge variant="outline" className="bg-fra-cfr text-white">CFR Claims</Badge>}
        {layers.fraCR && <Badge variant="outline" className="bg-fra-cr text-white">CR Claims</Badge>}
        {layers.forests && <Badge variant="outline" className="bg-layer-forest text-white">Forest Cover</Badge>}
        {layers.water && <Badge variant="outline" className="bg-layer-water text-white">Water Bodies</Badge>}
      </div>
    </div>
  );
};