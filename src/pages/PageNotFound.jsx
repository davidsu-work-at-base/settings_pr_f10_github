import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-2">Page not found</h1>
        <p className="text-muted-foreground mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block mt-6 text-sm font-medium text-primary hover:underline">
          Back to the app
        </Link>
      </div>
    </div>
  );
}