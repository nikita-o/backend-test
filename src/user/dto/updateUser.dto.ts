import { OmitType} from "@nestjs/swagger";
import { CreateUserDto } from "./CreateUser.dto";

export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}