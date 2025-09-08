import { useState } from "react";
import { MapboxMapView } from "@/components/map/MapboxMapView";
import { LayerControl } from "@/components/map/LayerControl";
import { ClaimFilters } from "@/components/map/ClaimFilters";
import { MapLegend } from "@/components/map/MapLegend";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Info } from "lucide-react";

interface LayersState {
  fraIFR: boolean;
  fraCFR: boolean;
  fraCR: boolean;
  villages: boolean;
  forests: boolean;
  agricultural: boolean;
  water: boolean;
  settlements: boolean;
  satellite: boolean;
}

interface FiltersState {
  state: string;
  district: string;
  claimType: string;
  status: string;
}

export const WebGISAtlas = () => {
  const [selectedLayers, setSelectedLayers] = useState<LayersState>({
    fraIFR: true,
    fraCFR: true,
    fraCR: false,
    villages: true,
    forests: true,
    agricultural: false,
    water: true,
    settlements: false,
    satellite: true,
  });

  const [filters, setFilters] = useState<FiltersState>({
    state: 'all',
    district: 'all',
    claimType: 'all',
    status: 'all',
  });

  return (
    <div className="h-full flex">
      {/* Left Panel - Controls */}
      <div className="w-80 bg-background border-r border-border p-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">WebGIS Atlas</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ClaimFilters filters={filters} onFiltersChange={setFilters} />
        <LayerControl layers={selectedLayers} onLayersChange={setSelectedLayers} />
        <MapLegend />

        {/* Info Panel */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Map Information</h3>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Displaying FRA claims across 4 pilot states with real-time satellite imagery integration.</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Zoom Level:</span> 8
              </div>
              <div>
                <span className="font-medium">Scale:</span> 1:250,000
              </div>
              <div>
                <span className="font-medium">Projection:</span> EPSG:4326
              </div>
              <div>
                <span className="font-medium">Updated:</span> Live
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <MapboxMapView 
          layers={selectedLayers} 
          filters={filters} 
        />
      </div>
    </div>
  );
};