#!/bin/bash
git pull
echo "正在拉取代码"
cd code
echo "正在构建项目..."
pnpm run build
