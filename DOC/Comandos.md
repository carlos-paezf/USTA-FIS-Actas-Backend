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
  pnpm install @slack/webhook bcrypt class-transformer class-validator colors cors dotenv express express-fileupload express-validator jsonwebtoken morgan morgan-body multer mysql passport passport-jwt passport-local reflect-metadata typeorm typeorm-naming-strategies typescript uuid -S
  ```

- Instalar dependencias de desarrollo:

  ```txt
  pnpm install -D @types/bcrypt @types/cors @types/express @types/express-fileupload @types/express-validator @types/jsonwebtoken @types/morgan @types/multer @types/node@"*" @types/passport @types/passport-jwt @types/passport-local @types/uuid concurrently eslint nodemon ts-node
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
        "docker-compose": "docker-compose up -d"
    },
  }
  ```

- Levantar contenedor con la base de datos

  ```txt
  pnpm docker-compose
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
  pnpm m:gen -- src/migrations/<migrationName>
  ```

- Correr migraciones

  ```txt
  pnpm m:run
  ```

- Activación de ESLint

  ```txt
  npx eslint --init
  ```

- Conocer la complejidad de los archivos

  ```txt
  npx code-complexity . --filter '**/*.ts' --limit 10 --sort score
  ```

- Conocer las dependencias duplicadas en el proyecto
  
  ```txt
  npx qnm doctor --sort duplicates
  ```

- Detectar dependencias circulares

  ```txt
  npx madge --circular --extensions ts .
  ```
