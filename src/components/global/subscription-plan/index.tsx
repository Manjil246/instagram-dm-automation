import React from "react";

type Props = {
  type: "FREE" | "PRO";
  children: React.ReactNode;
};

const SubscriptionPlan = ({ children, type }: Props) => {
  // WIP
  return <>{children}</>;
};

export default SubscriptionPlan;
