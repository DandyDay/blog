import { UserConfig } from "./src/config"

const userConfig: UserConfig = {
    base_url: "https://notion-hugo.pages.dev",
    mount: {
        manual: false,
        page_url: 'https://www.notion.so/jinhchoi/Notion-Hugo-2035dc1628d0801980eafdfe2a19b6aa?source=copy_link',
        pages: [
            // {
            //     page_id: '<page_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }
            {
                page_id: '45eb121158b9489480ec000fd25c812b',
                target_folder: '.'
            }
        ],
        databases: [
            // {
            //     database_id: '<database_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }
            {
                database_id: 'b7b1816c05ec464391c8c111fa242985',
                target_folder: '.'
            }
        ],
    }
}

export default userConfig;
