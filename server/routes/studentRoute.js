import express from 'express'
import { create, deleteData, getAll, getOne, update } from '../controller/studentController.js';

const route=express.Router();

route.post('/create',create)
route.get('/getall',getAll)
route.get('/getone/:id',getOne)
route.put('/update/:id',update)
route.delete('/delete/:id',deleteData)
export default route;