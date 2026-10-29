export default function Toast({ message, show }) {
  return <div id="toast" className={`toast${show ? " show" : ""}`}>{message}</div>;
}
