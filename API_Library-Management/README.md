<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

These are built by Anris Y Simorangkir. To see more project of the author please visit this https://anrisys.com.

## Project setup

1. Install the dependencies

```bash
$ npm install
```

2. Create the env file as shown in .env.example.

```json
NODE_ENV=development
DB_HOST=xxxxx
DB_USER=xxxxx
DB_PASS=xxxxx
DB_NAME_DEVELOPMENT=xxxxx
DB_DIALECT=xxxx
DB_PORT=xxxx
```

3. After creating the env file with correct credentials, we create the database:

```bash
$ npm run db:create
```

4. Next, we migrate the migration files into our database:

```bash
$ npm run db:migrate
```

5. Lastly, we can seed the demo data for Members and Books

```bash
$ npm run db:seed
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support (for NestJS)

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
