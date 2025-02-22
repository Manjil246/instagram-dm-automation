import { getAutomationInfo } from "@/actions/automations";
import PostNode from "@/components/global/automations/posts/node";
import ThenNode from "@/components/global/automations/then/node";
import Trigger from "@/components/global/automations/trigger";
import AutomationBreadCrumb from "@/components/global/bread-crumbs/automation-bread-crumb";
import Sidebar from "@/components/global/sidebar";
import { Warning } from "@/icons";
import { client } from "@/lib/prisma";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { title } from "process";
import React from "react";

type Props = {
  params: { id: string };
};

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const info = await getAutomationInfo(params.id);
//   return {
//     title: info.data?.name,
//   };
// }

const Page = async ({ params }: Props) => {
  const { id } = await params;

  const client = new QueryClient();
  await PrefetchUserAutomation(client, id);

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadCrumb id={id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1d1d1d] gap-y-3">
          <div className="flex gap-x-2">
            <Warning /> When...
          </div>
          <Trigger id={id} />
        </div>
        <ThenNode id={id} />
        <PostNode id={id} />
      </div>
    </HydrationBoundary>
  );
};

export default Page;
