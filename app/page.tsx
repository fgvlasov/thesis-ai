'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Empty } from '@/components/ui/empty';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import ThesisItem from '@/components/ThesisItem';
import { Card, CardFooter } from '@/components/ui/card';
import { Download } from 'lucide-react';

const formSchema = z.object({
  //   prompt: z.string().min(1, {
  //     message: "Prompt is required.",
  //   }),
  specialty: z.string(),
  expertise: z.string(),
  interests: z.string(),
  fieldOfResearch: z.string(),
});

interface ChatMessage {
  role: 'user' | 'system'; // Assuming these are your message source types
  content: string; // The text content of the message
}

const ThesisesPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //prompt: "",
      specialty: '',
      expertise: '',
      interests: '',
      fieldOfResearch: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Aggregate all form fields into one comprehensive prompt
      const fullPrompt =
        `Imagine that you a teacher student tutor helping to student to write 3 examples 
		of Thesises (later in link i will insert this like a THESIS_TITLE) for diploma for Specialty: ${values.specialty}` +
        `, for a student whom expertise is ${values.expertise}` +
        `, his interests are ${values.interests}` +
        `, analyze existing topics on the Internet in the field of Research: ${values.fieldOfResearch} ` +
        ` and select the most relevant and relevant theses to modern trends.
		 Break your answer to a json object thesis_examples with brackets, no list numbers, because we will render it like json. 
		 Also make second json list thesis_examples_translation with translation to finnish language. `;

      const userMessage: ChatMessage = {
        role: 'user',
        content: JSON.stringify(fullPrompt),
      };
      const newMessages = [...messages, userMessage];

      console.log(messages);

      const response = await axios.post('/api/thesises', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      //form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-4
              "
          >
            {/* Specialty field */}
            <FormField
              name="specialty"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormControl className="m-0 p-2">
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
                <FormItem className="col-span-12 md:col-span-6">
                  <FormControl className="m-0 p-2">
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
                <FormItem className="col-span-12 md:col-span-6">
                  <FormControl className="m-0 p-2">
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
                <FormItem className="col-span-12 md:col-span-6">
                  <FormControl className="m-0 p-2">
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
              className="col-span-12 lg:col-span-4 lg:col-start-5 w-full bg-custom-gradient rounded-buttonRadius color-black text-1xl"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              GENERATE
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
              className="p-8 w-full flex flex-col items-start gap-x-8 rounded-lg"
            >
              {(() => {
                try {
                  const jsonData = JSON.parse(message.content);
                  return (
                    <>
                      <div>
                        <h3 className="text-lg font-bold my-4 mx-12">
                          Thesis Examples:
                        </h3>

                        {jsonData.thesis_examples?.map(
                          (thesis: string, idx: number) => (
                            <ThesisItem
                              thesis={thesis}
                              idx={`en-${idx}`}
                              lang="en"
                              key={`en-${idx}`}
                            />
                          )
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold my-4 mx-12">
                          Thesis Examples in Finnish:
                        </h3>
                        {jsonData.thesis_examples_translation?.map(
                          (translation: string, idx: number) => (
                            <ThesisItem
                              thesis={translation}
                              idx={`fi-${idx}`}
                              lang="fi"
                              key={`fi-${idx}`}
                            />
                          )
                        )}
                      </div>
                    </>
                  );
                } catch (e) {
                  return <p>Error parsing AI response.</p>;
                }
              })()}
            </div>
          ))}
        </div>
      </div>

      {/* {photos.length === 0 && !isLoading && (
        <Empty label="No images generated." />
      )} */}
      {photos.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (
            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default ThesisesPage;
