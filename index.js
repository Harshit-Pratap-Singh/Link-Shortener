import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import "mongoose-type-url";

app.use(express.json());

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });

const linkSchema = new mongoose.Schema({
  link_id: {
    type: String,
    unique: true,
    required: true,
  },
  link: { type: mongoose.SchemaTypes.Url, required: true },
});

const LinkModel = mongoose.model("LinkModel", linkSchema);

app.get("/", (req, res) => {
  res.send("<h1>hello there</h1>");
});

app.get("/:link_id", async (req, res) => {
  //   console.log("asds");
  try {
    // console.log(req.params);
    // console.log(await LinkModel.find({}));
    const url = (await LinkModel.find({ link_id: req.params.link_id }))[0].link;
    console.log(url);
    if (url) {
      res.redirect(url);
    } else res.send("<h1>404 NOT FOUND</h1>");
  } catch (err) {
    console.log(err);
    res.send("<h1>error 400 </h1>");
  }
});

app.post("/v1/shrink", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const link_id = nanoid(7);
    // const link_id = "ppp";

    console.log(link_id);
    const shrinked = new LinkModel({
      link_id: link_id.toString(),
      link: body.url,
    });

    await shrinked.save();

    res.status(200).json({
      success: true,
      short_url: `https://${req.headers.host}/${link_id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: !true, ...err });
  }
});

app.listen(port, () => {
  console.log("server started at port : ", port);
});
