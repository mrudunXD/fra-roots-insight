import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface MapboxTokenGateProps {
  onSave: (token: string) => void;
}

export const MapboxTokenGate = ({ onSave }: MapboxTokenGateProps) => {
  const [value, setValue] = useState("");

  const handleSave = () => {
    if (!value) return;
    try {
      localStorage.setItem("mapbox_token", value);
      onSave(value);
    } catch (e) {
      console.error("Failed to store token in localStorage", e);
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <Card className="w-full max-w-md p-5 shadow-xl">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Mapbox Public Token</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your Mapbox public access token. It will be stored in your browser (localStorage) only.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mapboxToken">Token</Label>
            <Input
              id="mapboxToken"
              placeholder="pk.************************************"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Get a public token at mapbox.com → Dashboard → Tokens.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setValue("")}>Clear</Button>
            <Button onClick={handleSave}>Save token</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
