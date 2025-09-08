import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { WebGISAtlas } from "@/components/modules/WebGISAtlas";

const Index = () => {
  const [activeModule, setActiveModule] = useState('atlas');

  const renderModule = () => {
    switch (activeModule) {
      case 'atlas':
        return <WebGISAtlas />;
      case 'digitization':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Data Digitization Module</h2>
            <p className="text-muted-foreground">OCR + NLP processing for FRA documents will be implemented here.</p>
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <p className="text-sm">This module requires backend integration with Supabase for:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• File upload and storage</li>
                <li>• OCR processing via Edge Functions</li>
                <li>• NLP entity extraction</li>
                <li>• Database storage of extracted data</li>
              </ul>
            </div>
          </div>
        );
      case 'assets':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">AI Asset Mapping</h2>
            <p className="text-muted-foreground">Satellite imagery analysis and asset detection will be implemented here.</p>
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <p className="text-sm">This module requires backend integration for:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Google Earth Engine API integration</li>
                <li>• AI model deployment for asset detection</li>
                <li>• Geospatial data processing</li>
                <li>• Map layer generation</li>
              </ul>
            </div>
          </div>
        );
      case 'dss':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Decision Support System</h2>
            <p className="text-muted-foreground">AI-powered scheme recommendations for FRA patta holders.</p>
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <p className="text-sm">This module requires backend integration for:</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Rule engine implementation</li>
                <li>• Government scheme database</li>
                <li>• AI recommendation algorithms</li>
                <li>• Report generation</li>
              </ul>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Analytics & Reports</h2>
            <p className="text-muted-foreground">Comprehensive analytics and reporting dashboard.</p>
          </div>
        );
      case 'database':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Claims Database</h2>
            <p className="text-muted-foreground">Searchable database of all FRA claims and records.</p>
          </div>
        );
      default:
        return <WebGISAtlas />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        <main className="flex-1 overflow-hidden">
          {renderModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;