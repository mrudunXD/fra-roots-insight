import { useState } from "react";
import { MapboxMapView } from "@/components/map/MapboxMapView";
import { LayerControl } from "@/components/map/LayerControl";
import { ClaimFilters } from "@/components/map/ClaimFilters";
import { MapLegend } from "@/components/map/MapLegend";
import { ClaimsTable } from "@/components/claims/ClaimsTable";
import { ClaimsAnalytics } from "@/components/analytics/ClaimsAnalytics";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Share2, Info, Table, BarChart3, Map } from "lucide-react";
import { DataService } from "@/lib/dataService";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
} from "@/components/ui/sidebar";

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

  const [activeTab, setActiveTab] = useState("map");

  const handleExportData = () => {
    const data = DataService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webgis_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <SidebarProvider>
      <div className="h-full flex w-full">
        <Sidebar className="w-80" collapsible="none">
          <SidebarContent className="p-4 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">WebGIS Atlas</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Map View
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Claims Table
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {activeTab === "map" && (
              <>
                <ClaimFilters filters={filters} onFiltersChange={setFilters} />
                <LayerControl layers={selectedLayers} onLayersChange={setSelectedLayers} />
                <MapLegend />
              </>
            )}

            {(activeTab === "table" || activeTab === "analytics") && (
              <ClaimFilters filters={filters} onFiltersChange={setFilters} />
            )}

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
          </SidebarContent>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex-1 relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsContent value="map" className="h-full m-0">
              <MapboxMapView 
                layers={selectedLayers} 
                filters={filters} 
              />
            </TabsContent>
            
            <TabsContent value="table" className="h-full m-0 p-4 overflow-y-auto">
              <ClaimsTable filters={filters} />
            </TabsContent>
            
            <TabsContent value="analytics" className="h-full m-0 p-4 overflow-y-auto">
              <ClaimsAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};