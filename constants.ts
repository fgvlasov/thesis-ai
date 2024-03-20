import { MessageSquare } from "lucide-react";
import * as z from "zod";

export const tools = [
  {
    label: "Thesises",
    icon: MessageSquare,
    href: "/thesises",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
];
export const formSchema = z.object({
  //   prompt: z.string().min(1, {
  //     message: "Prompt is required.",
  //   }),
  specialty: z.string(),
  expertise: z.string(),
  interests: z.string(),
  fieldOfResearch: z.string(),
});
