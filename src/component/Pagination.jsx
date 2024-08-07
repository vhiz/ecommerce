import { useSearchParams } from "react-router-dom";

export default function Pagination({ currentPage, hasNext, hasPrev }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const replaceSearchParams = (newParams) => {
    const params = new URLSearchParams(newParams);
    setSearchParams(params, { replace: true });
  };
  return (
    <div className="join grid grid-cols-2 w-60 p-4">
      <button
        className="join-item btn btn-outline"
        disabled={!hasPrev}
        onClick={() => replaceSearchParams({ page: currentPage - 1 })}
      >
        Previous
      </button>
      <button
        className="join-item btn btn-outline"
        disabled={!hasNext}
        onClick={() => replaceSearchParams({ page: currentPage + 1 })}
      >
        Next
      </button>
    </div>
  );
}
