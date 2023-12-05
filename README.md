# Sapia_Task: Login Demo

##Deployed in Tencent Cloud [Click To Try](http://sapia.xinwu.site)
username: johnny
password: 123

## Use Stories:
1. A user can login with a username and password
2. Return success and a JWT token if username and password are correct
3. Return fail if username and password are not matched
4. A user has a maximum of 3 attempts within 5 minutes, otherwise, the user will be locked.
5. Return fail if a user is locked

## How to Run
>*Pre Request: docker and docker-compose*
### cd Sapia_Task && docker-compose up

## What Tech Used
### Backend: nestjs
### Frontend: react
### Database: redis, mongo

## What to do next:
1. add test
2. add backend api doc by swagger
3. add metrics and granfna panel and monitor