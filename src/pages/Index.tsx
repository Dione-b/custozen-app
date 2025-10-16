import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Insumos from "@/components/Insumos";
import Produtos from "@/components/Produtos";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";

const Index = () => {
  const [activeTab, setActiveTab] = useState("inicio");

  const renderContent = () => {
    switch (activeTab) {
      case "inicio":
        return <Dashboard />;
      case "insumos":
        return <Insumos />;
      case "produtos":
        return <Produtos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ResponsiveLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </ResponsiveLayout>
  );
};

export default Index;
