import Cookie from 'js-cookie'

export const TOKEN_NAME = 'Ma_Token'

class TokenService<T extends string > {

    private readonly tokenName: string = TOKEN_NAME

    public set(v: T): void {
        if (typeof v !== 'string') {
            return console.warn(`Token accept string key. but params is ${typeof v}`)
        }
        Cookie.set(this.tokenName, v)
    }

    public get(): string | undefined {
        return Cookie.get(this.tokenName) 
    }

    public clear(): void {
        return Cookie.remove(this.tokenName)
    } 

    public isAuthenticated(): boolean {
        return !!this.get()
    }
}

export default new TokenService<string>()