import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";
export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputs, setInputs] = useState({
    min: searchParams.get("min") || 0,
    max: searchParams.get("max") || 9999999999,
    sort: searchParams.get("sort") || "asc lastUpdated",
    query: searchParams.get("query") || "",
  });

  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const debouncedSetSearchParams = useCallback(
    debounce((newParams) => {
      setSearchParams(newParams);
    }, 1000),
    []
  );

  useEffect(() => {
    if (isUserInteracted) {
      debouncedSetSearchParams(inputs);
    }
  }, [inputs, isUserInteracted, debouncedSetSearchParams]);

  function handleChange(e) {
    setIsUserInteracted(true);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="flex flex-col gap-2 px-2 md:flex-row">
      <div className="flex items-center gap-3">
        <select
          onChange={handleChange}
          name="sort"
          value={inputs.sort}
          className="select select-bordered select-sm w-full max-w-[10rem] rounded-full"
        >
          <option value={"desc"} disabled selected>
           sort
          </option>
          <option value={"asc price"}>Price (low to high)</option>
          <option value={"desc price"}>Price (high to Low)</option>
          <option value={"asc lastUpdated"}>Newest</option>
          <option value={"desc lastUpdated"}>Oldest</option>
        </select>
        <input
          type="number"
          min={0}
          placeholder="Min"
          value={inputs.min}
          name="min"
          onChange={handleChange}
          className="input input-sm input-bordered w-full max-w-[10rem] rounded-full"
        />
        <input
          type="number"
          min={0}
          value={inputs.max}
          name="max"
          onChange={handleChange}
          placeholder="Max"
          className="input input-sm input-bordered w-full max-w-[10rem] rounded-full"
        />
      </div>
    </div>
  );
}
