import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClaimFiltersProps {
  filters: {
    state: string;
    district: string;
    claimType: string;
    status: string;
  };
  onFiltersChange: (filters: ClaimFiltersProps['filters']) => void;
}

export const ClaimFilters = ({ filters, onFiltersChange }: ClaimFiltersProps) => {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      state: 'all',
      district: 'all',
      claimType: 'all',
      status: 'all',
    });
  };

  // Mock data for pilot states
  const states = [
    { value: 'all', label: 'All States' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Telangana', label: 'Telangana' },
  ];

  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'Bastar', label: 'Bastar' },
    { value: 'Keonjhar', label: 'Keonjhar' },
    { value: 'Agartala', label: 'Agartala' },
    { value: 'Warangal', label: 'Warangal' },
  ];

  const claimTypes = [
    { value: 'all', label: 'All Claim Types' },
    { value: 'IFR', label: 'Individual Forest Rights (IFR)' },
    { value: 'CFR', label: 'Community Forest Rights (CFR)' },
    { value: 'CR', label: 'Community Rights (CR)' },
  ];

  const statuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Granted', label: 'Granted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Verified', label: 'Verified' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Claim Filters</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset filters">
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state-filter" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            State
          </Label>
          <Select value={filters.state} onValueChange={(value) => updateFilter('state', value)}>
            <SelectTrigger id="state-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district-filter" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            District
          </Label>
          <Select value={filters.district} onValueChange={(value) => updateFilter('district', value)}>
            <SelectTrigger id="district-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.value} value={district.value}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="claim-type-filter" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Claim Type
          </Label>
          <Select value={filters.claimType} onValueChange={(value) => updateFilter('claimType', value)}>
            <SelectTrigger id="claim-type-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {claimTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Status
          </Label>
          <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger id="status-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>Showing filtered results on map</p>
        </div>
      </div>
    </Card>
  );
};