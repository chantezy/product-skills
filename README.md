# 产品设计师专用 Skills 库

> 🎨 为产品设计师和交互设计师打造的技能集合
> 
> 通过结构化 Skill 提升设计工作效率，让 AI 更懂设计流程

---

## 📖 关于这个仓库

这是一个专门为**产品设计师**和**交互设计师**准备的  Skills 合集。每个 Skill 都针对设计工作流中的特定环节，帮助你快速完成从需求分析、交互设计、到文档输出的全流程任务。

**核心理念：**
- ✅ 结构化设计思维，而非简单的文本生成
- ✅ 基于设计方法论和认知心理学原则
- ✅ 开箱即用，支持自定义扩展

---

## 📦 可用技能

| Skill | 用途 |
|-------|------|
| `requirements-content-analysis` | 需求内容结构化解析与交互设计分析 |
| `b-design-diverge` | B 端设计方案快速发散与多方案对比 |
| `interaction-design-eval` | 交互设计量化评估与职级匹配 |
| `interaction-spec` | 交互说明文档生成 |
| `prd-generator` | PRD 需求文档生成 |
| `prd-lint` | PRD 逻辑评审与跨文档冲突检测 |

> 除手动上传外，也可通过 MCP 服务 [`@chantezy/mcp-product-design`](./mcp-server) 在 AI 编码助手中直接调用。

---

## 🚀 快速开始

### 方式一：直接使用（推荐）

1. 将 Skill 文件夹上传到 比如Claude 对话中
2. 在对话中描述你的需求，Claude 会自动识别并调用对应 Skill
3. 按照 Claude 引导提供必要信息，获得结构化输出

**示例：**
```
用户：我有一个直播首页优化的需求，帮我做需求分析
Claude：[自动调用 requirements-content-analysis Skill]
```

### 方式二：指定调用

在对话中明确提及 Skill 名称：
```
使用 requirements-content-analysis 帮我分析这个需求
```

---

## 📚 Skill 组成结构

每个 Skill 包含以下文件：

```
skill-name/
├── SKILL.md              # 核心工作流程与模板
├── README.md             # 使用说明与快速开始
└── references/           # 参考资料（可选）
    ├── xxx.md
    └── xxx.md
```

**文件说明：**
- `SKILL.md`：定义 Skill 的触发条件、工作流程、输出模板
- `README.md`：面向使用者的说明文档
- `references/`：领域知识库，Skill 会在需要时自动引用

---

## 💡 最佳实践

**输入准备：**
- 提供尽可能完整的上下文（业务背景、用户群体、约束条件）
- 如有竞品参考、历史数据、用户反馈，一并提供
- 明确平台端（移动端 / PC 端 / 多端）

**Skill 组合使用：**
- 多个技能可以组合使用用来解决复杂问题
- 需要对 AI 输出进行人工审核与调整

