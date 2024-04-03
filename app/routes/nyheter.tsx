import { useLoaderData } from "@remix-run/react";
import { z } from "zod";

const calypsoSchema = z.object({
  content: z.array(z.object({
    id: z.number(),
    itemType: z.enum(["EVENT", "POST"]),
    updated: z.string().refine(updated => new Date(updated)),
    titleSwedish: z.string(),
    titleEnglish: z.string(),
    author: z.string(),
    authorDisplay: z.string(),
    publishAs: z.string().nullable(),
    publishAsDisplay: z.null(),
    sticky: z.boolean(),
    sensitive: z.boolean(),
    publishDate: z.string().refine(publishDate => new Date(publishDate)),
    contentSwedish: z.string(),
    contentEnglish: z.string(),
    eventLocation: z.string().nullable(),
    eventStartTime: z.string().nullable(),
    eventEndTime: z.string().nullable(),
    facebookEvent: z.string(),
    googleForm: z.string(),
    publishStatus: z.enum(["PUBLISHED"]),
  })),
});

export async function loader() {
  const res = await fetch("https://calypso.datasektionen.se/api/list");
  const body = await res.json();
  return calypsoSchema.parse(body);
}

export default function Component() {
  const news = useLoaderData<typeof loader>();

  return <main>
    {news.content.map(item => <article key={item.id} className="p-10">
      <h2>{item.titleSwedish}</h2>
      <div dangerouslySetInnerHTML={{ __html: item.contentSwedish }}></div>
    </article>)}
  </main>;
}
