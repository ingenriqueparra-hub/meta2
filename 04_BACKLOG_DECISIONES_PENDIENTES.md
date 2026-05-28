# Backlog de decisiones pendientes

## Objetivo

Registrar decisiones que METAFIN debe tomar para cerrar el proceso real y poder evaluar correctamente el documento proveedor.

## Decisiones pendientes críticas y altas

Este backlog contiene solo decisiones que todavía requieren definición de METAFIN, negocio, operaciones, TI, administración, finanzas o proveedor. Las decisiones ya resueltas o predefinidas se reflejan directamente en los documentos de proceso, glosario, alcance o matriz.

| ID | Tema | Pregunta de decisión | Opciones | Responsable sugerido | Impacto si no se decide | Estado |
|---|---|---|---|---|---|---|
| DEC-004 | Deals | ¿Qué Deals entran en MVP y qué reglas tiene cada uno? | ARUMA / ALFIN / GNB / otros | Comercial + Producto | Impacta configuración y pruebas | Resuelto parcial: entran ARUMA / ALFIN / GNB al MVP; pendiente definir reglas operativas y de cobertura por Deal |
| DEC-005 | Validación de cobertura | ¿La validación será por carga masiva, API o modelo mixto? | Carga / API / Mixto | TI + Operaciones | Riesgo de validaciones manuales | Pendiente |
| DEC-007 | Solicitudes rechazadas | ¿Qué datos mínimos se registrarán para solicitudes rechazadas? | Mínimo / completo / anonimizado | Operaciones + Legal/TI | Trazabilidad insuficiente | Pendiente |
| DEC-008 | Motivos de no procedencia | ¿Se aprueba el catálogo inicial de motivos? | Aprobar / ajustar | Operaciones | Rechazos inconsistentes | Pendiente |
| DEC-009 | Pago particular | ¿METAFIN ofrecerá atención particular cuando no haya cobertura? | Sí / No / Fase 2 / Por Deal | Negocio + Finanzas | Impacta tarifario, cobro y UX | Pendiente METAFIN |
| DEC-012 | Disponibilidad proveedor MVP | ¿Disponibilidad será manual o semi-automática? | Manual / Semi-automática | Operaciones | Impacta SLA y promesa al cliente | Pendiente |
| DEC-014 | WhatsApp | ¿WhatsApp será canal formal operativo sin integración o integración oficial? | Canal externo / API WhatsApp / Fase 2 | Operaciones + TI | Impacta trazabilidad y costos | Pendiente |
| DEC-015 | Confirmación proveedor | ¿Cuáles serán tiempos máximos para aceptar, rechazar o no responder? | Por servicio / por Deal / estándar | Operaciones | Sin SLA operativo | Pendiente |
| DEC-016 | Falla del proveedor | ¿Qué regla aplica si proveedor acepta y luego falla? | Reasignar / penalizar / escalar | Operaciones | Riesgo experiencia cliente | Pendiente |
| DEC-017 | Evidencias | ¿Se aprueba matriz de evidencia por servicio? | Aprobar / ajustar por servicio / por Deal | Operaciones + Administración | Riesgo de pago sin sustento | Pendiente |
| DEC-018 | Validación evidencia | ¿Quién valida evidencia antes del cierre o pago? | Call Center / Supervisor / Administración | Operaciones + Administración | Bloqueo o pago indebido | Pendiente |
| DEC-019 | SLA | ¿Qué SLA se medirá y desde qué hito? | Solicitud / asignación / confirmación / llegada / cierre | Operaciones | Sin control real de desempeño | Pendiente |
| DEC-020 | Supervisor | ¿Cuándo interviene el Supervisor / Coordinador Operativo? | SLA vencido / reclamo / excepción / proveedor falla | Operaciones | Escalamiento informal | Pendiente |
| DEC-021 | Encuesta/scoring | ¿Cuál será canal, momento y ponderación del scoring MVP? | WhatsApp / llamada / sistema / mixto | Operaciones | MVP incompleto | Pendiente |
| DEC-022 | Liquidación proveedor | ¿Qué flujo administrativo se requiere? | Simple / con aprobación / con factura / con conciliación | Administración | Riesgo financiero y operativo | Pendiente |
| DEC-024 | Reporte/cobro a Deal | ¿Se cobrará, reportará o conciliará contra cada Deal? | Cobro / reporte / conciliación / no aplica | Finanzas + Comercial | Brecha financiera | Pendiente |
| DEC-025 | KPIs MVP | ¿Qué KPIs son obligatorios en MVP? | SLA / costos / solicitudes / asistencias / proveedores / Deal | Gerencia | Falta control ejecutivo | Pendiente |
| DEC-026 | Estructura comercial | ¿Qué jerarquía aplica: Deal, canal, punto de venta, producto, plan? | Por definir | Comercial + Producto | Impacta perfiles y reportes | Pendiente |
| DEC-027 | Planes y coberturas | ¿Cuáles son planes reales, límites y exclusiones por Deal? | Por definir | Producto / Comercial | Impide configurar reglas | Pendiente |
| DEC-028 | Alcance fuera del sistema | ¿Qué pasos quedarán por fuera pero con registro en sistema? | Teléfono / WhatsApp / evidencia / proveedor | Sponsor + Operaciones | Sobrealcance o falta trazabilidad | Pendiente |
| DEC-029 | Tipo de split en paso 16 | ¿El cierre operativo activa siempre encuesta (17) y liquidación (18) en paralelo, o solo la ruta que corresponde al tipo de cierre? | AND-split (siempre paralelo) / XOR-split (según tipo de cierre) | Operaciones + Administración | Casos sin costo inician liquidación innecesariamente; encuesta puede no aplicar | Pendiente |
| DEC-030 | OA — Momento de emisión | ¿La OA debe emitirse antes de la ejecución del servicio (como autorización previa) o después del estado "Asistido" (como indica el documento del proveedor)? | Pre-ejecución como autorización / Post-ejecución como en el PDF / Ambas (pre operativa y post administrativa) | Operaciones + Administración | Sin OA previa no hay autorización formal; liquidación sin OA previa pierde trazabilidad y control | Pendiente — Brecha crítica GAP-011 |
| DEC-031 | Objeto Solicitud en sistema proveedor | ¿METAFIN requerirá al proveedor que su sistema registre la Solicitud como objeto separado de la Asistencia, con trazabilidad de rechazos y motivos NP? | Sí, exigir en MVP / No, registrar rechazos de otra forma / Fase 2 | TI + Operaciones + Sponsor | Sin Solicitud, los rechazos no tienen trazabilidad; auditoría, KPIs de contacto y motivos NP quedan incompletos | Pendiente — Brechas críticas GAP-T04, GAP-001, GAP-004 |
| DEC-032 | Compatibilidad modelo vehicular del proveedor | ¿El modelo de datos del proveedor (campos vehiculares centrales: placa, motor, chasis) es compatible con Deals no vehiculares como ARUMA SALUD TOTAL? | Compatible con configuración / Requiere customización / Incompatible en MVP | TI + Producto | Si es incompatible, ARUMA SALUD TOTAL y otros Deals no vehiculares no pueden operar en la plataforma del proveedor en MVP | Pendiente — Brecha crítica GAP-T03 |
| DEC-033 | Mapeo terminológico: Compañía/Aseguradora del proveedor = Deal | ¿Cómo se mapea "Compañía/Aseguradora" del sistema del proveedor al concepto "Deal" de METAFIN? ¿El proveedor ajusta la terminología o METAFIN opera con la del proveedor? | El proveedor ajusta terminología / METAFIN opera con términos del proveedor / Acuerdo de mapeo en documentación | Comercial + TI | Confusión operativa y riesgo de configuración incorrecta en producción; impacta también módulo de cobro/reporte al Deal | Pendiente — Brechas GAP-T01, GAP-T02, GAP-020 |

## Decisiones por fase

### MVP sugerido

- Registro de Solicitud, incluidas rechazadas.
- Identificación por DNI, póliza o certificado.
- Validación de cobertura.
- Catálogo de motivos de no procedencia.
- Apertura de Asistencia.
- Clasificación de servicio.
- Ubicación vía WhatsApp como MVP condicionado, con registro en sistema.
- Gestión manual o semi-automática de proveedor.
- Confirmación proveedor como compuerta de decisión.
- Confirmación al cliente.
- Orden de Atención al confirmar proveedor.
- Seguimiento básico y SLA mínimo.
- Evidencias por servicio.
- Cierre operativo.
- Encuesta y scoring.
- Cierre validado para liquidación.
- Liquidación/pago proveedor.
- Reportes operativos mínimos.
- Seguridad y perfiles.
- Carga masiva/migración inicial si no existe integración.

### Reglas por Deal a definir

Estas reglas aplican a los Deals confirmados para MVP: **ARUMA**, **ALFIN** y **GNB**. Deben completarse por cada Deal antes de cerrar configuración, pruebas y validación funcional.

| Regla | Qué se debe definir por Deal | Impacto |
|---|---|---|
| Servicios cubiertos | Qué asistencias aplica cada Deal: salud, grúa, auxilio mecánico, chofer, hogar u otros | Determina catálogo de servicios y validación de cobertura |
| Planes | Si el Deal tiene plan único o varios planes | Impacta configuración de producto/plan |
| Límites de uso | Máximo de asistencias por mes, año, evento, servicio o beneficiario | Impacta procedencia, rechazos y alertas |
| Vigencia | Cómo se valida si el cliente, póliza, certificado o afiliación está activo | Impacta validación inicial |
| Identificador de búsqueda | DNI, póliza, certificado, placa u otro identificador permitido | Impacta UX del Call Center y carga de datos |
| Exclusiones | Casos, condiciones o servicios en los que no procede la asistencia | Impacta motivos de no procedencia |
| Zonas de cobertura | Distritos, ciudades, regiones o ámbitos donde aplica el servicio | Impacta asignación de proveedor y rechazo por zona |
| Evidencias exigidas | Sustentos obligatorios por servicio para cierre y/o pago | Impacta cierre operativo y liquidación proveedor |
| Tarifas o topes | Montos máximos, tarifarios, deducibles o reglas especiales de costo | Impacta presupuesto, OA y liquidación |
| Reporte/cobro al Deal | Si corresponde reporte, cobro, conciliación o no aplica | Impacta administración, finanzas y reportería |

### MVP condicionado

- WhatsApp como canal operativo formal, sin integración plena.
- Ubicación compartida por cliente/proveedor vía WhatsApp.
- Registro manual de enlaces, capturas o evidencia proveniente de WhatsApp.
- Disponibilidad semi-automática si se cuenta con datos confiables.

### Fase 2 candidata

- Geolocalización integrada con mapas/GPS.
- Disponibilidad proveedor en tiempo real.
- Portal proveedor o app proveedor.
- Portal cliente.
- WhatsApp Business API integrada.
- Evidencias avanzadas con firma/GPS automático.
- Dashboards gerenciales avanzados.
- Conciliación financiera extendida.
- Automatización avanzada de reporte/cobro a Deal.

### Fuera del sistema con registro

- Llamada telefónica inicial.
- Conversaciones operativas por WhatsApp en MVP, salvo integración futura.
- Coordinación manual con proveedor si no existe portal/app.
- Recepción de evidencias por WhatsApp, con carga o registro posterior en sistema.
