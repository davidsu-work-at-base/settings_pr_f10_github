import { createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const OtpContext = createContext({ value: "" });

export function InputOTP({
  id,
  maxLength = 6,
  value = "",
  onChange,
  autoFocus = false,
  autoComplete,
  containerClassName,
  className,
  onKeyDown,
  children,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleChange = (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, maxLength);
    onChange?.(digits);
  };

  return (
    <OtpContext.Provider value={{ value }}>
      <div className={cn("relative flex items-center", containerClassName)}>
        <div className={cn("flex items-center gap-2", className)}>{children}</div>
        <input
          ref={inputRef}
          id={id}
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          inputMode="numeric"
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-label="One-time code"
          className="absolute inset-0 h-full w-full cursor-text bg-transparent opacity-0 outline-none"
        />
      </div>
    </OtpContext.Provider>
  );
}

export function InputOTPGroup({ className = "", children }) {
  return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}

export function InputOTPSlot({ index, className = "" }) {
  const { value } = useContext(OtpContext);
  const char = value?.[index] ?? "";

  return (
    <div
      className={cn(
        "relative flex h-11 w-10 items-center justify-center rounded-md border border-input bg-background text-base font-medium shadow-sm transition-colors",
        className
      )}
    >
      {char}
    </div>
  );
}