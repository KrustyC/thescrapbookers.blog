import { draftMode, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  draftMode().disable();

  const headersList = headers();
  const referer = headersList.get("referer");

  redirect(referer || "/");
}
