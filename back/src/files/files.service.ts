import { Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { v2 } from 'cloudinary';

@Injectable()
export class FilesServices {
    
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject ) => {
            v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if(error || !result) return reject(error || new Error('A valid result was not recived'));
                resolve(result)
            }).end(file.buffer);
        });
    }
}