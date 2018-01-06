#!/usr/bin/env bash

echo "Deploying setsun.github.io"

git branch -D deploy
git branch -D staging

git checkout -b staging
rm .gitignore
git add dist
git -c user.name='CircleCI Deploy' -c user.email='foo@bar.com' commit -m "deploy" --no-verify

git subtree split --prefix dist -b deploy
git push -f origin deploy:master

echo "Deployed setsun.github.io"
