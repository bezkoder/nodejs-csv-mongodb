const mongodb = require("mongodb").MongoClient;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";

mongodb.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    client
      .db("zkoder_db")
      .collection("category")
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        const csvWriter = createCsvWriter({
          path: "bezkoder_mongodb_csvWriter.csv",
          header: [
            { id: "_id", title: "_id" },
            { id: "id", title: "id" },
            { id: "name", title: "name" },
            { id: "description", title: "description" },
            { id: "created_at", title: "created_at" }
          ]
        });

        csvWriter
          .writeRecords(data)
          .then(() =>
            console.log("Write to bezkoder_mongodb_csvWriter.csv successfully!")
          );

        client.close();
      });
  }
);