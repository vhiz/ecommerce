import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchComp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("query"));

  function handleSubmit(e) {
    e.preventDefault();
    if (query) {
      navigate(`/search`);
      setSearchParams({ query }, { replace: true });
    } else {
      navigate(`/products/all-products`);
    }
  }
  return (
    <div className="mt-4 px-2 lg:px-20">
      <form className="join w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          id=""
          value={query || ""}
          className="input join-item grow rounded-full border-none bg-base-200 outline-none focus:outline-none"
          placeholder="Search for your products here"
        />
        <button className="btn btn-primary join-item rounded-full">
          <CiSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
}
