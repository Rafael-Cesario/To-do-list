import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserModule } from './models/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './models/authentication/auth.module';

const graphqlModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  playground: false,
  formatError: (error: any) => ({ message: error.extensions?.originalError?.message || error.message }),
});

@Module({
  imports: [ConfigModule.forRoot(), graphqlModule, PrismaModule, UserModule, AuthModule],
})
export class AppModule {}
