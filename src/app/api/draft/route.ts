import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { getContinentById, getCountryById, getPostById } from "./utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const contentType = searchParams.get("content_type");
  const id = searchParams.get("id");

  if (secret !== process.env.DRAFT_MODE_SECRET_TOKEN || !id || !contentType) {
    return new Response("Invalid token", { status: 401 });
  }

  let href;
  try {
    switch (contentType) {
      case "post":
        const post = await getPostById(id);
        href = post?.href;
        break;
      case "country":
        const country = await getCountryById(id);
        href = country?.href;
        break;
      case "continent":
        const continent = await getContinentById(id);
        href = continent?.href;
        break;
      default:
        return new Response("Invalid content_type", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Invalid id", { status: 400 });
  }

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!href) {
    return new Response(`Could not find ${contentType} with given id`, {
      status: 404,
    });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(href);
}
