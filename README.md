# README

## Cursor 설정
Cursor의 MCP 설정 파일(`~/.cursor/mcp_config.json` 또는 프로젝트의 `.cursor/mcp.json`)에 다음을 추가합니다

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/your/calculator-server.js"]
    }
  }
}
```

또는 npm으로 설치한 경우

```json
{
  "mcpServers": {
    "calculator": {
      "command": "npx",
      "args": ["-y", "calculator-mcp-server"]
    }
  }
}
```

## 사용 방법

Cursor에서 다음과 같이 요청하면 MCP 서버의 도구를 사용할 수 있습니다
```
"25와 17을 더해줘"
"12와 8을 곱해줘"
```

## 더 실용적인 예제: 파일 시스템 MCP 서버

```
프로젝트의 README.md 파일을 읽어줘
```