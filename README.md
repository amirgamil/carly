# Carly
#### Genereate beautiful letters for your loved ones that can be shared in seconds
![Home Page](https://user-images.githubusercontent.com/7995105/116179665-bb001b00-a6e5-11eb-85a4-099657924012.png)
![Making a Letter](https://user-images.githubusercontent.com/7995105/116179662-ba678480-a6e5-11eb-90c9-a204049b032a.png)

## Details
Carly is written in Next.js + React on the frontend (hosted on Vercel) and Go with MongoDB Atlas on the backend (hosted as a systemd file with nginx on Digital Ocean).

To run this locally, you will need to run the web server in Go (using `go run main.go`) as well as the frontend (navigate inside the frontend directory and run `yarn dev`).

You will also need a MongoDB atlas account (free tier M0 can be accessed by anyone). Once you've made an account, configure a user with admin access and store the username, password, and shared URL in a .env file with MONGO_USER, MONGO_PASS, MONGO_SHARD_URL as the variable names respectively. Make sure that this .env file is located in the same directory as the go.mod file.

You will also need to create a .env.local file and populate it with two variables 
`NEXT_PUBLIC_HOST=localhost:3000
NEXT_PUBLIC_HOSTAPI=127.0.0.1:port/api`
You can select any port like 8998. 

The API provides two endpoints 
### `POST /api`
### `GET /api/{hash}`
