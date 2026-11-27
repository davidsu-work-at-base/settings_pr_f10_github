import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";

export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-destructive/10 mb-4">
          <UserX className="w-7 h-7 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">No access to this app</h1>
        <p className="text-muted-foreground mt-2">
          You're signed in, but this account isn't registered for this app. Ask an admin to invite you, or sign in
          with another account.
        </p>
        <Button className="mt-6 h-11 px-6" onClick={() => base44.auth.logout()}>
          Sign out
        </Button>
      </div>
    </div>
  );
}