import { useEffect, useState } from "react";
import { GoMoon, GoSun } from "react-icons/go";

export default function Toggle() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const [isDark, setIsDark] = useState(
      JSON.parse(localStorage.getItem("isDark")) || mediaQuery.matches
        ? "business"
        : "winter"
    );
  
    useEffect(() => {
      localStorage.setItem("isDark", JSON.stringify(isDark));
    }, [isDark]);
  
    return (
      <label className="swap swap-rotate text-2xl mx-2 btn btn-circle btn-ghost">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          value="business"
          checked={isDark === "business"}
          onChange={() =>
            setIsDark(isDark === "business" ? "winter" : "business")
          }
        />
  
        {/* sun icon */}
        <GoSun className="swap-off fill-current" />
  
        {/* moon icon */}
        <GoMoon className="swap-on fill-current" />
      </label>
    );
}
