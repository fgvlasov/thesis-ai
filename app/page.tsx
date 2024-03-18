'use client';

import { Heading } from '@/components/heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Empty } from '@/components/ui/empty';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ThesisItem from '@/components/ThesisItem';

const mess = [
  {
    role: 'user',
    content:
      '"Imagine that you a teacher student tutor helping to student to write 3 examples \\n\\t\\tof Thesises (later in link i will insert this like a THESIS_TITLE) for diploma for Specialty: full-stack programming, for a student whom expertise is full stack developer, his interests are electronics, green energy, analyze existing topics on the Internet in the field of Research: software applications  and select the most relevant and relevant theses to modern trends.\\n\\t\\t Break your answer to a json object thesis_examples with brackets, no list numbers, because we will render it like json. \\n\\t\\t Also make second json list thesis_examples_translation with translation to finnish language. "',
  },
  {
    role: 'assistant',
    content:
      '{\n  "thesis_examples": [\n    "The impact of green energy on software development practices in full-stack programming.",\n    "Exploring the integration of electronics into modern software applications for full-stack developers.",\n    "Analyzing the role of AI in optimizing software applications for green energy solutions in full-stack programming."\n  ],\n  "thesis_examples_translation": [\n    "Vihreän energian vaikutus ohjelmistokehityskäytäntöihin täysipinopinohjelmoinnissa.",\n    "Tutkimalla elektroniikan integrointia moderniin ohjelmistosovelluksiin täysipinopinohjelmoijille.",\n    "Analysoimalla tekoälyn rooli ohjelmistosovellusten optimoinnissa vihreiden energiaratkaisujen osalta täysipinopinohjelmoinnissa."\n  ]\n}',
  },
];
// {
//   "thesis_examples": [
//     "The impact of green energy on software development practices in full-stack programming.",
//     "Exploring the integration of electronics into modern software applications for full-stack developers.",
//     "Analyzing the role of AI in optimizing software applications for green energy solutions in full-stack programming."
//   ],
//   "thesis_examples_translation": [
//     "Vihreän energian vaikutus ohjelmistokehityskäytäntöihin täysipinopinohjelmoinnissa.",
//     "Tutkimalla elektroniikan integrointia moderniin ohjelmistosovelluksiin täysipinopinohjelmoijille.",
//     "Analysoimalla tekoälyn rooli ohjelmistosovellusten optimoinnissa vihreiden energiaratkaisujen osalta täysipinopinohjelmoinnissa."
//   ]
// }

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

      const response = await axios.post('/api/', {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
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
    <div className="max-w-5xl mx-auto">
      <h1 className="text-6xl font-bold uppercase text-center my-20 mx-10 text-gradient">
        Generate thesis with AI
      </h1>
      <p className=" text-center my-20 mx-10">
        We help to student generating three thesis ideas, giving you links to
        find the same between other thesises and articles.
      </p>
      <div className="px-4 lg:px-8">
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
            {mess.map((message) => (
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
                                idx={idx}
                                lang="en"
                                key={idx}
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
                                idx={idx}
                                lang="fi"
                                key={idx}
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
      </div>
    </div>
  );
};

export default ThesisesPage;
