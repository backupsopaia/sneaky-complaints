
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Building, FileText, Settings, Layout } from "lucide-react";

interface AdminTabNavigationProps {
  activeTab: string;
}

const AdminTabNavigation = ({ activeTab }: AdminTabNavigationProps) => {
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    if (value === "companies") {
      navigate("/admin-dashboard");
    } else if (value === "reports") {
      navigate("/admin-dashboard?tab=reports");
    } else if (value === "settings") {
      navigate("/admin-dashboard?tab=settings");
    } else if (value === "content") {
      navigate("/content-management");
    }
  };

  return (
    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
      <TabsTrigger 
        value="companies" 
        onClick={() => handleTabChange("companies")}
        className={activeTab === "companies" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <Building className="w-4 h-4 mr-2" />
        Empresas
      </TabsTrigger>
      <TabsTrigger 
        value="reports" 
        onClick={() => handleTabChange("reports")}
        className={activeTab === "reports" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <FileText className="w-4 h-4 mr-2" />
        Relatórios
      </TabsTrigger>
      <TabsTrigger 
        value="content" 
        onClick={() => handleTabChange("content")}
        className={activeTab === "content" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <Layout className="w-4 h-4 mr-2" />
        Conteúdo
      </TabsTrigger>
      <TabsTrigger 
        value="settings" 
        onClick={() => handleTabChange("settings")}
        className={activeTab === "settings" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <Settings className="w-4 h-4 mr-2" />
        Configurações
      </TabsTrigger>
    </TabsList>
  );
};

export default AdminTabNavigation;
