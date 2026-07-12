interface BlogTopic {
  name: string;
  count: number;
}

interface BlogTopicListProps {
  topics: BlogTopic[];
}

export function BlogTopicList({ topics }: BlogTopicListProps) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <aside
      className="rounded-lg border border-border/75 bg-secondary/70 p-5"
      aria-labelledby="topics-heading"
    >
      <h2
        id="topics-heading"
        className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground"
      >
        Index / Topics
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
        {topics.map((topic) => (
          <li key={topic.name}>
            <span className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-card/55 px-2.5 py-1.5 font-mono text-xs text-muted-foreground">
              <span>{topic.name}</span>
              <span className="text-xs text-primary">{topic.count}</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
