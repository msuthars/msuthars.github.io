export const listClass = "flex flex-col gap-[5px] m-0 pl-5 list-disc text-[13px] leading-[1.5] text-black";

/* List items stay whole when printed */
export const itemClass = "print:break-inside-avoid";

export default function BulletList({ items }) {
  return (
    <ul className={listClass}>
      {items.map(item => <li key={item} className={itemClass}>{item}</li>)}
    </ul>
  );
}
