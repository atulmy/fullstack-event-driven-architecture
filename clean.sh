#!/bin/sh

rm -rf ./.turbo
rm -rf ./node_modules 
rm -rf ./package-lock.json 

# packages
# - common
rm -rf ./packages/common/node_modules
rm -rf ./packages/common/tsconfig.tsbuildinfo
rm -rf ./packages/common/build

# - model
rm -rf ./packages/model/node_modules
rm -rf ./packages/model/tsconfig.tsbuildinfo
rm -rf ./packages/model/build

# - ui
rm -rf ./packages/ui/node_modules

# projects
# - api
# -- core
rm -rf ./projects/api/core/node_modules
rm -rf ./projects/api/core/tsconfig.tsbuildinfo
rm -rf ./projects/api/core/build
# -- stt
rm -rf ./projects/api/stt/node_modules
rm -rf ./projects/api/stt/tsconfig.tsbuildinfo
rm -rf ./projects/api/stt/build
# -- tts
rm -rf ./projects/api/tts/node_modules
rm -rf ./projects/api/tts/tsconfig.tsbuildinfo
rm -rf ./projects/api/tts/build

# - app
# -- console
rm -rf ./projects/app/console/.next
rm -rf ./projects/app/console/node_modules
# -- web
rm -rf ./projects/app/web/.next
rm -rf ./projects/app/web/node_modules

# - site
# -- web
rm -rf ./projects/site/web/.next
rm -rf ./projects/site/web/node_modules
