import { BadRequestException, Controller, Param, Patch, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common/pipes";
import { FileInterceptor } from "@nestjs/platform-express";
import { UsersService } from "src/users/users.service";
import { FilesServices } from "./files.service";

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesServices: FilesServices,
        private readonly userServices: UsersService
        ){}


    @Patch('updatePhoto/:id')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@Param('id') id: string, @UploadedFile(
        new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType: /(jpg|jpeg|png|webp)$/}),
                new MaxFileSizeValidator({maxSize: 5000000,  message: 'The image size must be lower than 5mb'})
            ],
        })
    ) file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File must be provided');
        }
        const result = await this.filesServices.uploadImage(file)
        await this.userServices.updatePhoto(id, result.secure_url);
        return {url: result.secure_url}
    }
}