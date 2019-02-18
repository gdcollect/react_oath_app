import mongoose from "mongoose";

//Import MongoUI
import { Keys } from "./keys";

export default (server, port) => {
  //Connecting to MongoDB
  return mongoose
    .connect(Keys.MONGO_UI, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(res => {
      server.listen(port, () => console.log(`server running on port ${port}!!`));
      console.log(`mongodb connected......`);
    })
    .catch(err => {
      throw err.message;
    });
}