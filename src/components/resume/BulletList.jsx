export default function BulletList({ items }) {
  return (
    <ul className="main-list">
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
