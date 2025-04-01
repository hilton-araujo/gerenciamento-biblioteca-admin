// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true }
  }
}));
var contentlayer_config_default = makeSource({ contentDirPath: "content", documentTypes: [Post] });
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-JYLLQGV2.mjs.map
