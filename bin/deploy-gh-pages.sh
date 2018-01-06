#!/usr/bin/env bash

echo "Deploying setsun.github.io"

git checkout -b stage-deploy
git add build && git commit -m "deploy"
git subtree push --prefix build origin master

echo "Deployed setsun.github.io"
