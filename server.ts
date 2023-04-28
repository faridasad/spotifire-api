import express from "express";
import cors from "cors";
import SpotifyWebApi from "spotify-web-api-node";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Mom!");
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  if (code === null) console.log("1");

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "532cbb7f4c474cd382a83bd0f7470c26",
    clientSecret: "1dd70a54751041ca9fe4cc0632c9e273",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: Number(data.body.expires_in),
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(5000, () => console.log("Server Running"));
