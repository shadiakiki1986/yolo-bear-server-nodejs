# yolo-bear-server-nodejs
Nodejs version of [yolo-bear-server](https://github.com/shadiakiki1986/yolo-bear-server) (which was in php).
This nodejs version can run on aws lambda instead of aws ec2

# dev note
* An API endpoint is created via AWS API Gateway for yolo-bear-get lambda function
* It requires:
 * adding Query Strings to the Method Request
 * adding the following mapping template to the Integration Request

    #set($inputRoot = $input.path('$'))
    {
    "tournamentName": "$input.params('tournamentName')",
    "format": "$input.params('format')"
    }
 * adding the "Content-type" header to Method Response
 * adding "text/html" to the Integration response ".\*" mapping template with

    $input.path('$')

* Reference: http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
* Note: Even though placing $input... in double quotes colors it in green in the editor (thus implying that it will be converted to text instead of evaluated), it really does get evaluated
