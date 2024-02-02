## First step
clone the repo by writing this command
```bash
git clone https://github.com/mohamedhoss123/express-template.git --depth 1 yourProjectName
```
after that go to `package.json` file and change package name
then wrote `pnpm install`

## Config and Setup
- after cloning the repo rename file `.example.env` to `.env` then add the database connection string
- run the command `pnpm run db:generate` then `pnpm run db:migrate` to init db or `pnpm run db:push` if you don't want to make migratin

## Run the Projct
use the command `pnpm run dev` to run the project .

## Controllars
```
important : controllers must prefix with *.controller.ts 
```
controller are auto loaded by the `loadControllers` helper and invoked in `main.ts` file be aware that this aprouch won't make tsx auto reload so you can manually reload it by pressing `enter` key on the keyboard , you don't need to restart the command just press `enter` on the watch terminal session

## Helpers
this template provide some useful helpers :<br>
[zodFactory](#zodFactory)

### zodFactory
the `zodFactory` helpers allows you to add a zod schema and it will automaticlly return a middleware with your schema to validate it for example

zod schema :
```ts
export const CreateUser = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})

```
your controller:
```ts
@UseBefore(ValidationFactory(CreateUser))
@Post("/register")
@HttpCode(201)
async register(@Body() body: TCreateUser) {
    await AuthService.createUser(body);
    return "ok"
}
```
