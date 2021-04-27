# Carly
#### Genereate beautiful letters for your loved ones that can be shared in seconds
![Home Page](https://user-images.githubusercontent.com/7995105/116179665-bb001b00-a6e5-11eb-85a4-099657924012.png)
![Making a Letter](https://user-images.githubusercontent.com/7995105/116179662-ba678480-a6e5-11eb-90c9-a204049b032a.png)


## Public API
Carly provides a public API that can be accessed at  `https://apicarly.amirbolous.com`. The API provides the following endpoints


### `POST /api`
```bash
# create a new letter
curl -H "Content-Type: application/json" \
  --request POST \
  --data '{"title":"letter title", "expiry":"2021-10-05T14:48:00.000Z", "password":"",  \
           "content": {"person":"a", "msg":"msg", "imgAdd":"imgurl"}}' \
  https://apicarly.amirbolous.com/api

# or with a password
curl -H "Content-Type: application/json" \
  --request POST \
  --data '{"title":"letter title", "expiry":"2021-10-05T14:48:00.000Z", "password":"password",  \
           "content": {"person":"a", "msg":"msg", "imgAdd":"imgurl"}}' \
  https://apicarly.amirbolous.com/api

# 200 OK
# > { "hash": "6Z7NVVv" }

# 400 BAD_REQUEST
# happens when title/body is too long, password couldnt
# be hashed, or expiry is not in RFC3339 format
```

Fix this
### `GET /api/{hash}`
```bash
# get unprotected hash
curl https://apicarly.amirbolous.com/api/166989a

# 200 OK
# > {
# >   "content": "print(\"test content\")",
# >   "expiry": "2021-03-09T01:02:43.082Z",
# >   "language": "python",
# >   "timestamp": "2021-03-02T01:06:16.209501971Z",
# >   "title": "test paste"
# > }

# 401 BAD_REQUEST
# happens when paste is password protected. when this happens, try the authenticated alternative using POST
# 404 NOT_FOUND
# no paste with that ID found
```

## Details
Carly is written in Next.js + React on the frontend (hosted on Vercel) and Go with MongoDB Atlas on the backend (hosted as a systemd file with nginx on Digital Ocean)
