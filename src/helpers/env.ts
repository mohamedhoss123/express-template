export function getEnv(key:string) {
    if (typeof process === 'object' && typeof process.versions === 'object') {
        return process.env[key]
    } else {
        // @ts-ignore
        return Deno.env.get(key)
    }
}