# Lista de comandos

- Inicializar el archivo `package.json`
  
  ```txt
  npm init -y
  ```

- Instalar TypeScript en el proyecto:

  ```txt
  pnpm install typescript -S
  ```

- Inicializar TypeScript

  ```txt
  tsc --init
  ```

- Dentro del archivo `tsconfig.json` se aplicaron los siguientes cambios:

  ```json
  {
    "compilerOptions": {
        ...,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        ...,
        "outDir": "./dist",
        ...,
        "strictPropertyInitialization": true, 
        ...,
    }
  }
  ```

- Instalar dependencias de producción a usar en el proyecto:
  
  ```txt
  pnpm install bcrypt class-transformer class-validator colors cors dotenv express express-validator jsonwebtoken morgan multer passport passport-jwt passport-local reflect-metadata typeorm typeorm-naming-strategies typescript -S
  ```

- Instalar dependencias de desarrollo:

  ```txt
  pnpm install -D @types/bcrypt @types/cors @types/express @types/express-validator @types/jsonwebtoken @types/morgan @types/multer @types/node@"*" @types/passport @types/passport-jwt @types/passport-local concurrently nodemon ts-node
  ```

- Configurar scripts del proyecto en `package.json`:

  ```json
  {
    ...,
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "tsc && node dist/server.js",
        "start:dev": "tsc && concurrently \"tsc -w\" \"nodemon dist/server.js\"",
        "start:prod": "SET NODE_ENV=production && npm start",
        "typeorm": "typeorm-ts-node-esm -d ./src/config/data.config.ts",
        "m:gen": "npm run typeorm migration:generate",
        "m:run": "npm run typeorm migration:run",
        "docker": "docker-compose up -d"
    },
  }
  ```

- Levantar contenedor con la base de datos

  ```txt
  pnpm docker
  ```

- Levantar el proyecto en modo desarrollo

  ```txt
  pnpm start:dev
  ```

- Levantar el proyecto en modo producción

  ```txt
  pnpm start:prod
  ```

- Generar migraciones

  ```txt
  pnpm m:gen
  ```

- Correr migraciones

  ```txt
  pnpm m:run
  ```