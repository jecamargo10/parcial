# Node + Express + create-react-app + flickrApi Boilerplate

This is a simple project that helps bootstrap projects that use create-react-app + node + express + flickrapi

To use this boilerplate clone it:

```
git clone https://github.com/john-guerra/nodeExpressFlickr.git myApp
cd myApp
echo "my_flickr_api_key" > server/api_key.txt
echo "my_flickr_api_secret" > server/api_secret.txt
npm install
```
You can [get your Flickr api key and secrets here](https://www.flickr.com/services/apps/create/)


Then compile the front-end into the build folder using

```
npm run build
```

And finally run the server

```
node server
```
And open [http://localhost:9000](http://localhost:9000)

It’s the same as the teacher process