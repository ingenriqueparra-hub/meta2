# Alcance funcional por fase — METAFIN Asistencias

## Objetivo

Separar el alcance en MVP, MVP condicionado, fase 2, fuera del sistema y pendiente de definición, para evitar que el proceso objetivo se interprete como alcance comprometido completo.

## Criterios

| Clasificación | Descripción |
|---|---|
| MVP | Debe estar en primera salida para operar razonablemente |
| MVP condicionado | Entra en MVP bajo una modalidad simple o manual, no necesariamente integrada |
| Fase 2 | Deseable, pero no obligatorio para salida inicial |
| Fuera del sistema con registro | Se ejecuta fuera del sistema, pero debe registrarse resultado o evidencia |
| Pendiente de definición | Requiere decisión METAFIN antes de clasificar |

## Alcance MVP

| Componente | Descripción | Observación |
|---|---|---|
| Registro de Solicitud | Registrar toda llamada/contacto del cliente | Incluye rechazadas |
| Identificación | Buscar por DNI, póliza o certificado | Confirmar fuente de datos |
| Validación de cobertura | Vigencia, Deal, plan, límites, servicio cubierto | Reglas por Deal |
| Motivos de no procedencia | Registrar causa de rechazo | Catálogo inicial en glosario |
| Apertura de Asistencia | Crear asistencia cuando procede | Relacionada a Solicitud |
| Clasificación de Servicio | Tipo/subtipo de servicio | Por Deal/plan |
| Gestión proveedor manual | Buscar, contactar y registrar confirmación | Operación Call Center |
| Confirmación proveedor | Acepta, rechaza, no responde, acepta y falla | Compuerta crítica |
| Confirmación cliente | Informar proveedor/ETA | Puede ser por teléfono/WhatsApp |
| Orden de Atención | Generar al confirmar proveedor | Habilitar liquidación al cierre validado |
| Seguimiento básico | Estados, hitos, SLA mínimo | Intervención Supervisor |
| Evidencias | Matriz de evidencia por servicio | Puede recibirse por WhatsApp y cargarse |
| Cierre operativo | Asistencia atendida/cancelada/reclamada | Separado de liquidación |
| Encuesta | Registrar satisfacción del cliente | MVP |
| Scoring proveedor | Actualizar desempeño proveedor | MVP con reglas iniciales |
| Liquidación proveedor | Validar, aprobar y pagar proveedor | Componente administrativo |
| Reportes mínimos | Operativos, financieros básicos y exportables | Solicitudes, asistencias, SLA, proveedores, Deal |
| Seguridad | Perfiles y permisos | Call Center, Supervisor, Admin pagos, Admin sistema |

## MVP condicionado

| Componente | Modalidad MVP | Condición |
|---|---|---|
| WhatsApp operativo | Uso externo para ubicación, evidencia y coordinación | Registrar resultado/evidencia en sistema |
| Ubicación cliente | Cliente comparte ubicación por WhatsApp | Se guarda enlace, captura o referencia |
| Ubicación proveedor | Proveedor comparte ubicación por WhatsApp | Se registra manualmente |
| Disponibilidad semi-automática | Registrar disponibilidad declarada o agenda simple | Solo si operación puede mantenerla |
| Evidencia por WhatsApp | Recepción externa y carga manual | Definir responsable de carga |
| Encuesta por canal externo | Encuesta vía llamada/WhatsApp/link | Resultado debe quedar registrado |

## Fase 2

| Componente | Descripción | Dependencia |
|---|---|---|
| Geolocalización integrada | Mapas, GPS, seguimiento en tiempo real | API mapas + canal proveedor |
| Disponibilidad tiempo real | Proveedor actualiza disponibilidad en vivo | Portal/app proveedor |
| App proveedor | Confirmar, enviar ubicación/evidencia, actualizar estados | Adopción proveedor |
| Portal proveedor | Gestión de órdenes, evidencias, facturas | Definición operativa |
| Portal cliente | Seguimiento/autogestión cliente | Definición CX |
| WhatsApp Business API | Integración formal de mensajes | Costos, proveedor API, consentimiento |
| Evidencia con firma/GPS automático | Evidencia robusta integrada | App/portal |
| Dashboards avanzados | BI, valor esperado, analítica avanzada | Datos históricos y definición KPIs |
| Conciliación avanzada Deal | Automatizar reporte/cobro/conciliación | Reglas por Deal |

## Fuera del sistema con registro

| Actividad | Cómo opera | Qué debe quedar en sistema |
|---|---|---|
| Llamada telefónica inicial | Call Center atiende por teléfono | Fecha/hora, datos cliente, motivo, resultado |
| Conversación WhatsApp MVP | Coordinación externa | Resumen, evidencia, ubicación o enlace |
| Confirmación manual proveedor | Llamada o WhatsApp | Resultado, hora, usuario, proveedor |
| Evidencia recibida por WhatsApp | Fotos, ubicación, audios/documentos | Archivo o referencia cargada |
| Coordinaciones excepcionales | Supervisor/operación fuera de sistema | Comentario, autorización, responsable |

## Pendiente de definición

| Tema | Decisión requerida |
|---|---|
| Pago particular | Si se ofrecerá cuando no haya cobertura |
| Reporte/cobro al Deal | Si cada Deal requiere cobro, reporte o conciliación |
| Fuente de cobertura | Carga masiva, API o mixto |
| Reglas por Deal | Planes, límites, exclusiones, servicios |
| SLA por servicio | Hitos y tiempos objetivo |
| Scoring | Fórmula y ponderación inicial |
| Evidencia | Validación final por servicio/Deal |
| Perfilamiento | Restricción por Deal, canal o punto de venta |
