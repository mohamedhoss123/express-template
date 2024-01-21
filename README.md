## first step
clone the repo by writing this command 
```bash
git clone https://github.com/mohamedhoss123/express-template.git --depth 1 yourProjectName
```
after that go to `package.json` file and change package name
## config step
* after cloning the repo rename file `.example.env` to `.env` then add the database connection string
* run the command `npm run db:generate` then `npm run db:migrate` to init db 


## run the projct
use the command `npm run dev` to run the project .
