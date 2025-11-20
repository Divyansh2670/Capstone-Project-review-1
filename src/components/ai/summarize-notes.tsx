'use client';

import { summarizeContactNotes } from '../../ai/flows/summarize-contact-notes';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Loader2, Wand2, Terminal } from 'lucide-react';
import { useState } from 'react';

export function SummarizeNotes({ notes }: { notes: string }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    setError('');
    try {
      const result = await summarizeContactNotes({ notes });
      setSummary(result.summary);
    } catch (e) {
      console.error(e);
      setError('Failed to generate summary. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-6 border-t pt-6">
      <Button
        onClick={handleSummarize}
        disabled={isLoading || !notes}
        variant="outline"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Summarize Next Steps
      </Button>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <Card className="mt-4 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wand2 className="h-5 w-5 text-primary" />
              AI Summary
            </CardTitle>
            <CardDescription>
              Key insights and next steps identified by AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {summary}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
