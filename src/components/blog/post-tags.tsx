interface PostTagsProps {
  tags: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Post tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border/75 bg-background/45 px-2 py-1 text-xs text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
