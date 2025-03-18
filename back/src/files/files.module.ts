import { Module } from "@nestjs/common";
import { CloudinaryConfig } from "src/config/cloudinary";
import { UsersModule } from "src/users/users.module";
import { FilesController } from "./files.controller";
import { FilesServices } from "./files.service";


@Module({
    imports: [UsersModule],
    controllers: [FilesController],
    providers: [FilesServices, CloudinaryConfig],
    exports: [],
})

export class FilesModule{}