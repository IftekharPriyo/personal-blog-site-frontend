export function BlogEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-border/80 bg-secondary/65 px-6 py-12 text-center">
      <h2 className="text-xl font-semibold">No posts published yet</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        Add MDX files to the local content folder and they will appear here
        automatically.
      </p>
    </div>
  );
}
