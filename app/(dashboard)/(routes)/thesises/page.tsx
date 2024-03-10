"use client";

import { MessageSquare } from "lucide-react";
import { Heading } from "@/components/heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/ui/empty";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "system"; // Assuming these are your message source types
  content: string; // The text content of the message
}

const ThesisesPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //prompt: "",
      specialty: "",
      expertise: "",
      interests: "",
      fieldOfResearch: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Aggregate all form fields into one comprehensive prompt
      const fullPrompt =
        `Answer in md code. Imagine that you a teacher student tutor helping to student to write 3 examples of Thesises (later in link i will insert this like a THESIS_TITLE) for diploma for Specialty: ${values.specialty}` +
        `, for a student whom expertise is ${values.expertise}` +
        `, his interests are ${values.interests}` +
        `, in the field of Research: ${values.fieldOfResearch}` +
        `, analyze existing topics on the Internet and select the most relevant and relevant theses to modern trends,
		 also add a link for each opening in new tab like: 
		 -- THESIS_TITLE - [Check in Theseus.fi](https://www.theseus.fi/discover?scope=%2F&query=THESIS_TITLE)
		 Also make second same list with links but translate to finnish language. 
		 `;
      const userMessage: ChatMessage = {
        role: "user",
        content: fullPrompt,
      };
      const newMessages = [...messages, userMessage];

      console.log(newMessages);

      const response = await axios.post("/api/thesises", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Generate Thesis"
        description="Our most advanced thesis generation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              {/* <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Where to find a job?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
              {/* Specialty field */}
              <FormField
                name="specialty"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Specialty"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Expertise field */}
              <FormField
                name="expertise"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Expertise"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Interests field */}
              <FormField
                name="interests"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Interests"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Field of Research */}
              <FormField
                name="fieldOfResearch"
                render={({ field }) => (
                  <FormItem className="col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Field of Research"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Find
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              Loading...
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className="p-8 w-full flex items-start gap-x-8 rounded-lg"
              >
                {message.role}
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThesisesPage;
