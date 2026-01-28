// filesystem-server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "filesystem-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "read_file",
          description: "파일 내용을 읽습니다",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string" },
            },
            required: ["path"],
          },
        },
        {
          name: "list_directory",
          description: "디렉토리 목록을 조회합니다",
          inputSchema: {
            type: "object",
            properties: {
              path: { type: "string" },
            },
            required: ["path"],
          },
        },
      ],
    };
  });

  // 서버 시작
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Calculator MCP Server running on stdio");
}

main();