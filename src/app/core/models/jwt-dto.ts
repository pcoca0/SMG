export class JwtDto {
    token: string;
    type = 'Bearer';
    usuario: string;
    authorities: string[];
}
