interface PostTagsProps {
  tags: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2.5" aria-label="Post topics">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border/70 bg-secondary/65 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-muted-foreground/85 transition-colors group-hover:border-primary/30 group-hover:bg-card/80 group-hover:text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
