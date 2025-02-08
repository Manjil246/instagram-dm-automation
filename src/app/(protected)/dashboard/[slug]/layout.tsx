import InfoBar from "@/components/global/info-bar";
import Sidebar from "@/components/global/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const Layout = async ({ children, params }: Props) => {
  // Ensure params is awaited
  const { slug } = await params;

  return (
    <div className="p-3">
      {/* Sidebar */}
      <Sidebar slug={slug} />
      {/* InfoBar */}
      <div className="lg:ml-[250] lg:pl-10 lg:py-5 flex flex-col overflow-auto">
        <InfoBar slug={slug} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
