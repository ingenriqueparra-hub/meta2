# Mapa de trabajo del proyecto

## Objetivo del análisis

Asegurar que el documento funcional del proveedor esté alineado al proceso real que METAFIN necesita operar para el servicio de asistencias.

El trabajo tiene dos actividades simultáneas:

1. **Pulir el proceso real**.
2. **Compararlo contra el documento proveedor**.

## Insumos

| Insumo | Uso | Estado |
|---|---|---|
| Archivos `.md` del proyecto | Fuente vigente para proceso real, decisiones, glosario, matriz y checklist | Vigente |
| `funcionalidades y procesos.html` | Borrador inicial de descubrimiento del flujo y módulos; debe normalizarse antes de incorporarse al proceso real | Referencia base, no fuente final |
| `Documento Funcional v1.pdf` | Documento proveedor, versión inicial | Referencia |
| `Documento Funcional v2.pdf` | Documento proveedor, versión posterior | Referencia principal |
| Conversaciones y validaciones con negocio | Fuente para ajustar el proceso real | Continuo |
| `data/metafin_consolidado.json` | Consolidado estructurado para visor dinámico, filtros y futuras exportaciones | Derivado de los `.md` vigentes |
| `viewer/index.html` | Visor web local del proceso, pendientes, alcance y trazabilidad | Herramienta de consulta |

## Aclaraciones de alcance vigentes

| Tema | Definición actual |
|---|---|
| Relación comercial | METAFIN trabaja con **Deal**, no con aseguradoras |
| Ejemplos de Deal | ARUMA SALUD TOTAL, ASISTENCIA BANCO ALFIN, VIDA TRANKI GNB y otros futuros |
| Canal inicial cliente | Teléfono |
| Canal operativo complementario | WhatsApp para compartir ubicaciones y coordinar |
| Sistema objetivo | Call Center + componente administrativo para pagos/liquidación proveedor |
| Actividades fuera del sistema | Deben marcarse explícitamente cuando correspondan |
| Geolocalización | MVP condicionado usando WhatsApp; geolocalización completa para fase 2 |
| Disponibilidad proveedor | Manual o semi-automática en MVP; tiempo real en fase 2 |
| Encuesta/scoring | Entra en MVP |

## Líneas de análisis

### 1. Proceso real

Preguntas guía:

- ¿Qué se registra siempre como Solicitud?
- ¿Cuándo una Solicitud pasa a Asistencia?
- ¿Cómo se identifica al cliente: DNI, póliza o certificado?
- ¿Qué datos mínimos requiere el Call Center?
- ¿Qué validaciones ocurren antes de asignar proveedor?
- ¿Qué ocurre si la solicitud es rechazada?
- ¿Qué motivos de no procedencia se deben registrar?
- ¿Cómo se comparte ubicación por WhatsApp?
- ¿Qué parte queda dentro del sistema y qué parte opera por fuera?
- ¿Cómo se confirma proveedor?
- ¿Qué pasa si el proveedor rechaza, no responde o falla después de aceptar?
- ¿Cuándo se emite la Orden de Atención?
- ¿Qué evidencia se exige por servicio?
- ¿Cómo se hace el cierre operativo?
- ¿Cómo se valida la asistencia para liquidación?
- ¿Cómo se liquida/paga al proveedor?
- ¿Qué se reporta o cobra al Deal, si aplica?
- ¿Qué indicadores necesita METAFIN?

### 2. Documento proveedor

Preguntas guía:

- ¿Qué módulos propone?
- ¿Qué proceso asume?
- ¿Habla de aseguradoras cuando debería hablar de Deal?
- ¿Maneja Solicitud y Asistencia como objetos separados?
- ¿Permite registrar solicitudes rechazadas?
- ¿Qué campos define?
- ¿Qué reglas de negocio incluye?
- ¿Qué estados maneja?
- ¿Qué excepciones contempla?
- ¿Qué funcionalidades parecen estándar y no necesariamente METAFIN?
- ¿Qué puntos deben aclararse antes de aprobar?

### 3. Brechas

Tipos de brecha:

| Tipo | Descripción |
|---|---|
| Funcional | Falta una capacidad necesaria |
| Proceso | El flujo del proveedor no sigue el flujo real |
| Datos | Faltan campos, entidades o relaciones |
| Estados | Faltan estados o transiciones |
| Reglas | Faltan validaciones o reglas de negocio |
| Operativa | El diseño no soporta la operación diaria |
| Control | Falta trazabilidad, auditoría, alertas o SLA |
| Documental | Falta evidencia, formato, carga o validación |
| Reportería | Faltan consultas, dashboards o exportaciones |
| Comercial / financiera | Falta liquidación, pago, conciliación o reporte económico |
| Seguridad | Faltan perfiles, permisos, segregación o auditoría |
| Alcance | El proveedor incluye o excluye algo distinto al MVP real |

## Método de trabajo recomendado

### Paso 1: Normalizar términos

Términos obligatorios:

- Solicitud.
- Asistencia.
- Servicio.
- Orden de Atención.
- Siniestro.
- Deal.
- Cliente.
- Beneficiario.
- Declarante.
- Proveedor.
- SLA.
- Evidencia.
- Liquidación.
- Pago proveedor.
- Reporte/cobro a Deal.

### Paso 2: Validar macroflujo

Macroflujo vigente:

1. Contacto y solicitud.
2. Identificación del cliente y contrato/cobertura.
3. Validación de póliza/certificado/cobertura.
4. Registro o cierre de Solicitud.
5. Apertura de Asistencia cuando procede.
6. Clasificación del servicio.
7. Ubicación y condiciones del evento.
8. Búsqueda de proveedor.
9. Selección y preasignación.
10. Confirmación del proveedor.
11. Confirmación al cliente.
12. Emisión de Orden de Atención por asignación confirmada.
13. Ejecución del servicio.
14. Seguimiento, SLA e incidencias.
15. Evidencia y conformidad.
16. Cierre operativo.
17. Encuesta y scoring.
18. Cierre validado para liquidación.
19. Liquidación/pago al proveedor.
20. Reporte/cobro a Deal, si aplica.
21. Reportería y control.

### Paso 2.1: Trazar HTML contra proceso real

Antes de cerrar el proceso real, tomar cada paso/módulo relevante de `funcionalidades y procesos.html` y clasificarlo:

- Conservar en proceso real.
- Ajustar terminología o alcance.
- Pasar a MVP condicionado.
- Pasar a fase 2.
- Mantener fuera del sistema con registro.
- Descartar o dejar pendiente de definición.

Los cambios principales deben quedar documentados en `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`.

### Paso 3: Comparar módulo por módulo

Comparar proceso real contra módulos del proveedor:

- Site y autenticación.
- Configuración de producto.
- Mantenedores.
- Gestión de proveedores.
- Registro de atención.
- Control de orden de atención.
- Liquidaciones.
- Consulta y reportes.
- Carga masiva de pólizas.
- Migraciones.
- Ranking proveedores.
- Reporte valor esperado.
- Encuesta.

### Paso 4: Clasificar alcance por fase

Usar estos valores:

- MVP.
- MVP condicionado.
- Fase 2.
- Fuera del sistema.
- Pendiente de definición.

### Paso 5: Preparar observaciones al proveedor

Cada observación debe tener:

- Tema.
- Ubicación en documento proveedor.
- Problema identificado.
- Impacto.
- Ajuste solicitado.
- Prioridad.
- Requiere decisión METAFIN.

### Paso 6: Mantener visor dinámico

Cuando se cierre una decisión o cambie el proceso real, actualizar también `data/metafin_consolidado.json` si el cambio afecta:

- Etapas del flujo.
- Transiciones y compuertas del flujo.
- Pendientes.
- Alcance MVP, MVP condicionado, fase 2 o fuera del sistema.
- Trazabilidad del HTML.
- Deals o reglas por Deal.

El visor se abre desde `viewer/index.html`. Si el navegador bloquea la lectura del JSON por abrirlo como archivo local, usar el botón **Cargar JSON** y seleccionar `data/metafin_consolidado.json`, o servir la carpeta con un servidor local.
