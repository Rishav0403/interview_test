import express from 'express';
import { config } from 'dotenv';
import dbconnection from './db/dbconnection.js';
import axios from 'axios';
import dataModel from './model/dataModel.js';
import cors from 'cors';


config();

const app = express();

// middleware
app.use(express.json())
app.use(cors());

// dbconnection
dbconnection();

// data fetching from api
const saveData = async () => { 
  let {data} = await axios.get("https://api.wazirx.com/api/v2/tickers",{
    params: {
    _limit: 10
    }
  });
  data = Object.entries(data);
  
  
  // console.log(data);
  
  await Object.entries(data).forEach(async (item,i) => {
    if(i<10){
      const individualData = item[1];
    //   console.log(individualData);
      const newData = await dataModel.create({
        name : individualData.name,
        last : individualData.last,
        buy : individualData.buy,
        sell : individualData.sell,
        baseunit : individualData.base_unit,
        volume : individualData.volume
      });
    }
  });
//   console.log(await dataModel.find());

}

const checkIsDataExist = async () => {
  const data = await dataModel.find();
//   console.log(data);
  if(!data){
    await saveData();
  } 
}

await checkIsDataExist();

// routes

app.get('/api/v1/get' ,async (req, res) => {
  const data = await dataModel.find();
  res.status(200).json(data);
}) 

app.listen(process.env.PORT, () => {
  console.log(`Connected to server... ${process.env.PORT}`);
});