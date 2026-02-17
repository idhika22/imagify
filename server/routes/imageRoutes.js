import express from'express'
import { imageGenerate } from '../controllers/imageController.js'
import userAuth from '../middleware/auth.js';

const imageRouter=express.Router();


imageRouter.post('/generate-image',userAuth,imageGenerate)
export default imageRouter;