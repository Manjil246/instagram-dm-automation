import { onSubscribe } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: { session_id?: string; cancel?: boolean };
};

const Page = async ({ searchParams }: Props) => {
  const { session_id, cancel } = await searchParams;
  if (session_id) {
    const costumer = await onSubscribe(session_id);
    if (costumer.status === 200) {
      return redirect("/dashboard");
    }
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Opps! Something went wrong</p>
      </div>
    );
  }

  if (cancel) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h4 className="text-5xl font-bold">404</h4>
        <p className="text-xl font-bold">Opps! Something went wrong</p>
      </div>
    );
  }
};

export default Page;
