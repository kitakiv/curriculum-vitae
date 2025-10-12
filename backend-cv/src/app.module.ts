import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { SlidersModule } from './sliders/sliders.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import { ContactsModule } from './contacts/contacts.module';
import { TechStackModule } from './techstack/techstack.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    DatabaseModule,
    SlidersModule,
    ProjectsModule,
    ProfileModule,
    UploadModule,
    ContactsModule,
    TechStackModule,
  ],
})
export class AppModule {}
