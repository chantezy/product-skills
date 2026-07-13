#!/bin/bash
set -e

# ============================================================
# 手动发布 @chantezy/mcp-product-design 到 npm
# 使用方式：在项目根目录执行  bash scripts/publish.sh
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_SERVER_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$MCP_SERVER_DIR")"

echo "=================================================="
echo "  🚀 手动发布 @chantezy/mcp-product-design"
echo "=================================================="

# 1. 同步 skills
echo ""
echo "[1/4] 同步 Skills 到 mcp-server/skills/..."
bash "$MCP_SERVER_DIR/scripts/sync-skills.sh"

# 2. 安装依赖（检查 node_modules 是否存在）
echo ""
echo "[2/4] 检查依赖..."
if [ ! -d "$MCP_SERVER_DIR/node_modules" ]; then
    echo "  → node_modules 不存在，执行 npm install..."
    cd "$MCP_SERVER_DIR" && npm install
else
    echo "  → node_modules 已存在，跳过安装"
fi

# 3. 构建
echo ""
echo "[3/4] 构建 TypeScript..."
cd "$MCP_SERVER_DIR" && npm run build

# 4. 提升版本号并发布
echo ""
echo "[4/4] 提升版本并发布到 npm..."
cd "$MCP_SERVER_DIR" && npm version patch --no-git-tag-version

echo ""
echo "  即将发布，需要浏览器授权..."
npm publish --access public

echo ""
echo "=================================================="
echo "  ✅ 发布完成！"
echo "=================================================="
echo ""
echo "  验证地址："
echo "  https://www.npmjs.com/package/@chantezy/mcp-product-design"
echo ""
