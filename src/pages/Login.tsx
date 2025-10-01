import React from "react";

export default function Login(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Sign in to UFDR</h1>
        <form className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Email" />
          <input className="w-full p-2 border rounded" placeholder="Password" type="password" />
          <button className="w-full px-4 py-2 bg-[var(--primary)] text-white rounded">Sign in</button>
        </form>
      </div>
    </div>
  );
}
