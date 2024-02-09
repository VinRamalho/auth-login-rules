import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { JobsModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${
        process.env.MONGO_URL ??
        'mongodb+srv://root:root@apicluster.ihvl0zu.mongodb.net/?retryWrites=true&w=majority'
      } `,
    ),
    UserModule,
    AuthModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
