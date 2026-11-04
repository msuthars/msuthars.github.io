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
          <ol className="skill-path">
            {path.map(step => <li key={step}>{step}</li>)}
          </ol>
        </>
      )}
      <p><strong>Current level:</strong> {level}</p>
    </>
  );
}
