import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React from "react";

type Props = {};

const Notifications = (props: Props) => {
  return (
    <Button className="bg-white rounded-full py-6">
      <Bell color="#ee52cc" fill="#3352cc" />
    </Button>
  );
};

export default Notifications;
