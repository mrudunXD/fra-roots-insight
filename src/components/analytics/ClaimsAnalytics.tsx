import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DataService } from "@/lib/dataService";
import { TrendingUp, Users, MapPin, Calendar, BarChart3, FileText } from "lucide-react";

export const ClaimsAnalytics = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const statistics = DataService.getClaimStatistics();
    setStats(statistics);
  };

  if (!stats) {
    return <div>Loading analytics...</div>;
  }

  const getStatusPercentage = (count: number) => (count / stats.total) * 100;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Claims</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-600">{stats.byStatus.approved}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Area (ha)</p>
              <p className="text-2xl font-bold">{stats.totalArea.toFixed(1)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Area (ha)</p>
              <p className="text-2xl font-bold">{stats.avgArea.toFixed(1)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Claims by Status
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Pending</span>
              <span className="text-sm text-muted-foreground">
                {stats.byStatus.pending} ({getStatusPercentage(stats.byStatus.pending).toFixed(1)}%)
              </span>
            </div>
            <Progress value={getStatusPercentage(stats.byStatus.pending)} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Approved</span>
              <span className="text-sm text-muted-foreground">
                {stats.byStatus.approved} ({getStatusPercentage(stats.byStatus.approved).toFixed(1)}%)
              </span>
            </div>
            <Progress value={getStatusPercentage(stats.byStatus.approved)} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Under Review</span>
              <span className="text-sm text-muted-foreground">
                {stats.byStatus.under_review} ({getStatusPercentage(stats.byStatus.under_review).toFixed(1)}%)
              </span>
            </div>
            <Progress value={getStatusPercentage(stats.byStatus.under_review)} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Rejected</span>
              <span className="text-sm text-muted-foreground">
                {stats.byStatus.rejected} ({getStatusPercentage(stats.byStatus.rejected).toFixed(1)}%)
              </span>
            </div>
            <Progress value={getStatusPercentage(stats.byStatus.rejected)} className="h-2" />
          </div>
        </div>
      </Card>

      {/* Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Claims by Type
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{type}</Badge>
                  <span className="text-sm">
                    {type === 'IFR' ? 'Individual Forest Rights' :
                     type === 'CFR' ? 'Community Forest Rights' :
                     'Community Resource Rights'}
                  </span>
                </div>
                <span className="font-semibold">{count as number}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Claims by State
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.byState).map(([state, count]) => (
              <div key={state} className="flex items-center justify-between">
                <span className="text-sm font-medium">{state}</span>
                <span className="font-semibold">{count as number}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Status Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">{stats.byStatus.pending}</div>
          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.byStatus.approved}</div>
          <Badge className="bg-green-100 text-green-800">Approved</Badge>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">{stats.byStatus.rejected}</div>
          <Badge className="bg-red-100 text-red-800">Rejected</Badge>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.byStatus.under_review}</div>
          <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
        </Card>
      </div>
    </div>
  );
};