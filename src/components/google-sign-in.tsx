"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type GoogleCredentialResponse = { credential: string };
type GoogleButtonOptions = { theme: "outline"; size: "large"; width: number; text: "signin_with" };
type GoogleApi = { accounts: { id: { initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void; use_fedcm_for_prompt?: boolean }) => void; renderButton: (element: HTMLElement, options: GoogleButtonOptions) => void; prompt: () => void } } };

declare global { interface Window { google?: GoogleApi } }

export function GoogleSignIn({ onCredential, onError }: { onCredential: (credential: string) => Promise<void>; onError: (message: string) => void }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !ready || !buttonRef.current || !window.google) return;
    buttonRef.current.innerHTML = "";
    window.google.accounts.id.initialize({ client_id: clientId, use_fedcm_for_prompt: false, callback: (response) => onCredential(response.credential).catch((error) => onError(error instanceof Error ? error.message : "Google sign-in failed.")) });
    window.google.accounts.id.renderButton(buttonRef.current, { theme: "outline", size: "large", width: 360, text: "signin_with" });
    window.google.accounts.id.prompt();
  }, [clientId, onCredential, onError, ready]);

  if (!clientId) return <p className="mt-3 text-sm text-[#8d1f1f]">Google sign-in is not configured yet.</p>;
  return <><Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setReady(true)} /><div ref={buttonRef} className="min-h-10" /><p className="mt-2 text-xs text-[#55544f]">Continue securely with Google.</p></>;
}
