import { Controller, Get, Param, Post, Query, Body, Delete, Patch } from "@nestjs/common";
import { TrayectoService } from "./trayecto.service";

@Controller("trayectos")
export class TrayectoController {
  constructor(private readonly trayectoService: TrayectoService) {}

  @Get()
  findAll() {
    return this.trayectoService.findAll();
  }

  @Get("estacion/:principalId")
  findByEstacion(@Param("principalId") principalId: string) {
    return this.trayectoService.findByEstacion(Number(principalId));
  }

  @Get("buscar")
  searchByName(@Query("texto") text: string) {
    return this.trayectoService.searchByName(text);
  }

   @Get("estacion/:principalId/minimo/:minimum")
  findByEstacionAndMinimum(
    @Param("principalId") principalId: string,
    @Param("minimum") minimum: string,
  ) {
    return this.trayectoService.findByEstacionAndMinimum(Number(principalId), Number(minimum));
  }

   @Get("resumen/estacion")
  countByEstacion() {
    return this.trayectoService.countByEstacion();
  }

  @Post()
create(
  @Body()
  datos: { nombre: string; distanciaKm: number; estacionId: number },
) {
  return this.trayectoService.add(datos.nombre,datos.distanciaKm,datos.estacionId);
}


@Delete("eliminar/:id")
deleteEstacion(
  @Param("id") id: string
) {
  return this.trayectoService.deleteEstacion(Number(id));
}

@Patch("actualizar/:id")
update(
  @Param("id") id: string,
  @Body()
  datos: { nombre: string; distanciaKm: number; estacionId: number },
)
{
  return this.trayectoService.update(Number(id), datos.nombre, datos.distanciaKm, datos.estacionId);
}

@Patch("modificar/zona/:id")
modificar(
  @Param("id") id: string,
  @Body()
  datos: { estacionId: number },
)
{
  return this.trayectoService.updatezona(
    Number(id),
    datos.estacionId

  );
}


}


