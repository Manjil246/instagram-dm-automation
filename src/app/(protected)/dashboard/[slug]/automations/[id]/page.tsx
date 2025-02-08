import Trigger from "@/components/global/automations/trigger";
import AutomationBreadCrumb from "@/components/global/bread-crumbs/automation-bread-crumb";
import { Warning } from "@/icons";
import React from "react";

type Props = {
  params: { id: string };
};

//wip: set some metadata

const Page = async ({ params }: Props) => {
  const { id } = await params;
  // wip: prefetch the user automation data
  return (
    <div className="flex flex-col items-center gap-y-20">
      <AutomationBreadCrumb id={id} />
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
        <div className="flex gap-x-2">
          <Warning /> When...
        </div>
        <Trigger id={id} />
      </div>
    </div>
  );
};

export default Page;
