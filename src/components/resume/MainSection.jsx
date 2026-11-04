/* A titled section in the main (right) column */
export default function MainSection({ title, children }) {
  return (
    <div className="main-section">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}
