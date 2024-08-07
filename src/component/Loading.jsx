export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="skeleton h-72 w-60 rounded-md"/>
      <div className="skeleton h-5 w-52 rounded-md"/>
      <div className="skeleton h-5 w-40 rounded-md"/>
    </div>
  );
}
