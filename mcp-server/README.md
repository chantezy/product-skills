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

## MCP 工具

| 工具 | 描述 |
|------|------|
| `route_intent` | 意图路由器：根据用户输入快速匹配最合适的技能（基于关键词匹配，不加载完整 Skill 内容） |
| `list_skills` | 列出所有可用技能及其触发条件 |
| `get_skill` | 获取指定技能的完整工作流程和输出模板 |
| `get_reference` | 获取技能的资料文件（评分标准、设计原则等） |

### 工具调用策略

```
1. 优先调用 route_intent 传入用户意图，做快速匹配
   - 高置信度：直接返回最佳技能，随后调用 get_skill
   - 中置信度：返回 top-3 候选，由用户确认后调用 get_skill
   - 兜底：返回全部技能列表让用户选择
2. 当用户明确指定技能名称时，直接调用 get_skill
3. 仅当需要浏览全部技能时才调用 list_skills
4. 按需调用 get_reference 获取领域知识
5. 已加载的技能内容会缓存在内存中，无需重复调用 get_skill
```

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

## 更新机制

1. 修改 `chantezy/product-skills` 仓库中的任意 skill 文件
2. Push 到 main 分支
3. GitHub Actions 自动检测内容变更，构建并发布到 npm
4. 重启 IDE 即可自动获取最新版本

## 开发

```bash
# 同步 skills 文件
npm run sync

# 构建
npm run build

# 本地测试
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```
