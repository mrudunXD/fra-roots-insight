import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, Square, Circle } from "lucide-react";

export const MapLegend = () => {
  const legendItems = [
    {
      category: "FRA Claim Types",
      items: [
        { icon: Circle, color: "bg-fra-ifr", label: "IFR - Individual Forest Rights", description: "2.5 ha avg" },
        { icon: Circle, color: "bg-fra-cfr", label: "CFR - Community Forest Rights", description: "15+ ha avg" },
        { icon: Circle, color: "bg-fra-cr", label: "CR - Community Rights", description: "8+ ha avg" },
      ]
    },
    {
      category: "Claim Status",
      items: [
        { icon: Square, color: "bg-success", label: "Granted", description: "Title issued" },
        { icon: Square, color: "bg-accent", label: "Verified", description: "Under process" },
        { icon: Square, color: "bg-warning", label: "Pending", description: "Awaiting review" },
      ]
    },
    {
      category: "Land Cover",
      items: [
        { icon: Square, color: "bg-layer-forest", label: "Forest Areas", description: "Dense & degraded" },
        { icon: Square, color: "bg-layer-water", label: "Water Bodies", description: "Rivers, ponds, tanks" },
        { icon: Square, color: "bg-layer-agricultural", label: "Agricultural Land", description: "Cultivated areas" },
      ]
    }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-sm">Map Legend</h3>
      </div>

      <div className="space-y-4">
        {legendItems.map((category) => (
          <div key={category.category}>
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.items.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="flex items-center justify-center mt-0.5">
                    <item.icon className={`h-3 w-3 ${item.color} rounded-sm`} fill="currentColor" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data source info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-1">
          <p><span className="font-medium">Data Sources:</span></p>
          <p>• Satellite: Sentinel-2, LISS-III</p>
          <p>• Claims: Ministry of Tribal Affairs</p>
          <p>• Boundaries: Survey of India</p>
        </div>
      </div>
    </Card>
  );
};