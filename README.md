## first step
clone the repo by writing this command 
```bash
git clone https://github.com/mohamedhoss123/express-template.git --depth 1 yourProjectName
```
after that go to `package.json` file and change package name
then wrote `pnpm install`
## config step
* after cloning the repo rename file `.example.env` to `.env` then add the database connection string
* run the command `pnpm run db:generate` then `pnpm run db:migrate` to init db or `pnpm run db:push` if you don't want to make migratin 



## run the projct
use the command `pnpm run dev` to run the project .
