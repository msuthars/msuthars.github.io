/* Learning path chip; an arrow sits in the gap before each step, outside the chip border */
function pathStep(last) {
  return [
    "relative py-1.5 px-2.5 border rounded-md font-mono text-2xs",
    "not-first:ml-[18px] not-first:before:content-['→'] not-first:before:absolute not-first:before:-left-[21px] not-first:before:text-muted-2",
    last ? "border-accent-line bg-accent-soft text-accent" : "border-line-strong text-ink"
  ].join(" ");
}

/* Modal body for a skill, shared by the skill tree and the inventory */
export default function SkillDetail({ skill }) {
  const [, category, level, description, path] = skill;

  return (
    <>
      <p><strong>{category}</strong></p>
      <p>{description}</p>
      {path && (
        <>
          <p><strong>Path:</strong></p>
          <ol className="flex flex-wrap items-center gap-2 mt-0 mb-4 p-0 list-none">
            {path.map((step, index) => <li key={step} className={pathStep(index === path.length - 1)}>{step}</li>)}
          </ol>
        </>
      )}
      <p><strong>Current level:</strong> {level}</p>
    </>
  );
}
