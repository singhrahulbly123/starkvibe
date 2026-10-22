"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type GoogleCredentialResponse = { credential: string };
type GoogleButtonOptions = { theme: "outline"; size: "large"; width: number; text: "signin_with" };
type GoogleApi = { accounts: { id: { initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void; renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void } } };

declare global { interface Window { google?: GoogleApi } }

export function GoogleSignIn({ onCredential, onError }: { onCredential: (credential: string) => Promise<void>; onError: (message: string) => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  onCredentialRef.current = onCredential;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!clientId || !ready || initializedRef.current || !buttonRef.current || !window.google) return;
    initializedRef.current = true;
    window.google.accounts.id.initialize({ client_id: clientId, callback: (response) => onCredentialRef.current(response.credential).catch((error) => onErrorRef.current(error instanceof Error ? error.message : "Google sign-in failed.")) });
    window.google.accounts.id.renderButton(buttonRef.current, { theme: "outline", size: "large", width: 360, text: "signin_with" });
  }, [clientId, ready]);

  if (!clientId) return <p className="mt-3 text-sm text-[#8d1f1f]">Google sign-in is not configured yet.</p>;
  return <><Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setReady(true)} /><div ref={buttonRef} className="min-h-10" /><p className="mt-2 text-xs text-[#55544f]">Continue securely with Google.</p></>;
}
