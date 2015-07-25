# yolo-bear-server-nodejs
Nodejs version of [yolo-bear-server](https://github.com/shadiakiki1986/yolo-bear-server) (which was in php).
This nodejs version can run on aws lambda instead of aws ec2

# dev note
* An API endpoint is created via AWS API Gateway for yolo-bear-get lambda function
* It requires adding Query Strings to the Method Request
* It also requires adding the following mapping template to the Integration Request

    #set($inputRoot = $input.path('$'))
    {
    "tournamentName": "\""+$input.params('tournamentName')+"\"",
    "format": $input.params('format')
    }
