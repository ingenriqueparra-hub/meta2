# Matriz de comparación: Proceso real vs Documento proveedor

## Uso

Esta matriz sirve para comparar el proceso real de METAFIN contra el documento funcional del proveedor.

No llenar como resumen. Llenar como herramienta de decisión.

## Consideraciones vigentes

- El proceso real vigente se basa en los `.md`; el HTML solo se usa como trazabilidad del borrador original.
- El HTML es borrador base de descubrimiento; cuando aporte una necesidad, debe citarse como referencia del proceso real depurado, no como definición final.
- METAFIN trabaja con **Deal**, no con aseguradoras.
- Se debe detectar si el proveedor usa conceptos de aseguradora/compañía de seguros que deban reinterpretarse o ajustarse a Deal.
- Se debe distinguir **Solicitud** de **Asistencia**.
- Se registran también solicitudes rechazadas.
- No todo debe estar dentro del sistema; cuando aplique, marcar "fuera del sistema con registro".

## Fuente del análisis

Documento analizado: **Global TPA — Documento Funcional v2.pdf**
Fecha de análisis: 2026-05-28
Proceso real de referencia: `02_PROCESO_REAL_WORKING_DRAFT.md` (21 pasos)

## Alertas transversales

| ID | Alerta | Necesidad METAFIN | Qué hace el proveedor | Alineación | Severidad | Impacto | Recomendación | Decisión pendiente |
|---|---|---|---|---|---|---|---|---|
| GAP-T01 | Terminología: Deal vs aseguradora | METAFIN trabaja con Deal, no con compañías de seguros ni aseguradoras | El PDF usa "compañía de seguros", "aseguradora" y "Clientes-Compañías" en todo el documento | Contradictorio | Alta | Cualquier parametrización de "Compañía" debe reinterpretarse como "Deal"; riesgo de confusión operativa y contractual | Aclarar con proveedor: solicitar ajuste terminológico en el documento y en la configuración del sistema | DEC-033 |
| GAP-T02 | Terminología: Siniestro vs Asistencia | El objeto operativo es "Asistencia"; "Siniestro" es término restringido a productos específicos de METAFIN | El PDF usa "Siniestro" como término universal en varios módulos | Contradictorio | Alta | Confusión operativa; los agentes del Call Center usarán términos incorrectos al operar el sistema | Aclarar con proveedor: confirmar si el sistema puede parametrizar el término "Asistencia" o si es fijo | DEC-033 |
| GAP-T03 | Modelo vehicular vs multi-servicio | METAFIN cubre Deals multi-servicio: salud, vida, hogar y vehicular | El PDF usa campos vehiculares (placa, motor, chasis) como estructura central de prácticamente todos los módulos | Contradictorio | Crítica | ARUMA SALUD TOTAL no usa placa; la plataforma puede ser incompatible con Deals no vehiculares si esos campos son obligatorios | Aclarar con proveedor: confirmar si los campos vehiculares son opcionales y si el modelo admite Deals de salud/vida/hogar | DEC-032 |
| GAP-T04 | Ausencia del objeto Solicitud | Toda solicitud debe registrarse como objeto trazable, incluso si luego se rechaza, previo a la Asistencia | El PDF no tiene objeto Solicitud; el flujo comienza directamente con el registro de Atención (equivalente a Asistencia) | Contradictorio | Crítica | Sin objeto Solicitud, los rechazos pre-Asistencia no tienen trazabilidad; imposible auditar NP, volumen de contactos y KPIs de rechazo | Exigir en MVP: solicitar al proveedor implementar objeto Solicitud o mecanismo de registro pre-Asistencia | DEC-031 |

## Matriz principal — 21 pasos del proceso real

| ID | Paso / módulo | Necesidad del proceso real | Qué dice el documento proveedor | Alineación | Brecha identificada | Severidad | Impacto | Recomendación | Decisión pendiente |
|---|---|---|---|---|---|---|---|---|---|
| GAP-001 | Paso 1 — Contacto y solicitud | Registrar toda solicitud recibida por teléfono, incluso si luego se rechaza, como objeto independiente previo a la Asistencia | El PDF no define objeto "Solicitud". El flujo inicia directamente con "Registro de Atención Asistencia" (Req-06) sin trazabilidad previa | No cubierto | No existe objeto Solicitud; los rechazos pre-Asistencia no tienen registro en el sistema del proveedor | Crítica | Sin trazabilidad de solicitudes rechazadas; imposible auditar motivos NP ni volumen real de contactos | Exigir en MVP: requerir al proveedor que el sistema registre la solicitud antes de crear la Asistencia | DEC-031 |
| GAP-002 | Paso 2 — Identificación cliente / contrato | Buscar por DNI, número de póliza o certificado según el Deal | Req-06 permite búsqueda por póliza y placa; centrado en modelo vehicular; sin búsqueda por DNI ni certificado no vehicular | Parcial | Búsqueda limitada a campos vehiculares; sin DNI para Deals de salud/vida | Alta | ARUMA SALUD TOTAL no usa placa; la identificación fallará para Deals no vehiculares | Exigir en MVP: ampliar identificadores de búsqueda a DNI, póliza, certificado y placa según Deal | DEC-027 |
| GAP-003 | Paso 3 — Validación de cobertura | Validar vigencia, plan, Deal, límites de uso y servicio cubierto antes de proceder | Req-06 valida póliza y vigencia dentro del registro de atención; orientado a cobertura vehicular; límites de uso no mencionados explícitamente | Parcial | Sin validación explícita de límites de uso ni cobertura por tipo de Deal no vehicular | Alta | Riesgo de autorizar asistencias fuera de límites o para servicios no cubiertos por el Deal | Aclarar con proveedor: confirmar si límites de uso y catálogo de servicios por Deal/plan son configurables | DEC-027 |
| GAP-004 | Paso 4 — Compuerta de procedencia / solicitud rechazada | Registrar solicitud rechazada con motivo de no procedencia (NP-xxx) como objeto trazable con fecha, Deal y operador | El PDF no tiene compuerta de procedencia; si la póliza no es válida, el flujo no continúa sin generar un registro trazable de rechazo | Contradictorio | Solicitudes rechazadas no quedan en el sistema; sin catálogo de motivos NP visible en el documento | Crítica | Sin trazabilidad de rechazos; auditoría, conciliación y mejora continua son imposibles | Exigir en MVP: requerir registro de rechazo con motivo, fecha, Deal y operador | DEC-031, DEC-007, DEC-008 |
| GAP-005 | Paso 5 — Apertura de Asistencia | Crear el objeto Asistencia cuando la solicitud procede o es autorizada por excepción | Req-06 crea directamente el registro de atención (equivalente a Asistencia) sin solicitud previa | Parcial | No hay separación entre Solicitud y Asistencia; la Asistencia se abre sin haber registrado la Solicitud | Alta | Solicitudes rechazadas antes de abrir Asistencia quedan sin registro; inconsistencia con DEC-007 | Aclarar con proveedor: confirmar si el sistema puede soportar objeto Solicitud previo a Asistencia | DEC-031 |
| GAP-006 | Paso 6 — Clasificación del servicio | Definir tipo y subtipo de servicio según Deal y plan | Req-04 tiene mantenedor de planes y servicios; Req-05 define tipos de servicio proveedor; catálogos orientados a vehicular (grúa, mecánico, chófer) | Parcial | Catálogos de servicio no cubren Deals de salud/vida; sin parametrización por Deal confirmada | Alta | ARUMA SALUD TOTAL requiere servicios de salud que el catálogo vehicular no contempla | Aclarar con proveedor: confirmar si el catálogo de servicios es configurable por Deal/plan o si es fijo | DEC-027 |
| GAP-007 | Paso 7 — Obtención de ubicación | Obtener ubicación del cliente vía WhatsApp (MVP condicionado) y registrarla en sistema | WhatsApp mencionado como canal de comunicación en el PDF; sin módulo formal de obtención de ubicación; la geolocalización implica mapa/GPS integrado | Parcial | Sin flujo formal de obtención de ubicación en MVP; WhatsApp como canal no está integrado ni documentado | Media | Ubicación puede obtenerse informalmente, pero sin trazabilidad en el sistema | Mantener fuera del sistema con registro: WhatsApp externo, dirección registrada manualmente en sistema | DEC-014 |
| GAP-008 | Paso 8 — Búsqueda de proveedor disponible | Seleccionar proveedor candidato según tipo de servicio, zona y disponibilidad (manual en MVP) | Req-05 es mantenedor de proveedores (datos maestros); no hay módulo de búsqueda/selección dinámica de proveedor por zona y servicio | No cubierto | Sin módulo de selección de proveedor disponible; sin motor de búsqueda por zona/servicio/disponibilidad | Alta | Asignación de proveedor depende del conocimiento manual del operador; sin soporte del sistema | Exigir en MVP: requerir módulo básico de selección de proveedor por tipo de servicio y zona | DEC-012 |
| GAP-009 | Paso 9 — Preasignación de proveedor | Registrar la preasignación del proveedor antes de su confirmación formal, diferenciándola de la asignación confirmada | El PDF no distingue preasignación de asignación confirmada; la asignación parece directa tras la selección | No cubierto | Sin estado de preasignación; no hay diferencia entre "candidato seleccionado" y "proveedor confirmado" | Media | Riesgo de asignar sin confirmación formal; sin control de si el proveedor fue contactado y respondió | Exigir en MVP: definir estados diferenciados: candidato / preasignado / confirmado / rechazado | DEC-015 |
| GAP-010 | Paso 10 — Confirmación del proveedor | Registrar respuesta del proveedor: acepta, rechaza, no responde o acepta y luego falla | El PDF no define flujo de confirmación del proveedor como compuerta explícita; sin manejo de rechazo, no respuesta ni falla post-aceptación | No cubierto | Sin flujo de confirmación proveedor; sin manejo de rechazo, no respuesta ni falla; sin SLA de respuesta | Crítica | Sin control del ciclo de vida del proveedor asignado; riesgo de servicio sin ejecutor confirmado | Exigir en MVP: requerir estados y flujos para aceptación, rechazo, no respuesta y falla del proveedor | DEC-015, DEC-016 |
| GAP-011 | Paso 11 — Emisión de Orden de Atención | Emitir la OA tras confirmación del proveedor, como autorización previa a la ejecución del servicio | Req-07 indica que la OA se genera cuando el estado es "Asistido", es decir, después de la ejecución del servicio | Contradictorio | OA emitida post-ejecución en el PDF vs pre-ejecución en METAFIN; inversión crítica del flujo de autorización | Crítica | Sin OA previa no hay autorización formal; la liquidación sin OA previa pierde control y trazabilidad | Exigir en MVP: clarificar y corregir que la OA debe emitirse antes de la ejecución como autorización operativa | DEC-030 |
| GAP-012 | Paso 12 — Confirmación al cliente | Informar al cliente datos del proveedor asignado (ETA, nombre, contacto) y registrar la confirmación en sistema | Req-06 y notificadores mencionan comunicación al cliente, pero como notificación automática; no como paso operativo trazable con registro explícito | Parcial | Notificación al cliente no está modelada como paso con registro; sin trazabilidad de cuándo fue informado y con qué datos | Baja | Riesgo de cliente sin información; sin trazabilidad de la confirmación | Aclarar con proveedor: confirmar qué datos se notifican al cliente y si el registro queda en la Asistencia | — |
| GAP-013 | Paso 13 — Ejecución del servicio | Registrar estado de ejecución: atendido, cancelado con costo, cancelado sin costo, fallido, reclamado | Req-07 tiene estados de asistencia; catálogo aparentemente orientado a vehículos; sin detalle para servicios de salud/vida | Parcial | Catálogo de estados de ejecución no confirmado para Deals no vehiculares | Media | Sin estados correctos, el cierre operativo y la liquidación no pueden distinguir casos con y sin costo | Aclarar con proveedor: confirmar catálogo completo de estados de ejecución para cada tipo de servicio y Deal | DEC-027 |
| GAP-014 | Paso 14 — Seguimiento e incidencias (subproceso) | Gestionar escalamiento, reasignación, incidencias y reclamaciones como subproceso con estados y responsables definidos | El PDF no tiene módulo explícito de gestión de incidencias o escalamiento; sin mención del rol Supervisor ni de reglas de reasignación | No cubierto | Sin subproceso de incidencias; sin rol Supervisor; sin reglas de reasignación ni escalamiento | Alta | Fallos, reclamos y no respuestas del proveedor no tienen flujo de resolución; riesgo operativo alto en MVP | Exigir en MVP: requerir al proveedor módulo de incidencias con estados, responsables y reglas de escalamiento | DEC-016, DEC-020 |
| GAP-015 | Paso 15 — Recepción y registro de evidencias | Recibir, registrar y validar evidencias según matriz por servicio antes del cierre y pago | Req-07 menciona sustentos y adjuntos como parte del cierre, pero sin matriz de evidencia por servicio ni flujo formal de validación | No cubierto | Sin matriz de evidencia por servicio; sin flujo de recepción, observación y aprobación de evidencias | Alta | Riesgo de liquidar sin sustento; sin trazabilidad de qué evidencia valida cada tipo de servicio | Exigir en MVP: requerir módulo de evidencias con tipos por servicio, estados y responsable de validación | DEC-017, DEC-018 |
| GAP-016 | Paso 16 — Cierre operativo | Registrar cierre operativo separado de la validación para liquidación; activar encuesta y/o validación según tipo de cierre | Req-07 tiene cierre de asistencia, pero no distingue entre cierre operativo y cierre para liquidación; sin split por tipo de cierre | Parcial | Cierre operativo y validación para liquidación están mezclados en un mismo estado; sin lógica de split | Alta | Sin separación, el cierre operativo puede activar liquidación sin evidencia validada | Exigir en MVP: separar cierre operativo de validación para liquidación como pasos distintos | DEC-029 |
| GAP-017 | Paso 17 — Encuesta y scoring | Registrar encuesta al cliente y scoring del proveedor como parte del cierre en MVP | Req-13 menciona encuestas pero sin especificación funcional en el documento; sin detalle de canal, momento ni ponderación | Pendiente de definición | Encuesta mencionada sin funcionalidad definida en el documento del proveedor | Media | Sin encuesta en MVP el scoring del proveedor es incompleto; imposible evaluar calidad del servicio | Validar con negocio: definir canal, momento y ponderación antes de solicitar especificación al proveedor | DEC-021 |
| GAP-018 | Paso 18 — Cierre validado para liquidación | Validar evidencia y costo antes de autorizar liquidación; este paso es compuerta previa, separado del cierre operativo | Req-08 tiene validación de costos como parte del proceso de liquidación, pero integrado con el registro de costos, no como etapa previa independiente | Parcial | Validación de evidencia/costo no está separada del cierre operativo ni como compuerta previa a liquidación | Alta | Riesgo de iniciar liquidación sin evidencia aprobada; sin control del responsable de validación | Exigir en MVP: requerir paso de validación de evidencia/costo como compuerta antes de emitir orden de pago | DEC-018 |
| GAP-019 | Paso 19 — Liquidación / pago proveedor | Registrar factura del proveedor, aprobar pago y liquidar contra la OA | Req-08 cubre liquidación con factura, aprobación y pago; es el módulo más completo y detallado del documento | Alineado | Módulo de liquidación cubre la necesidad; riesgo menor de compatibilidad con Deals no vehiculares | Baja | Verificar que el módulo aplica a todos los tipos de Deal y servicio, no solo vehicular | Mantener como opcional: confirmar compatibilidad con Deals no vehiculares antes de aceptar sin cambios | — |
| GAP-020 | Paso 20 — Reporte / cobro al Deal | Reportar, cobrar o conciliar contra el Deal correspondiente; módulo separado de la liquidación al proveedor | El PDF no distingue liquidación proveedor de reporte/cobro al Deal; el módulo "Clientes-Compañías" usa lógica de aseguradora; sin módulo de cobro/reporte al Deal | Contradictorio | Reporte/cobro al Deal no existe como módulo separado; el PDF mezcla pago proveedor con cobro aseguradora | Alta | Brecha financiera crítica para METAFIN; sin módulo separado no se puede cobrar ni reportar al Deal | Exigir en MVP: requerir módulo de reporte/cobro al Deal con separación explícita de liquidación proveedor | DEC-024, DEC-033 |
| GAP-021 | Paso 21 — Reportería y control | KPIs operativos, financieros y de calidad; dashboards y exportaciones definidos para MVP | Req-09 tiene reportes de asistencias, proveedores y ranking; funcionalidad básica presente pero sin KPIs específicos del MVP ni separación por Deal | Parcial | Reportes existen pero sin definición de KPIs obligatorios para MVP ni separación por Deal | Media | Sin KPIs acordados, la reportería no respalda control ejecutivo ni evaluación de SLA | Validar con negocio: definir KPIs obligatorios del MVP antes de configurar reportes en el sistema del proveedor | DEC-025 |

## Resumen de alineación

| Alineación | IDs |
|---|---|
| Alineado | GAP-019 |
| Parcial | GAP-002, GAP-003, GAP-005, GAP-006, GAP-007, GAP-012, GAP-013, GAP-016, GAP-018, GAP-021 |
| No cubierto | GAP-001, GAP-008, GAP-009, GAP-010, GAP-014, GAP-015 |
| Contradictorio | GAP-004, GAP-011, GAP-020, GAP-T01, GAP-T02, GAP-T03, GAP-T04 |
| Pendiente de definición | GAP-017 |

## Brechas críticas prioritarias

| Prioridad | ID | Descripción corta | Decisión requerida |
|---|---|---|---|
| 1 | GAP-011 | OA emitida post-ejecución en el PDF; METAFIN requiere OA pre-ejecución como autorización | DEC-030 |
| 2 | GAP-T04, GAP-001, GAP-004 | Sin objeto Solicitud; rechazos no registrables en el sistema del proveedor | DEC-031 |
| 3 | GAP-T03 | Modelo vehicular del proveedor potencialmente incompatible con ARUMA SALUD TOTAL y Deals no vehiculares | DEC-032 |
| 4 | GAP-010 | Sin flujo de confirmación del proveedor; sin manejo de rechazo, no respuesta ni falla | DEC-015, DEC-016 |
| 5 | GAP-T01, GAP-020 | Terminología aseguradora y sin módulo separado de cobro/reporte al Deal | DEC-033 |

## Valores permitidos

### Alineación

- Alineado
- Parcial
- No cubierto
- Sobredimensionado
- Contradictorio
- Pendiente de definición

### Severidad

- Crítica
- Alta
- Media
- Baja

### Recomendación

- Exigir en MVP
- MVP condicionado
- Pasar a fase 2
- Aclarar con proveedor
- Validar con negocio
- Eliminar / descartar
- Mantener fuera del sistema con registro
- Mantener como opcional

## Matriz de cobertura por módulo

| Módulo proceso real | Módulo proveedor equivalente | Cobertura | Comentario |
|---|---|---|---|
| Solicitudes | No existe | No cubierto | El proveedor no tiene objeto Solicitud; empieza directamente con la Asistencia |
| Asistencias | Registro de Atención Asistencia (Req-06) | Parcial | Asistencia existe pero sin solicitud previa ni trazabilidad de rechazos |
| Deal | Clientes-Compañías / Configuración Producto (Req-02, Req-03) | Contradictorio | El proveedor usa "aseguradora/compañía de seguros"; mapeo a Deal debe acordarse explícitamente |
| Pólizas/certificados | Carga Masiva Pólizas (Req-10) / Consulta Pólizas (Req-06) | Parcial | Pólizas vehiculares bien cubiertas; sin certificados ni DNI para Deals no vehiculares |
| Clientes / beneficiarios | Carga de pólizas / Registro de atención | Parcial | Modelo vehicular; sin perfiles de beneficiarios no vehiculares |
| Servicios | Mantenedor Plan y Servicios (Req-04) | Parcial | Catálogo configurable pero orientado a vehicular; sin confirmación de cobertura multi-servicio |
| Proveedores | Módulo de Gestión de Proveedores (Req-05) | Parcial | Mantenedor de datos maestros; sin selección dinámica ni flujo de confirmación/rechazo |
| Confirmación proveedor | No existe | No cubierto | Sin flujo de aceptación, rechazo, no respuesta ni falla del proveedor |
| Ubicación WhatsApp | No integrado | No cubierto | WhatsApp mencionado como canal; sin módulo de obtención/registro de ubicación en MVP |
| Geolocalización integrada | No identificado en los Req del MVP | No cubierto | Fase 2 |
| Orden de Atención | Control de Orden de Atención (Req-07) | Contradictorio | OA generada post-ejecución en el PDF; METAFIN requiere OA pre-ejecución como autorización |
| Incidencias y escalamiento | No existe módulo explícito | No cubierto | Sin subproceso de incidencias ni rol Supervisor |
| Evidencias | Sustentos / adjuntos en Req-07 | No cubierto | Sin matriz de evidencia por servicio ni flujo formal de validación |
| Seguimiento/SLA | Control de Orden de Atención (Req-07) | Parcial | Estados existen pero sin SLA, hitos ni escalamiento formal |
| Cierre operativo | Estado de cierre en Req-07 | Parcial | Cierre existe pero mezclado con validación para liquidación; sin split por tipo de cierre |
| Encuesta/scoring | Req-13 (sin especificación funcional) | Pendiente de definición | Mencionada pero sin funcionalidad definida en el documento |
| Liquidación proveedor | Módulo de Liquidaciones (Req-08) | Alineado | Módulo más completo del documento; cubre factura, aprobación y pago |
| Reporte/cobro Deal | No existe | No cubierto | Sin módulo separado; el proveedor mezcla cobro al Deal con pago al proveedor |
| Reportería y analítica | Consulta y Reportes (Req-09) | Parcial | Reportes básicos existen; sin KPIs MVP definidos ni separación por Deal |
| Usuarios y seguridad | Site y Autenticación / Perfiles (Req-01, Req-02) | Parcial | Perfiles básicos existen; validar cobertura de roles METAFIN: Call Center, Supervisor, Admin pagos |

## Plantilla de observación al proveedor

| Campo | Contenido |
|---|---|
| ID observación | OBS-000 |
| Tema |  |
| Sección del documento proveedor |  |
| Observación |  |
| Impacto operativo |  |
| Ajuste solicitado |  |
| Prioridad | Crítica / Alta / Media / Baja |
| Requiere decisión METAFIN | Sí / No |
| Comentario adicional |  |
