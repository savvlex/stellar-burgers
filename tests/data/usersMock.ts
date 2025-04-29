import { TUser } from "../../src/utils/types";
import { TRegisterData, TLoginData } from "../../src/utils/burger-api"

export const mockUser: TUser = {
    name: "testUser",
    email: 'testUser@test.ru'
}

export const mockRegisterData: TRegisterData = {
    name: "testUser",
    email: 'testUser@test.ru',
    password: 'testUser1'
}

export const mockLoginData: TLoginData = {
    email: 'testUser@test.ru',
    password: 'testUser1'
}

export const mockUpdatedUser: TUser = { name: 'New Name', email: 'old@example.com' }
