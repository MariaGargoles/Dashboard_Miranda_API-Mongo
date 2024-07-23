
import * as path from 'path';
import * as fs from 'fs';

const jsonFilePath = path.join(__dirname, 'rooms.json');
const csvFilePath = path.join(__dirname, 'rooms.csv');


const data = fs.readFileSync(jsonFilePath, {encoding: 'utf8'});
const rooms = JSON.parse(data)

rooms.sort((a: any, b:any)=> a.OfferPrice -b.OfferPrice);

const cvsColumns = 'photo,number,id,BedType,Amenities,Rate,OfferPrice,Status,RoomFloor\n';
const csvRows = rooms.map((room:any) => {
  const exitCSV = (field: any) => `"${String(field).replace(/"/g, '""')}"`;
  
  
  const amenities = room.Amenities.join(';');
  
  return `${exitCSV(room.photo)},${exitCSV(room.number)},${exitCSV(room.id)},${exitCSV(room.BedType)},${exitCSV(amenities)},${exitCSV(room.Rate)},${exitCSV(room.OfferPrice)},${exitCSV(room.Status)},${exitCSV(room.RoomFloor)}`;
}).join('\n');

const csvData = cvsColumns + csvRows;

fs.writeFileSync(csvFilePath, csvData, { encoding: 'utf8' });

console.log('CSV file has been written successfully.');
