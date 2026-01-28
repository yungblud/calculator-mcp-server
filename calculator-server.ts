// calculator-server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "calculator-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 도구 목록 제공
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add",
        description: "두 숫자를 더합니다",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number" },
            b: { type: "number" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "multiply",
        description: "두 숫자를 곱합니다",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number" },
            b: { type: "number" },
          },
          required: ["a", "b"],
        },
      },
    ],
  };
});

// 도구 실행 처리
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "add") {
    const result = args.a + args.b;
    return {
      content: [
        {
          type: "text",
          text: `${args.a} + ${args.b} = ${result}`,
        },
      ],
    };
  } else if (name === "multiply") {
    const result = args.a * args.b;
    return {
      content: [
        {
          type: "text",
          text: `${args.a} × ${args.b} = ${result}`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Calculator MCP Server running on stdio");
}

main();
