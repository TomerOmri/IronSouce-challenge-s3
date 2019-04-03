# S3 Object Storage
This is Object storage (S3) Node app. written in Express, mongoose.

## How to run
#### Run with Docker
```sh
$ docker-compose build
$ docker-compose up
```

#### Run localy
```sh
$ npm i
$ cd src
$ npm start
$ mongod
```

## Documentation
Use the following API to interact with the Object storage.
-   To make changes (upload/delete/update) you will have to login, the login is implemented with JWT tokens, I have created 4 users upfront, sent in private


## API  

****Upload (Public)****
```sh
POST /upload
```
> Body: {files: […files]}  // Add to the req.body files with key "files"
-   Each file that is  being uploaded, will get a secretId for private download later on.

  ---
  ******Update******
```sh
PATCH /update
```
> Body: {fileName: YOUR_FILE_NAME} 

- In case the file is not exist or you don’t have permissions you will get 404
- In case the file turned from public to private - an access token will be generated for you and you will get the object in return (don’t forget to copy it to download the file)

  ---
 ********Download (Public)********
```sh
GET /download || with queryparam: /filename
```
> Body: { ownerId: ownerId }

- You will have to provide the ownerId of the file in the Body: { ownerId: ownerId }
- I assume that the OwnerId is given by user in the registration process (which I didn’t implement)
With the Users I created, each one has an ownerId, if I want to download public file from user “Tomer” his ownerId is: jk12x9
so the link will be: [s3IronSource.com/download?fileName=pizza.png](http://s3IronSource.com/download?fileName=pizza.png) 
with Body: {ownerId: jk12x9}

for  ********Private Download******** we need to combine the file’s secretId that was generated during upload with the access_token, example:

[s3IronSource.com/download/SECRET_FILE_ID?access_token=ACCESS_TOKEN](http://s3IronSource.com/download/SECRET_FILE_ID?access_token=ACCESS_TOKEN)

- to download file’s metadata: add "metadata=true" to query param

  ---

  
 ********Delete********
```sh
DELETE /delete
```
> Body: {fileName: FILE_TO_DELETE} 

Be sure you are logged in (brear token), provide in body the fileName for delete
user is only able to deleted his own files



