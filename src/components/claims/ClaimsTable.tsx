import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, Search, Plus } from "lucide-react";
import { DataService, FiltersState } from "@/lib/dataService";
import { FRAClaim } from "@/lib/mockData";

interface ClaimsTableProps {
  filters: FiltersState;
}

export const ClaimsTable = ({ filters }: ClaimsTableProps) => {
  const [claims, setClaims] = useState<FRAClaim[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClaims, setFilteredClaims] = useState<FRAClaim[]>([]);

  useEffect(() => {
    loadClaims();
  }, [filters]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredClaims(DataService.searchClaims(searchQuery));
    } else {
      setFilteredClaims(DataService.getFilteredClaims(filters));
    }
  }, [searchQuery, claims, filters]);

  const loadClaims = () => {
    const allClaims = DataService.getClaims();
    setClaims(allClaims);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this claim?')) {
      DataService.deleteClaim(id);
      loadClaims();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'IFR': return 'bg-purple-100 text-purple-800';
      case 'CFR': return 'bg-green-100 text-green-800';
      case 'CR': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">FRA Claims Management</h3>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Claim
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search claims by name, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results Summary */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredClaims.length} of {claims.length} claims
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Area (ha)</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{claim.name}</div>
                      {claim.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {claim.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(claim.claimType)}>
                      {claim.claimType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(claim.status)}>
                      {claim.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{claim.district}</div>
                      <div className="text-muted-foreground">{claim.state}</div>
                    </div>
                  </TableCell>
                  <TableCell>{claim.area.toFixed(1)}</TableCell>
                  <TableCell>{claim.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(claim.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredClaims.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No claims found matching your criteria.
          </div>
        )}
      </div>
    </Card>
  );
};