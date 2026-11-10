import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Estacion } from "../estacion/entities/estacion.entity";
import { Trayecto } from "./entities/trayecto.entity";
import { TrayectoController } from "./trayecto.controller";
import { TrayectoService } from "./trayecto.service";

@Module({
  imports: [TypeOrmModule.forFeature([Estacion, Trayecto])],
  controllers: [TrayectoController],
  providers: [TrayectoService],
})
export class TrayectoModule {}
