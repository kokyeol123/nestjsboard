import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @IsNotEmpty() // 파이프 empty일때 에러를 낸다
    title: string;

    @IsNotEmpty()
    description: string;
}