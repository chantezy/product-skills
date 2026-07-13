#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { listSkills, getSkill, getReference } from "./skill-loader.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));

const server = new McpServer({
  name: "mcp-product-design",
  version: pkg.version,
});

server.tool(
  "list_skills",
  "列出所有可用的产品设计技能及其触发条件。应先调用此工具了解可用技能，然后根据用户意图选择最匹配的 skill。",
  {},
  async () => {
    const skills = listSkills();

    if (skills.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "未找到任何技能。skills 目录可能为空或未正确同步，请检查 mcp-server/skills/ 目录。",
          },
        ],
      };
    }

    const lines = skills.map(
      (s) =>
        `- **${s.name}**  —  ${s.trigger || "查看描述了解适用场景"}`,
    );
    const text =
      `# 可用产品设计技能 (${skills.length})\n\n` +
      `请根据用户意图，选择最匹配的 skill 调用 \`get_skill\`：\n\n` +
      lines.join("\n") +
      `\n\n---\n使用 \`get_skill\` 工具并提供技能名称来获取完整的工作流程指令。`;

    return {
      content: [{ type: "text" as const, text }],
    };
  },
);

server.tool(
  "get_skill",
  "获取指定技能的完整 SKILL.md 内容，包括工作流程、输出模板和可用的参考文件列表。",
  {
    name: z.string().describe(
      "技能名称，支持 kebab-case（如 'prd-generator'、'b-design-diverge'）",
    ),
  },
  async ({ name }) => {
    const skill = getSkill(name);

    if (!skill) {
      const available = listSkills().map((s) => s.name).join("、");
      return {
        content: [
          {
            type: "text" as const,
            text: `未找到技能 "${name}"。可用技能：${available}`,
          },
        ],
        isError: true,
      };
    }

    const refSection = skill.references.length > 0
      ? `\n\n---\n## 可用参考资料\n${
        skill.references.map((r) => `- ${r}`).join("\n")
      }\n\n使用 \`get_reference\` 工具并提供技能名称和参考资料名称来读取。`
      : "";

    return {
      content: [
        {
          type: "text" as const,
          text: skill.content + refSection,
        },
      ],
    };
  },
);

server.tool(
  "get_reference",
  "获取指定技能的资料文件内容。资料文件包含领域知识，如评分标准、设计原则、模板等。",
  {
    name: z.string().describe("技能名称"),
    ref: z.string().describe(
      "参考资料文件名，不含 .md 扩展名（如 'scoring_criteria'、'prd-template'）",
    ),
  },
  async ({ name, ref }) => {
    const content = getReference(name, ref);

    if (!content) {
      const skill = getSkill(name);
      const available = skill
        ? skill.references.join("、")
        : "技能不存在";
      return {
        content: [
          {
            type: "text" as const,
            text: `未找到技能 "${name}" 的资料 "${ref}"。可用资料：${available}`,
          },
        ],
        isError: true,
      };
    }

    return {
      content: [{ type: "text" as const, text: content }],
    };
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  const skills = listSkills();
  if (process.env.DEBUG) {
    console.error(
      `[mcp-product-design] 已加载 ${skills.length} 个技能：${
        skills.map((s) => s.name).join(", ")
      }`,
    );
  }
}

main().catch((err) => {
  console.error("MCP Server 启动失败：", err);
  process.exit(1);
});
