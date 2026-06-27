export function SectionHeading({
  kicker,
  title,
  children
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
      <p className="mb-3 text-sm font-medium text-accent">{kicker}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {children ? <p className="text-pretty mx-auto mt-4 max-w-2xl text-base leading-8 text-muted">{children}</p> : null}
    </div>
  );
}
