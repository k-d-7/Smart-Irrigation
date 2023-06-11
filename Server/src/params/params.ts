import { IsEmail, MinLength, IsString } from "class-validator";

export class CreateUserParams {
    @MinLength(10)
    public phone!: string;

    @MinLength(10)
    @IsString()
    public password!: string;
}

export class LoginUserParams {
    @MinLength(10)
    public phone!: string;
    public password!: string;
}

export class StatisticParams {
    @IsString()
    public temperature!: number;

    @IsString()
    public humidity!: number;
}

export class PumpParams {
    @IsString()
    public pumpStatus!: boolean | 0;
}

export class AdafruitResponseParams {
    public id!: string;
    public value!: string;
}
