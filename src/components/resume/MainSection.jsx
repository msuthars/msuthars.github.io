/* A titled section in the main (right) column */
export default function MainSection({ title, children }) {
  return (
    <div className="flex flex-col gap-[15px] pt-5 border-t border-black">
      <h2 className="m-0 text-[15px] font-bold uppercase text-black print:break-after-avoid">{title}</h2>
      {children}
    </div>
  );
}
