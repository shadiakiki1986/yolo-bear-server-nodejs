#!/bin/bash
# http://blog.iron.io/2015/01/aws-lambda-vs-ironworker.html
# Usage: from root directory: bash scripts/upload.sh

if [ ! -d scripts ]; then
  echo "Please use this script from the root folder"
  echo "Usage bash scripts/upload.sh"
  exit
fi

# cannot have grep FunctionName line below with this # set -e

echo "Zipping"
zip -q -r yolo-bear-server-nodejs.zip *

# only in aws-cli/1.6.5 Python/2.7.3 Linux/3.2.0-29-generic-pae
#aws lambda upload-function \
#  --region us-west-2 \
#  --function-name zboota-get \
#  --function-zip yolo-bear-server-nodejs.zip \
#  --role arn:aws:iam::886436197218:role/lambda_dynamo \
#  --mode event \
#  --handler node_modules/app/DdbManager.getNotSilent \
#  --runtime nodejs
#  --timeout 30
##  --debug 
##  --profile adminuser \

aws s3 cp yolo-bear-server-nodejs.zip s3://zboota-server/lambda-zip/yolo-bear-server-nodejs.zip
upsertFunction() {
  aws lambda list-functions | grep "\"FunctionName\": \"$1\"" > /dev/null
  if [ $? == 0 ]; then
    echo "Updating function $1"
    aws lambda update-function-code \
      --function-name $1 \
      --s3-bucket zboota-server \
      --s3-key lambda-zip/yolo-bear-server-nodejs.zip > /dev/null
    
    aws lambda update-function-configuration \
      --function-name $1 \
      --role arn:aws:iam::886436197218:role/lambda_dynamo \
      --handler node_modules/app/$2 \
      --description "$3" \
      --timeout $4 > /dev/null
  else
    echo "Creating function $1"
    aws lambda create-function \
      --function-name $1 \
      --runtime nodejs \
      --role arn:aws:iam::886436197218:role/lambda_dynamo \
      --handler node_modules/app/$2 \
      --description "$3" \
      --timeout $4 \
      --code S3Bucket="zboota-server",S3Key="lambda-zip/yolo-bear-server-nodejs.zip" > /dev/null
  fi
}

upsertFunction "yolo-bear-del" "index.del" "Yolo bear: delete tournament from server" 3
upsertFunction "yolo-bear-forgotPassword" "index.forgotPassword" "Yolo bear: Registered user forgot password" 3
upsertFunction "yolo-bear-getEmail" "index.getEmail" "Yolo bear: get registered user data" 3
upsertFunction "yolo-bear-get" "index.get" "Yolo bear: get tournament" 30
upsertFunction "yolo-bear-listNick" "index.listNick" "Yolo bear: list nicknames of online users" 3
upsertFunction "yolo-bear-list" "index.list" "Yolo bear: list tournaments" 3
upsertFunction "yolo-bear-new" "index.new" "Yolo bear: upload new tournament to server" 3
upsertFunction "yolo-bear-putEmail" "index.putEmail" "Yolo bear: register new user on server" 3
upsertFunction "yolo-bear-putNick" "index.putNick" "Yolo bear: put new nickname on server" 3

rm yolo-bear-server-nodejs.zip
aws s3 rm s3://zboota-server/lambda-zip/yolo-bear-server-nodejs.zip
