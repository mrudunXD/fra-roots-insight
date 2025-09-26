import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, FileText, Download, Edit } from "lucide-react";
import { FRAClaim } from "@/lib/mockData";

interface ClaimDetailsModalProps {
  claim: FRAClaim | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (claim: FRAClaim) => void;
}

export const ClaimDetailsModal = ({ claim, isOpen, onClose, onEdit }: ClaimDetailsModalProps) => {
  if (!claim) return null;

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

  const getTypeFullName = (type: string) => {
    switch (type) {
      case 'IFR': return 'Individual Forest Rights';
      case 'CFR': return 'Community Forest Rights';
      case 'CR': return 'Community Resource Rights';
      default: return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{claim.name}</span>
            <div className="flex gap-2">
              <Badge className={getTypeColor(claim.claimType)}>
                {claim.claimType}
              </Badge>
              <Badge className={getStatusColor(claim.status)}>
                {claim.status.replace('_', ' ')}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Detailed information about this FRA claim
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Claim ID</label>
                <p className="font-mono text-sm">{claim.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Claim Type</label>
                <p>{getTypeFullName(claim.claimType)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="capitalize">{claim.status.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Area</label>
                <p>{claim.area.toFixed(2)} hectares</p>
              </div>
            </div>
          </Card>

          {/* Location Information */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">State</label>
                <p>{claim.state}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">District</label>
                <p>{claim.district}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Coordinates</label>
                <p className="font-mono text-sm">
                  {claim.coordinates[1].toFixed(6)}, {claim.coordinates[0].toFixed(6)}
                </p>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Timeline
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Submitted Date</label>
                <p>{new Date(claim.submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                <p>{new Date(claim.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>

          {/* Description */}
          {claim.description && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-sm leading-relaxed">{claim.description}</p>
            </Card>
          )}

          {/* Documents */}
          {claim.documents && claim.documents.length > 0 && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents ({claim.documents.length})
              </h3>
              <div className="space-y-2">
                {claim.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{doc}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(claim)} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Claim
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};