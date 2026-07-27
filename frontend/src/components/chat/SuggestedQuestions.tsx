interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ questions, onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="text-xs text-left rounded-md border border-surface-border bg-surface-1 px-3 py-2 text-ink-secondary hover:border-signal/40 hover:text-ink-primary transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
