export default function QuestDetail({ quest }) {
  return (
    <>
      <p><strong>Mission:</strong> {quest.mission}</p>
      <p><strong>{quest.systemsLabel || "Battle systems"}:</strong></p>
      <ul className="modal-list">
        {quest.systems.map(item => <li key={item}>{item}</li>)}
      </ul>
      <p><strong>Stack:</strong> {quest.tags.join(" · ")}</p>
      <p><strong>Reward:</strong> +{quest.reward} XP</p>
      {quest.link && (
        <p><a className="btn" href={quest.link[1]} target="_blank" rel="noopener">{quest.link[0]}</a></p>
      )}
    </>
  );
}
