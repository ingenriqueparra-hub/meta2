# Proceso real de METAFIN Asistencias — Working Draft

> Este documento es una versión de trabajo. No debe tratarse como proceso cerrado. Normaliza y depura el borrador `funcionalidades y procesos.html` para convertirlo en proceso real vigente dentro de los `.md`.

## Origen y normalización del borrador HTML

El archivo `funcionalidades y procesos.html` se usa como borrador inicial de descubrimiento. No es una definición aprobada del proceso real.

Al depurar el flujo para METAFIN, el contenido del HTML debe interpretarse con estas reglas:

| Elemento del HTML | Tratamiento en proceso real |
|---|---|
| Aseguradora / compañía de seguros | Reinterpretar como **Deal** cuando corresponda |
| Caso / ticket | Normalizar como **Solicitud** o **Asistencia**, según el momento del flujo |
| Orden de Servicio / OS | Homologar a **Orden de Atención** como término oficial METAFIN |
| Geolocalización integrada / GPS / mapa en tiempo real | No asumir MVP; clasificar como fase 2 salvo decisión expresa |
| WhatsApp Business API | No asumir integración MVP; WhatsApp puede operar como canal externo con registro |
| App proveedor / portal cliente / portal proveedor | No asumir MVP; clasificar como fase 2 salvo decisión expresa |
| Cobro a aseguradora | Reinterpretar como reporte/cobro/conciliación a **Deal**, si aplica |
| Scoring / encuesta | Mantener en MVP, pero definir canal, reglas y ponderación |

La trazabilidad detallada entre el HTML y este proceso depurado debe mantenerse en `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`.

## Pendientes controlados del flujo

Estos puntos no contradicen el flujo; son decisiones que deben mantenerse visibles hasta validación METAFIN:

| Tema | Predefinición de trabajo | Decisión pendiente |
|---|---|---|
| Evidencia | La evidencia es requerida para cierre/pago según servicio | Confirmar si valida Call Center, Supervisor o Área Administrativa |
| Encuesta/scoring | Entra en MVP | Definir canal, momento, ponderación y efecto en ranking proveedor |

## Principio

El proceso real debe describir cómo METAFIN quiere operar el servicio de asistencias de punta a punta, desde la solicitud del cliente hasta el cierre operativo, evidencia, encuesta/scoring, liquidación al proveedor, eventual reporte/cobro al Deal y analítica de control.

## Aclaraciones vigentes

| Tema | Definición actual |
|---|---|
| Relación comercial | METAFIN trabaja con **Deal**, no con aseguradoras |
| Deals actuales o próximos | ARUMA SALUD TOTAL, ASISTENCIA BANCO ALFIN, VIDA TRANKI GNB y otros futuros |
| Canal inicial | Cliente llama por teléfono al Call Center |
| Canal complementario | WhatsApp para compartir ubicación y coordinar con cliente/proveedor |
| Sistema | Principalmente para Call Center y administración de pagos/liquidación proveedor |
| Fuera del sistema | Algunas coordinaciones pueden quedar por teléfono/WhatsApp y deben quedar registradas en sistema solo como trazabilidad |
| Geolocalización MVP | Condicionada: ubicación compartida por WhatsApp y registrada manualmente o como enlace/evidencia |
| Geolocalización fase 2 | Integración completa con mapas/GPS/seguimiento en tiempo real |
| Disponibilidad proveedor MVP | Manual o semi-automática |
| Disponibilidad proveedor fase 2 | Tiempo real |
| Encuesta/scoring | Entra en MVP |

## Jerarquía funcional

| Nivel | Término | Definición de trabajo | Observación |
|---|---|---|---|
| 1 | Solicitud | Contacto inicial del cliente con METAFIN, aun si se rechaza | Se registra siempre |
| 2 | Asistencia | Unidad operativa principal cuando la solicitud procede | Nace después de validación mínima o por excepción autorizada |
| 3 | Servicio | Tipo/subtipo requerido: grúa, auxilio mecánico, chofer, salud, hogar u otro según Deal | Puede variar por Deal y plan |
| 4 | Orden de Atención | Documento/autorización al proveedor para ejecutar o sustentar pago | Se genera tras asignación confirmada; se habilita para liquidación tras cierre validado |
| 5 | Siniestro | Evento asociado cuando aplique por tipo de producto/servicio | No usar como término universal |

## Actores preliminares

| Actor | Rol esperado | Dentro/Fuera del sistema | Pendiente de validar |
|---|---|---|---|
| Cliente / beneficiario | Solicita asistencia y recibe servicio | Teléfono/WhatsApp fuera; datos y estado dentro | Diferenciar cliente, titular, asegurado, beneficiario y declarante según Deal |
| Call Center | Atiende solicitud, identifica, valida, coordina proveedor y da seguimiento | Dentro del sistema | Confirmar perfiles y permisos |
| Sistema | Registra solicitudes, asistencias, estados, OA, evidencias, encuestas, liquidaciones y reportes | Dentro | Confirmar automatizaciones MVP |
| Proveedor del servicio | Ejecuta servicio, confirma atención y entrega evidencias | WhatsApp/teléfono en MVP; portal/app fase 2 | Confirmar canal y evidencia obligatoria |
| Supervisor / Coordinador Operativo | Atiende escalamiento, SLA, incidencias y excepciones | Dentro | Definir reglas de intervención |
| Área Administrativa | Valida cierre para liquidación, controla factura y pago proveedor | Dentro | Confirmar flujo contable real |
| Deal | Contraparte comercial a la que se reporta/cobra según acuerdo | Parcial dentro: reportes/cobranzas | Confirmar reglas por Deal |
| Administración METAFIN / Finanzas | Control económico, pagos, recuperaciones o reportes | Dentro/parcial | Definir separación con Área Administrativa |

## Macroflujo propuesto actualizado

| # | Etapa | Actor principal | Resultado esperado | Sistema / fuera del sistema | Estado de definición |
|---|---|---|---|---|---|
| 1 | Contacto y solicitud | Cliente / Call Center | Solicitud recibida | Teléfono fuera; registro dentro | Validado base |
| 2 | Identificación cliente / contrato | Call Center | Cliente identificado por DNI, póliza o certificado | Dentro | Validado base |
| 3 | Validación de póliza/certificado/cobertura | Call Center / Sistema | Procede, no procede o requiere excepción | Dentro | Crítico |
| 4 | Registro o cierre de Solicitud | Call Center / Sistema | Solicitud registrada, incluso si es rechazada | Dentro | Crítico |
| 5 | Apertura de Asistencia | Call Center / Sistema | Asistencia creada si procede o por excepción autorizada | Dentro | Crítico |
| 6 | Clasificación del servicio | Call Center | Servicio/subservicio definido | Dentro | Crítico |
| 7 | Ubicación y condiciones del evento | Cliente / Call Center | Ubicación, referencia, urgencia, condiciones operativas | WhatsApp fuera; registro dentro | MVP condicionado |
| 8 | Búsqueda de proveedor | Call Center / Sistema | Proveedores candidatos | Dentro + consulta manual si aplica | Por validar |
| 9 | Selección y preasignación | Call Center | Proveedor seleccionado para confirmar | Dentro | Crítico |
| 10 | Confirmación del proveedor | Call Center / Proveedor | Acepta, rechaza, no responde o falla luego de aceptar | Teléfono/WhatsApp fuera; resultado dentro | Crítico |
| 11 | Emisión de Orden de Atención | Sistema / Call Center | OA emitida/enviada al proveedor | Dentro; envío puede ser WhatsApp/correo | Crítico |
| 12 | Confirmación al cliente | Call Center | ETA y datos del proveedor informados | Teléfono/WhatsApp fuera; registro dentro | Crítico |
| 13 | Ejecución del servicio | Proveedor | Servicio realizado, fallido o cancelado | Fuera; eventos registrados dentro | Crítico |
| 14 | **Subproceso:** Seguimiento, SLA e incidencias | Call Center / Supervisor | Control de avance, alertas y escalamiento | Dentro + comunicación fuera | Alta |
| 15 | Evidencia y conformidad | Proveedor / Cliente / Call Center | Evidencias recibidas y validadas | WhatsApp/fotos fuera; registro dentro | Alta |
| 16 | Cierre operativo | Call Center / Sistema | Asistencia cerrada, cancelada o reclamada | Dentro | Crítico |
| 17 | Encuesta y scoring *(paralelo con 18→19→20)* | Sistema / Cliente / Call Center | Satisfacción y scoring proveedor actualizados | MVP dentro o canal externo registrado | MVP con definición pendiente |
| 18 | Cierre validado para liquidación *(paralelo con 17)* | Call Center / Área Admin | OA/asistencia habilitada para liquidación — el loop 18→15 no reabre el cierre operativo | Dentro | Crítico |
| 19 | Liquidación / pago al proveedor | Área Administrativa | Factura/validación/aprobación/pago controlado | Dentro | Crítico |
| 20 | Reporte / cobro al Deal si aplica | Administración / Finanzas | Reporte, cobro o conciliación por Deal | Dentro/parcial | Por definir |
| 21 | Reportería y control | Sistema / Gestión | KPIs, exportaciones y trazabilidad | Dentro | Alta |

## Descripción narrativa del flujo

| # | Etapa | Descripción de lo que ocurre |
|---|---|---|
| 1 | Contacto y solicitud | El cliente contacta al Call Center por teléfono para solicitar asistencia. La solicitud se recibe aunque aún no se haya validado cobertura. |
| 2 | Identificación cliente / contrato | El Call Center busca al cliente en el sistema por DNI, número de póliza o certificado. Si el cliente no es localizado, se registra la solicitud y se cierra con motivo NP-001. |
| 3 | Validación de póliza/certificado/cobertura | El sistema verifica la vigencia del contrato, coberturas aplicables y límites del servicio según el Deal para determinar si la solicitud procede. |
| 4 | Registro o cierre de Solicitud | Se registra formalmente la solicitud con su resultado en el sistema. Toda solicitud queda registrada, incluso las rechazadas o desistidas. |
| 5 | Apertura de Asistencia | El Call Center crea la Asistencia como unidad operativa cuando la solicitud procede o se autoriza por excepción. La Asistencia agrupa todos los servicios del caso. |
| 6 | Clasificación del servicio | El Call Center define el tipo y subtipo de servicio requerido según el catálogo del Deal para dimensionar correctamente la atención. |
| 7 | Ubicación y condiciones del evento | El cliente informa la ubicación del evento, referencias de acceso, urgencia y condiciones relevantes. El Call Center las registra en el sistema. Si la ubicación no puede obtenerse, el caso escala al subproceso de seguimiento e incidencias (paso 14). |
| 8 | Búsqueda de proveedor | El Call Center consulta el sistema para identificar proveedores disponibles según zona, tipo de servicio, SLA y tarifa aplicable al Deal. |
| 9 | Selección y preasignación | El Call Center selecciona al proveedor candidato en base a zona de cobertura, servicio requerido, tarifa, SLA y calificación acumulada. |
| 10 | Confirmación del proveedor | El Call Center contacta al proveedor para confirmar disponibilidad y aceptación. Se registra el resultado: acepta, rechaza, no responde o falla después de aceptar. |
| 11 | Emisión de Orden de Atención | El sistema genera la Orden de Atención (OA) con los datos del servicio y la envía al proveedor por el canal definido: sistema, WhatsApp o correo. La OA se emite antes de informar al cliente. |
| 12 | Confirmación al cliente | Con la OA emitida, el Call Center informa al cliente el nombre del proveedor asignado y el tiempo estimado de llegada (ETA). Se registra la comunicación en el sistema. |
| 13 | Ejecución del servicio | El proveedor realiza la atención en campo. El Call Center registra en el sistema los eventos relevantes durante la ejecución del servicio. |
| 14 | Subproceso: Seguimiento, SLA e incidencias | Hub de gestión de excepciones. Recibe flujos de: sin proveedor disponible, proveedor que falla/no responde y servicio fallido/reclamado. Monitorea avance, controla SLA y activa escalamiento. Despacha hacia: reasignación de proveedor, reanudación del servicio o cierre por incidencia. |
| 15 | Evidencia y conformidad | El proveedor envía evidencia del servicio (fotos, firma de conformidad). El Call Center valida la evidencia recibida y la registra en el sistema. Si la evidencia no es recibida en el plazo establecido, el caso escala al subproceso (paso 14). |
| 16 | Cierre operativo | El Call Center cierra formalmente la Asistencia en el sistema una vez confirmada la conformidad del servicio, o registra cancelación o reclamo según corresponda. |
| 17 | Encuesta y scoring | El sistema envía encuesta de satisfacción al cliente y actualiza el scoring del proveedor según los resultados del servicio prestado. |
| 18 | Cierre validado para liquidación | El área administrativa valida la OA y la evidencia del servicio para habilitar formalmente el proceso de liquidación al proveedor. Si no hay costo que liquidar, el caso pasa directamente al reporte/cobro al Deal (paso 20). |
| 19 | Liquidación / pago al proveedor | El Área Administrativa registra la factura del proveedor, ejecuta la validación interna, aprueba y registra el pago. Se concilia la OS contra factura y pago. |
| 20 | Reporte / cobro al Deal | Se genera el reporte de servicios prestados por Deal y se procesa el cobro o conciliación según el acuerdo comercial vigente con cada Deal. |
| 21 | Reportería y control | El sistema consolida KPIs operativos, financieros y de calidad. El equipo de gestión accede a dashboards y exportaciones para el control del servicio. |

## Flujo de decisiones clave

### Validación de cobertura

| Resultado | Acción |
|---|---|
| Cobertura válida | Crear Asistencia y continuar |
| Póliza/certificado no encontrado | Registrar Solicitud rechazada con motivo |
| Póliza/certificado vencido | Registrar no procedencia o gestionar excepción autorizada |
| Servicio no cubierto | Registrar no procedencia; evaluar pago particular pendiente de definición METAFIN |
| Límite excedido | Registrar no procedencia o excepción autorizada |
| Datos insuficientes | Mantener Solicitud pendiente/completar datos |

### Confirmación proveedor

| Evento | Acción esperada | Estado sugerido |
|---|---|---|
| Proveedor acepta | Emitir OA, informar cliente y continuar | Proveedor confirmado / OA emitida |
| Proveedor rechaza | Registrar rechazo y buscar siguiente proveedor | Reasignación requerida |
| Proveedor no responde | Activar alerta y buscar alternativa | Sin respuesta / escalado |
| Proveedor acepta y luego falla | Registrar incidencia, reasignar y evaluar penalidad/scoring | Incidencia proveedor |

### Momentos de la Orden de Atención

| Momento | Qué ocurre |
|---|---|
| Asignación confirmada | Se genera o emite OA para autorizar/sustentar atención del proveedor |
| Cierre validado | La OA/asistencia queda habilitada para liquidación y pago |

### Liquidación proveedor vs reporte/cobro al Deal

| Subproceso | Actor | Resultado | Observación |
|---|---|---|---|
| Liquidación proveedor | Área Administrativa | Validar factura/evidencia, aprobar y pagar proveedor | Proceso obligatorio para cuentas por pagar |
| Reporte/cobro al Deal | Administración / Finanzas | Reportar servicios, cobrar o conciliar según acuerdo | Pendiente de definición por Deal |

## Catálogo inicial de motivos de no procedencia

| Código sugerido | Motivo | Descripción | Requiere evidencia / comentario |
|---|---|---|---|
| NP-001 | Póliza/certificado no encontrado | No se ubica cobertura con DNI, póliza o certificado | Sí |
| NP-002 | Póliza/certificado vencido | La vigencia no cubre la fecha de solicitud/evento | Sí |
| NP-003 | Servicio no cubierto | El servicio solicitado no está incluido en el plan/Deal | Sí |
| NP-004 | Límite excedido | Se superó el máximo anual, mensual o por evento | Sí |
| NP-005 | Exclusión aplicable | Existe condición excluyente para el servicio | Sí |
| NP-006 | Datos insuficientes | No se puede validar por falta de información | Sí |
| NP-007 | Fuera de zona de cobertura | La ubicación no está dentro de cobertura operativa | Sí |
| NP-008 | Requiere autorización especial | No procede automáticamente y requiere aprobación | Sí |
| NP-009 | Cliente desiste antes de validar | El cliente no continúa el proceso | Opcional |
| NP-010 | Otro | Motivo no tipificado | Obligatorio comentario |

## Matriz inicial de evidencia por servicio

> La matriz debe validarse con Operaciones y Administración. Puede variar por Deal y tipo de servicio.

| Servicio | Evidencia mínima | Responsable de obtener | Medio probable MVP | Obligatoria para cierre | Obligatoria para pago | Observación |
|---|---|---|---|---|---|---|
| Grúa / remolque | Foto del vehículo, ubicación, placa, conformidad cliente, hora llegada/fin | Proveedor / Call Center | WhatsApp + carga manual | Sí | Sí | Registrar origen/destino si aplica |
| Auxilio mecánico | Foto o reporte de atención, diagnóstico breve, conformidad cliente | Proveedor | WhatsApp + carga manual | Sí | Sí | Subservicios: batería, llanta, gasolina, apertura, etc. |
| Chofer de reemplazo | Hora inicio/fin, origen/destino, conformidad cliente | Proveedor / Cliente | WhatsApp + carga manual | Sí | Sí | Puede requerir validación adicional por duración/ruta |
| Salud / asistencia médica | Registro de atención, datos del beneficiario, evidencia de prestación según servicio | Proveedor / Call Center | WhatsApp/correo + carga manual | Sí | Sí | Por definir según Deal ARUMA u otros |
| Hogar u otros servicios futuros | Foto antes/después, reporte del proveedor, conformidad cliente | Proveedor | WhatsApp + carga manual | Sí | Sí | Definir cuando se habilite Deal/servicio |
| Servicio cancelado sin costo | Motivo de cancelación, hora y responsable | Call Center | Sistema | Sí | No | No debe generar pago salvo regla especial |
| Servicio cancelado con costo | Motivo, evidencia de desplazamiento/asignación, aceptación de costo | Proveedor / Call Center | WhatsApp + sistema | Sí | Sí/parcial | Debe quedar regla de cuándo aplica costo |

## Alcance por fase / componente

| Componente | Clasificación | Comentario |
|---|---|---|
| Registro de Solicitud | MVP | Se registra incluso si se rechaza |
| Registro de Asistencia | MVP | Nace si procede o por excepción autorizada |
| Validación por DNI, póliza, certificado | MVP | Fuente de datos pendiente: carga/API/mixto |
| Catálogo de motivos de no procedencia | MVP | Necesario para trazabilidad |
| Coordinación telefónica | Fuera del sistema con registro | Canal operativo real |
| WhatsApp para ubicación/evidencia | MVP condicionado | Uso operativo externo; registrar enlace/evidencia/resultado en sistema |
| Geolocalización integrada/mapa/GPS | Fase 2 | No asumir MVP |
| Disponibilidad proveedor manual | MVP | Confirmación por teléfono/WhatsApp |
| Disponibilidad semi-automática | MVP condicionado | Según datos que se puedan mantener |
| Disponibilidad tiempo real | Fase 2 | Requiere portal/app/proveedor conectado |
| App proveedor | Fase 2 | No asumir MVP |
| Portal cliente | Fase 2 | No asumir MVP |
| Portal proveedor | Fase 2 | No asumir MVP salvo decisión explícita |
| Orden de Atención | MVP | Generación tras confirmación proveedor |
| Evidencia por servicio | MVP | Puede capturarse fuera y cargarse dentro |
| Encuesta / scoring | MVP | Definición requerida de canal y ponderación |
| Liquidación/pago proveedor | MVP | Componente administrativo obligatorio |
| Reporte/cobro al Deal | Pendiente de definición | Separado de liquidación proveedor |
| Dashboards avanzados | Fase 2 / según necesidad | KPIs mínimos sí en MVP |
| Pasarela de pago | Pendiente / probablemente fuera del MVP | Solo si hay pago particular u otro modelo confirmado |

## Decisiones de diseño pendientes

### Terminología y modelo

- Confirmar si **Siniestro** aplica solo a servicios específicos o si debe evitarse en el flujo operativo general.

### Cobertura y validación

- ¿La fuente de validación será carga masiva, integración/API o modelo mixto?
- ¿Qué datos mínimos trae cada Deal?
- ¿Qué reglas son comunes y cuáles dependen del Deal?
- ¿El pago particular aplica o no aplica? Pendiente definición METAFIN.

### Proveedores

- Confirmar modalidad MVP: manual o semi-automática.
- Definir catálogo de motivos de rechazo/incidencia proveedor.
- Definir penalidades o impacto en scoring.

### Evidencias

- Validar matriz de evidencia por servicio.
- Confirmar quién valida evidencia: Call Center, Supervisor o Área Administrativa.
- Confirmar si se puede cerrar operativamente con evidencia pendiente.

### Liquidación y Deal

- Definir flujo exacto de factura proveedor.
- Definir cuándo se aprueba pago.
- Separar pago proveedor de reporte/cobro al Deal.
- Definir reglas de conciliación por Deal.

## Estados preliminares a validar

Ver detalle en `05_GLOSARIO_Y_ESTADOS.md`.
