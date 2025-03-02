import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./database/seeder/seeder.module";
import { Seeder } from "./database/seeder/seeder";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(SeederModule)
    await app.get(Seeder).seed()
    await app.close()
}

bootstrap()