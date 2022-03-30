import mongodb from "mongodb";

const setting = {
  path: "mongodb://localhost:27017/DEVELOPMENT",
  dbname: "DEVELOPMENT",
};

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(setting.path);

class MongodbHelper {
  collectionName: string = "";

  constructor(name: string) {
    this.collectionName = name;
  }
  async connect(callback: (e: mongodb.Collection<mongodb.Document>) => void) {
    await client.connect();
    const collection = client
      .db(setting.dbname)
      .collection(this.collectionName);
    callback(collection);
  }
  async insertOne(map: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      this.connect((collection) => {
        collection.insertOne(map, (err, result) => {
          client.close();
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      });
    });
  }

  async insertMany(array: { [key: string]: any }[]) {
    return new Promise((resolve, reject) => {
      this.connect((collection) => {
        collection.insertMany(array, (err) => {
          client.close();
          if (!err) {
            resolve(array);
          } else {
            reject(err);
          }
        });
      });
    });
  }

  async updateOne(
    map: { [key: string]: any },
    options: { [key: string]: any }
  ) {
    return new Promise((resolve, reject) => {
      this.connect((collection) => {
        collection.updateOne(map, { $set: options }, (err, result) => {
          client.close();
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      });
    });
  }

  async find(options?: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      this.connect((collection) => {
        collection.find(options || {}).toArray((err, array) => {
          client.close();
          if (!err) {
            resolve(array);
          } else {
            reject(err);
          }
        });
      });
    });
  }

  async deleteOne(options: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      this.connect((collection) => {
        collection.deleteOne(options, (err, res) => {
          client.close();
          if (!err) {
            resolve(res);
          } else {
            reject(err);
          }
        });
      });
    });
  }
}

export default MongodbHelper;
