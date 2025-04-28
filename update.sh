#!/bin/bash
echo "正在拉取代码"
git pull
cd code
echo "正在构建项目..."
pnpm run build
