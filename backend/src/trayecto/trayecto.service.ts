import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Estacion } from "../estacion/entities/estacion.entity";
import { Trayecto } from "./entities/trayecto.entity";

@Injectable()
export class TrayectoService {
  constructor(
    @InjectRepository(Trayecto)
    private readonly trayectoRepository: Repository<Trayecto>,
    @InjectRepository(Estacion)
    private readonly estacionRepository: Repository<Estacion>,
  ) {}

  findAll() {
    return this.trayectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.estacion", "principal")
      .orderBy("registro.id", "ASC")
      .getMany();
  }

   findByEstacion(principalId: number) {
    return this.trayectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.estacion", "principal")
      .where("principal.id = :principalId", { principalId })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

  searchByName(text: string) {
    return this.trayectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.estacion", "principal")
      .where("registro.nombre ILIKE :pattern", { pattern: `%${text}%` })
      .orderBy("registro.id", "ASC")
      .getMany();
  }

    findByEstacionAndMinimum(principalId: number, minimum: number) {
    return this.trayectoRepository
      .createQueryBuilder("registro")
      .innerJoinAndSelect("registro.estacion", "principal")
      .where("principal.id = :principalId", { principalId })
      .andWhere("registro.distanciaKm >= :minimum", { minimum })
      .orderBy("registro.distanciaKm", "DESC")
      .getMany();
  }

  countByEstacion() {
    return this.estacionRepository
      .createQueryBuilder("principal")
      .leftJoin("principal.trayectos", "registro")
      .select("principal.id", "id")
      .addSelect("principal.nombre", "nombre")
      .addSelect("COUNT(registro.id)", "total")
      .groupBy("principal.id")
      .addGroupBy("principal.nombre")
      .orderBy("principal.id", "ASC")
      .getRawMany();
  }

  getByController() {
    return this.estacionRepository
      .createQueryBuilder("principal")
      .leftJoin("principal.trayectos", "registro")
      .select("principal.id", "id")
      .addSelect("principal.nombre", "nombre")
      .addSelect("COUNT(registro.id)", "total")
      .groupBy("principal.id")
      .addGroupBy("principal.nombre")
      .orderBy("principal.id", "ASC")
      .getRawMany();
  }

 add(nombre: string, distanciaKm: number, estacionId: number) {
  return this.trayectoRepository.save({
    nombre,
    distanciaKm,
    estacion: { id: estacionId },
  });
}

deleteEstacion(id: number) {
  return this.trayectoRepository.delete(id);
};

update(id: number, nombre: string, distanciaKm: number, estacionId: number) {
  return this.trayectoRepository.save({
    id,
    nombre,
    distanciaKm,
    estacion: { id: estacionId },
  });
}

updatezona(id: number, estacionId: number) {
  return this.trayectoRepository.save({
    id,
    estacion: { id: estacionId },
  });
}

}