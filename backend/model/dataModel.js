import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
  name : {
    type: String
  },
  last : {
    type: String
  },
  buy : {
    type: String
  },
  sell : {
    type: String
  },
  baseunit : {
    type: String
  },
  volume : {
    type: String
  }
})

const dataModel = mongoose.model('Data', DataSchema);

export default dataModel;