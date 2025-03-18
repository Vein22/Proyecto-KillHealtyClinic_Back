import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/auth/dto/create-user.dto";

export class UpdatePfpDto extends PickType(CreateUserDto, [
    'profilePhoto',
]) {}