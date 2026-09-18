# @chantezy/mcp-product-design

产品设计师专用 MCP 服务 —— 将 [chantezy/product-skills](https://github.com/chantezy/product-skills) 仓库中的结构化技能通过 MCP 协议暴露给 AI 编码助手。

## 可用技能

| 技能 | 用途 |
|------|------|
| `requirements-content-analysis` | 需求内容结构化解析与交互设计分析 |
| `b-design-diverge` | B端设计方案快速发散与多方案对比 |
| `interaction-design-eval` | 交互设计量化评估与职级匹配 |
| `interaction-spec` | 交互说明文档生成 |
| `prd-generator` | PRD 需求文档生成 |
| `prd-lint` | PRD 逻辑评审与跨文档冲突检测 |

## MCP 工具

| 工具 | When to use |
|------|-------------|
| `list_skills` | 当用户意图不明确或无法确定该用哪个技能时调用，返回全部技能的标题和描述供用户选择；当用户想要浏览所有可用技能时也可调用 |
| `get_skill` | 当用户明确指定了技能名称时调用；或在 `list_skills` 后用户选定了某个技能时调用，获取完整的工作流程和输出模板。同一技能只需调用一次，内容会缓存在内存中 |
| `get_reference` | 当技能的 SKILL.md 中引用了某个参考资料，且需要读取该资料以完成工作流程时调用 |

## 使用方法

### 1. 配置 IDE MCP

在 MCP 配置文件中添加：

```json
{
  "mcpServers": {
    "product-design": {
      "command": "npx",
      "args": ["-y", "@chantezy/mcp-product-design@latest"]
    }
  }
}
```

各 IDE 配置文件位置：
- **WorkBuddy**: `~/.workbuddy/mcp.json`
- **Cursor**: `~/.cursor/mcp.json`
- **Claude Code**: `~/.claude/mcp.json`
