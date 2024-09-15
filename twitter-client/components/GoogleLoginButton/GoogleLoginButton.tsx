"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface GoogleLoginProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
  onError: () => void;
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
}: GoogleLoginProps) {
  return (
    <div className="w-full flex justify-center mt-4">
      <GoogleLogin width={300} onSuccess={onSuccess} onError={onError} />
    </div>
  );
}
