"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { CreditCardIcon, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const PaymentButton = (props: Props) => {
  const { isProcessing, onSubscribe } = useSubscription();
  return (
    <Button
      disabled={isProcessing}
      onClick={onSubscribe}
      className="bg-gradient-to-br text-white rounded-full from-[#9685db] via-[#9434e6] to-[#cc3bd4]"
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
      Upgrade
    </Button>
  );
};

export default PaymentButton;
