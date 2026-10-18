import { notFound } from "next/navigation";
import { getLink, registerClick } from "@/lib/store";
import RedirectClient from "./redirect-client";

export default async function SlugPage({
  params
}: {
  params: { slug: string };
}) {
  const record = await getLink(params.slug);
  if (!record) notFound();

  // Fire-and-forget click count; never blocks the redirect.
  registerClick(record.slug).catch(() => {});

  return <RedirectClient destination={record.url} slug={record.slug} />;
}
