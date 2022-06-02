import { Client } from '@notionhq/client'

export const fetchAll = async () => {
  const notion = new Client({
    auth: 'secret_mjHpLg7NANlMBLmUc77lqcSWtnxG7kpd4rVoJxAy9PI',
  })

  const blockId = 'Recipes-84986c51813345b39aaefcecf26a1cbb'
  const response = await notion.blocks.children.list({
    block_id: blockId,
  })
  console.log(response)
}
