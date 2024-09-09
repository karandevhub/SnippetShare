"use client";

import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton() {
  return (
    <div className="w-full flex justify-center mt-4">

        <GoogleLogin
        width={300}
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
    
    </div>
  );
}
