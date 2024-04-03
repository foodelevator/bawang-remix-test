import { z } from "zod";

const baseNodeSchema = z.object({
  title: z.string(),
  slug: z.string(),
  active: z.boolean().optional(),
  expanded: z.boolean().optional(),
  sort: z.number().optional(),
});

type Node = z.infer<typeof baseNodeSchema> & {
  nav?: Node[],
};

const nodeSchema: z.ZodType<Node> = baseNodeSchema.extend({
  nav: z.lazy(() => nodeSchema.array().optional()),
});

export const taitanSchema = z.object({
  title: z.string(),
  slug: z.string(),
  updated_at: z.string(),
  body: z.string(),
  sidebar: z.string(),
  nav: nodeSchema.array(),
  anchors: z.array(z.object({
    id: z.string(),
    value: z.string(),
    level: z.number(),
  })),
});

export type Taitan = z.infer<typeof taitanSchema>;
