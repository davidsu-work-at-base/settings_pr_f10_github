import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CommandContext = createContext(null);

const defaultFilter = (value, search) => (value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0);

export function Command({ filter = defaultFilter, className = "", children }) {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const register = useCallback((value) => {
    setItems((current) => (current.includes(value) ? current : [...current, value]));
    return () => setItems((current) => current.filter((item) => item !== value));
  }, []);

  const matches = items.filter((value) => filter(value, search) > 0).length;

  return (
    <CommandContext.Provider value={{ search, setSearch, filter, register, matches }}>
      <div className={cn("flex h-full w-full flex-col overflow-hidden", className)}>{children}</div>
    </CommandContext.Provider>
  );
}

export function CommandInput({ className = "", onValueChange, ...props }) {
  const { search, setSearch } = useContext(CommandContext);

  return (
    <div className="flex items-center border-b border-border px-3">
      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          onValueChange?.(event.target.value);
        }}
        className={cn(
          "flex h-9 w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className = "", children }) {
  return <div className={cn("max-h-64 overflow-y-auto p-1", className)}>{children}</div>;
}

export function CommandEmpty({ className = "", children }) {
  const { matches, search } = useContext(CommandContext);
  if (!search || matches > 0) return null;

  return <div className={cn("py-4 text-center text-sm text-muted-foreground", className)}>{children}</div>;
}

export function CommandGroup({ className = "", children }) {
  return <div className={cn("p-1", className)}>{children}</div>;
}

export function CommandItem({ value, onSelect, className = "", children }) {
  const { search, filter, register } = useContext(CommandContext);

  useEffect(() => register(String(value)), [value, register]);

  if (filter(String(value), search) <= 0) return null;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(String(value))}
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-muted focus:bg-muted focus:outline-none",
        className
      )}
    >
      {children}
    </button>
  );
}