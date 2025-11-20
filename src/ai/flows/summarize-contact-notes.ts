'use server';
/**
 * @fileOverview AI-powered summarization tool for contact notes, focusing on identifying the 'next steps'.
 *
 * - summarizeContactNotes - A function that handles the contact notes summarization process.
 * - SummarizeContactNotesInput - The input type for the summarizeContactNotes function.
 * - SummarizeContactNotesOutput - The return type for the summarizeContactNotes function.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SummarizeContactNotesInputSchema = z.object({
  notes: z
    .string()
    .describe('The contact notes to summarize.'),
});
export type SummarizeContactNotesInput = z.infer<typeof SummarizeContactNotesInputSchema>;

const SummarizeContactNotesOutputSchema = z.object({
  summary: z
    .string()
    .describe('The summarized contact notes, focusing on the next steps.'),
});
export type SummarizeContactNotesOutput = z.infer<typeof SummarizeContactNotesOutputSchema>;

export async function summarizeContactNotes(input: SummarizeContactNotesInput): Promise<SummarizeContactNotesOutput> {
  return summarizeContactNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContactNotesPrompt',
  input: {schema: SummarizeContactNotesInputSchema},
  output: {schema: SummarizeContactNotesOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing contact notes and identifying the next steps.

  Summarize the following contact notes, focusing on the key insights and actions required. Specifically, identify and clearly state the "next steps" that should be taken based on the notes.

  Contact Notes: {{{notes}}}`,
});

const summarizeContactNotesFlow = ai.defineFlow(
  {
    name: 'summarizeContactNotesFlow',
    inputSchema: SummarizeContactNotesInputSchema,
    outputSchema: SummarizeContactNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
