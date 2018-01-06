#!/usr/bin/env bash

echo "Deploying setsun.github.io"

git checkout -B staging
rm .gitignore

touch dist/CNAME
echo 'setsun.io' >> dist/CNAME

git add dist
git -c user.name='CircleCI Deploy' -c user.email='foo@bar.com' commit -m "deploy" --no-verify

git subtree split --prefix dist -b deploy
git push -f origin deploy:master

echo "Deployed setsun.github.io"
