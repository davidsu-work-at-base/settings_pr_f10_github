import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PopoverContext = createContext(null);

export function Popover({ open, onOpenChange, modal: _modal, children }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const containerRef = useRef(null);

  const setOpen = (next) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ asChild = false, children, ...props }) {
  const { isOpen, setOpen } = useContext(PopoverContext);
  const toggle = () => setOpen(!isOpen);

  if (asChild && isValidElement(children)) {
    const child = Children.only(children);
    return cloneElement(child, {
      onClick: (event) => {
        child.props.onClick?.(event);
        toggle();
      },
    });
  }

  return (
    <button type="button" onClick={toggle} {...props}>
      {children}
    </button>
  );
}

export function PopoverContent({
  align = "center",
  side: _side,
  sideOffset: _sideOffset,
  avoidCollisions: _avoidCollisions,
  className = "",
  children,
}) {
  const { isOpen } = useContext(PopoverContext);
  if (!isOpen) return null;

  const alignClass =
    align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-1 rounded-md border border-border bg-card text-card-foreground shadow-md",
        alignClass,
        className
      )}
    >
      {children}
    </div>
  );
}