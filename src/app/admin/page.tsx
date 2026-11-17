import { redirect } from "next/navigation";

export default function AdminRedirect() {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000/api").replace(/\/api\/?$/, "");
  redirect(`${backendUrl}/admin/login`);
}
