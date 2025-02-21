import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonth = (month: number): string => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month - 1] || "Invalid month";
};

export const duplicationValidation = (arr: string[], el: string) => {
  if (!arr.includes(el)) {
    arr.push(el);
    return arr;
  } else {
    arr = arr.filter((t) => t !== el);
    return arr;
  }
};
