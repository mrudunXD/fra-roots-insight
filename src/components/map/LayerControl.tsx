import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

interface LayerControlProps {
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
  onLayersChange: (layers: LayerControlProps['layers']) => void;
}

export const LayerControl = ({ layers, onLayersChange }: LayerControlProps) => {
  const updateLayer = (layerId: string, enabled: boolean) => {
    onLayersChange({ ...layers, [layerId]: enabled });
  };

  const layerGroups = [
    {
      title: "FRA Claims",
      layers: [
        { id: 'fraIFR', label: 'Individual Forest Rights (IFR)', color: 'bg-fra-ifr' },
        { id: 'fraCFR', label: 'Community Forest Rights (CFR)', color: 'bg-fra-cfr' },
        { id: 'fraCR', label: 'Community Rights (CR)', color: 'bg-fra-cr' },
      ]
    },
    {
      title: "Administrative",
      layers: [
        { id: 'villages', label: 'Village Boundaries', color: 'bg-muted' },
        { id: 'settlements', label: 'Settlements', color: 'bg-layer-settlement' },
      ]
    },
    {
      title: "Land Use / Cover",
      layers: [
        { id: 'forests', label: 'Forest Cover', color: 'bg-layer-forest' },
        { id: 'agricultural', label: 'Agricultural Land', color: 'bg-layer-agricultural' },
        { id: 'water', label: 'Water Bodies', color: 'bg-layer-water' },
      ]
    },
    {
      title: "Base Layers",
      layers: [
        { id: 'satellite', label: 'Satellite Imagery', color: 'bg-accent' },
      ]
    }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Map Layers</h3>
      </div>

      <div className="space-y-4">
        {layerGroups.map((group, groupIndex) => (
          <div key={group.title}>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              {group.title}
            </h4>
            <div className="space-y-2">
              {group.layers.map((layer) => (
                <div key={layer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-3 h-3 rounded ${layer.color} border border-white shadow-sm`}></div>
                    <Label htmlFor={layer.id} className="text-sm cursor-pointer flex-1">
                      {layer.label}
                    </Label>
                  </div>
                  <Switch
                    id={layer.id}
                    checked={layers[layer.id as keyof typeof layers]}
                    onCheckedChange={(checked) => updateLayer(layer.id, checked)}
                  />
                </div>
              ))}
            </div>
            {groupIndex < layerGroups.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}
      </div>

      {/* Layer opacity controls could be added here */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>Total visible layers: {Object.values(layers).filter(Boolean).length}</p>
        </div>
      </div>
    </Card>
  );
};