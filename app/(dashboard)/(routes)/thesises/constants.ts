import * as z from "zod";

export const formSchema = z.object({
  //   prompt: z.string().min(1, {
  //     message: "Prompt is required.",
  //   }),
  specialty: z.string(),
  expertise: z.string(),
  interests: z.string(),
  fieldOfResearch: z.string(),
});
