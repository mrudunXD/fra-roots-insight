import { useState } from "react";
import { 
  Map, 
  Database, 
  Brain, 
  FileText, 
  BarChart3, 
  Layers,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export const Sidebar = ({ activeModule, onModuleChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const modules = [
    { id: 'atlas', label: 'WebGIS Atlas', icon: Map, description: 'Interactive mapping platform' },
    { id: 'digitization', label: 'Data Digitization', icon: FileText, description: 'OCR & NLP processing' },
    { id: 'assets', label: 'Asset Mapping', icon: Layers, description: 'AI satellite analysis' },
    { id: 'dss', label: 'Decision Support', icon: Brain, description: 'Scheme recommendations' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Reports & insights' },
    { id: 'database', label: 'Claims Database', icon: Database, description: 'FRA records' },
  ];

  const quickStats = [
    { label: 'Total Claims', value: '12,450', icon: FileText },
    { label: 'Active Villages', value: '1,847', icon: Users },
    { label: 'Verified Rights', value: '9,320', icon: Shield },
  ];

  return (
    <aside className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-4"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {!isCollapsed && (
          <div className="space-y-6">
            {/* Navigation Modules */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">CORE MODULES</h3>
              <div className="space-y-2">
                {modules.map((module) => (
                  <Button
                    key={module.id}
                    variant={activeModule === module.id ? "default" : "ghost"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => onModuleChange(module.id)}
                  >
                    <module.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium">{module.label}</div>
                      <div className="text-xs text-muted-foreground">{module.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">QUICK OVERVIEW</h3>
              <div className="space-y-3">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-primary">{stat.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pilot States */}
            <Card className="p-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">PILOT STATES</h3>
              <div className="space-y-2">
                {['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'].map((state) => (
                  <div key={state} className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-success rounded-full"></div>
                    <span className="text-sm">{state}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {isCollapsed && (
          <div className="space-y-2">
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={activeModule === module.id ? "default" : "ghost"}
                size="icon"
                onClick={() => onModuleChange(module.id)}
                title={module.label}
              >
                <module.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};