import { Client } from '@notionhq/client'

export const fetchAll = async () => {
  const notion = new Client({
    auth: 'NOTION_AUTH',
  })

  const blockId = 'NOTION_BLOCK_ID'
  const response = await notion.blocks.children.list({
    block_id: blockId,
  })
  console.log(response)
}
