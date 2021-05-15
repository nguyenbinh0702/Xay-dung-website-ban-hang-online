//Created by: Quân
export class TokenDto {
    value: string;
    email: string;
    avatarURL: string

    constructor(value: string, email: string, avatarURL: string) {
        this.value = value;
        this.email = email;
        this.avatarURL = avatarURL;
    }
}
