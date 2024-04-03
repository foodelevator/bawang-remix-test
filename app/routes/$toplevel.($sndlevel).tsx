import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { taitanSchema } from "~/taitan";
import classes from "~/taitan.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
  const { toplevel, sndlevel } = params;
  const path = sndlevel ? `${toplevel}/${sndlevel}` : toplevel;
  const res = await fetch("https://taitan.datasektionen.se/" + path);
  return taitanSchema.parse(await res.json());
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title + " - Konglig Datasektionen" },
  ];
};

export default function Component() {
  const data = useLoaderData<typeof loader>();
  const nav = data.nav;
  const sidebar = nav.find(node => node.active || node.expanded);
  if (!sidebar) throw new Error("Got no sidebar?");
  return <div className="max-w-screen-xl mx-auto p-8 grid grid-cols-[1fr_3fr_1fr] bg-white gap-8">
    <aside>
      <h2>{sidebar.title}</h2>
      {sidebar.nav?.map(node =>
        <a
          className="text-gray-500 block"
          key={node.slug}
          href={node.slug}
        >{node.title}</a>
      )}
    </aside>
    <main className={classes.content} dangerouslySetInnerHTML={{ __html: data.body }} />
    <aside className="pt-8">
      <section className={"shadow-sm bg-neutral-50 p-8 " + classes.sidebar} dangerouslySetInnerHTML={{ __html: data.sidebar}} />
      <section className="shadow-sm bg-neutral-50 p-8">
        <h2>På den här sidan</h2>
        {data.anchors.filter(({ level }) => level > 1).map(anchor =>
          <a key={anchor.id} className="text-cerise block" style={{ marginLeft: (anchor.level - 2) + "rem" }} href={"#" + anchor.id}>{anchor.value}</a>
        )}
      </section>
    </aside>
  </div>;
}
