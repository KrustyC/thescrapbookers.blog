import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types";

import { crimsonText } from "@/utils/fonts";

import {
  Asset,
  Bold,
  Heading,
  Hyperlink,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "./Blocks";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (block) => <Asset block={block} />,
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <Hyperlink href={data.uri}>{children}</Hyperlink>
    ),
    [BLOCKS.PARAGRAPH]: (_, children: any) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (_, children: any) => (
      <Heading size={1}>{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (_, children: any) => (
      <Heading size={2}>{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (_, children: any) => (
      <Heading size={3}>{children}</Heading>
    ),
    [BLOCKS.HEADING_4]: (_, children: any) => (
      <Heading size={4}>{children}</Heading>
    ),
    [BLOCKS.HEADING_5]: (_, children: any) => (
      <Heading size={5}>{children}</Heading>
    ),
    [BLOCKS.HEADING_6]: (_, children: any) => (
      <Heading size={6}>{children}</Heading>
    ),
    [BLOCKS.OL_LIST]: (_, children: any) => (
      <OrderedList>{children}</OrderedList>
    ),
    [BLOCKS.UL_LIST]: (_, children: any) => (
      <UnorderedList>{children}</UnorderedList>
    ),
    [BLOCKS.LIST_ITEM]: (node) => {
      const UnTaggedChildren = documentToReactComponents(
        node as unknown as any,
        {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (_, children) => children,
            [BLOCKS.LIST_ITEM]: (_, children) => children,
            [INLINES.HYPERLINK]: ({ data }, children) => (
              <Hyperlink href={data.uri}>{children}</Hyperlink>
            ),
          },
        }
      );

      return <ListItem>{UnTaggedChildren}</ListItem>;
    },
  },
};

export const RichText: React.FC<{ richtext: Document }> = ({ richtext }) => {
  return (
    <div style={crimsonText.style} className="flex flex-col gap-y-4 text-2xl break-words">
      {documentToReactComponents(richtext, options)}
    </div>
  );
};
