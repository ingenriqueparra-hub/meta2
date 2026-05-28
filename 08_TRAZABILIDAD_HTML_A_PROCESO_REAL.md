# Trazabilidad HTML a proceso real depurado

## Objetivo

Registrar cómo se interpreta el borrador `funcionalidades y procesos.html` para construir el proceso real operativo de METAFIN Asistencias.

El HTML no es una definición aprobada. Es un insumo de descubrimiento que contiene ideas de proceso, módulos y arquitectura, pero también supuestos que deben corregirse antes de compararlos contra el documento funcional del proveedor.

## Criterios de normalización

| Criterio | Regla |
|---|---|
| Deal vs aseguradora | Todo concepto de aseguradora, compañía de seguros o cobro a aseguradora debe evaluarse como Deal, salvo excepción confirmada |
| Solicitud vs caso/ticket | El contacto inicial debe normalizarse como Solicitud; solo se crea Asistencia cuando procede |
| Asistencia vs siniestro | Siniestro no debe usarse como término universal |
| OS vs OA | Orden de Servicio del HTML/proveedor debe homologarse a Orden de Atención |
| Automatización | No asumir automatización completa si el MVP puede operar manual o semi-automático |
| Canales externos | Teléfono y WhatsApp pueden operar fuera del sistema, con registro de resultado/evidencia |
| Geolocalización | GPS/mapa/seguimiento en tiempo real se considera fase 2 salvo decisión expresa |
| Portales/apps | App proveedor, portal proveedor y portal cliente se consideran fase 2 salvo decisión expresa |

## Trazabilidad de módulos HTML

| Módulo HTML | Lectura para METAFIN | Tratamiento | Impacto en `.md` |
|---|---|---|---|
| Pólizas | Fuente de cobertura por póliza/certificado, no necesariamente modelo asegurador tradicional | Ajustar | Validación por DNI, póliza o certificado en proceso real |
| Compañías de Seguros | En METAFIN debe reinterpretarse como Deal | Ajustar | Glosario y matriz deben usar Deal |
| Clientes / Asegurados | Base útil para cliente, titular, beneficiario y declarante | Ajustar | Glosario separa roles |
| Gestión de Casos | Borrador mezcla ticket/caso con asistencia | Ajustar | Separar Solicitud y Asistencia |
| Geolocalización | Propone mapa/GPS y proveedor cercano | Fase 2 / MVP condicionado | WhatsApp ubicación en MVP; GPS fase 2 |
| Gestión de Proveedores | Registro, tarifas, SLA y scoring son útiles | Conservar con ajustes | Proveedor manual/semi-automático en MVP |
| Comunicación | Incluye WhatsApp API y notificaciones | Ajustar | WhatsApp externo en MVP; API fase 2 |
| Documentos y Evidencias | Necesidad válida para cierre y pago | Conservar | Matriz de evidencia por servicio |
| Seguimiento en Tiempo Real | Útil como aspiración, no necesariamente MVP | Ajustar | Seguimiento básico MVP; tiempo real fase 2 |
| Tarifas y Catálogo | Necesario para servicios, tarifarios y límites | Conservar con ajustes | Catálogo por Deal/plan/servicio |
| Alertas y Escalamiento | Necesario para SLA e incidencias | Conservar | Supervisor y reglas pendientes |
| Liquidación al Proveedor | Necesario como flujo administrativo | Conservar | Separar cierre operativo y liquidación |
| Cobro a Aseguradora | En METAFIN debe reinterpretarse como reporte/cobro a Deal | Ajustar / pendiente | Definir por Deal |
| Reportería y Analítica | Necesario para control operativo y ejecutivo | Conservar | KPIs MVP y dashboards fase 2 |
| Usuarios y Seguridad | Necesario | Conservar | Perfiles Call Center, Supervisor, Admin pagos, Admin sistema |

## Trazabilidad de pasos HTML

> El proceso real depurado tiene 21 pasos vs 16 del borrador HTML. La expansión refleja una granularidad mayor y la separación de etapas que el HTML agrupaba en un solo paso.

| Paso HTML | Nombre HTML | Paso(s) proceso real | Lectura para proceso real | Tratamiento | Decisión / ajuste requerido |
|---|---|---|---|---|---|
| 1 | Contacto y Solicitud | 1 | Cliente llama al Call Center | Conservar | Registrar siempre como Solicitud |
| 2 | Validación de Cobertura | 2, 3 | Valida póliza, vigencia, cobertura y límites | Ajustar | Se separó en: identificación del cliente (2) y validación de cobertura (3). Incorporar Deal, plan, certificado y motivos de no procedencia |
| 3 | Registro del Caso | 4, 5, 6 | Creación de ticket/caso | Ajustar | Se separó en: registro de Solicitud (4), apertura de Asistencia (5) y clasificación del servicio (6). Solicitud y Asistencia son objetos distintos |
| 4 | Geolocalización y Búsqueda | 7, 8 | Sugiere proveedor por cercanía y disponibilidad | MVP condicionado / fase 2 | Se separó en: ubicación y condiciones del evento (7, MVP condicionado) y búsqueda de proveedor (8). GPS/proximidad automática es fase 2 |
| 5 | Selección del Proveedor | 9 | Call Center elige proveedor | Conservar con ajustes | Definir criterios: servicio, zona, tarifa, SLA, disponibilidad |
| 6 | Coordinación del Servicio | 10 | Contacto proveedor, disponibilidad y ETA | Conservar | Registrar acepta, rechaza, no responde o falla |
| 7 | Asignación Formal | 12 | Asignación en sistema y seguimiento | Ajustar | Genera Orden de Atención (OA) tras confirmación del proveedor. La confirmación al cliente (11) precede a la OA |
| 8 | Confirmación al Cliente | 11 | Informar proveedor y ETA | Conservar | Registrar canal, hora y datos informados. En el proceso real ocurre antes de la emisión de la OA formal |
| 9 | Ejecución del Servicio | 13 | Proveedor atiende en campo | Conservar | Registrar hitos, cancelación, falla o atención |
| 10 | Seguimiento en Tiempo Real | 14 | Monitoreo de SLA e incidencias | Ajustar | Seguimiento básico MVP; tiempo real fase 2. También absorbe la Gestión de Incidencias (HTML 16) |
| 11a | Registro de Evidencia | 15 | Proveedor envía fotos, firma, reporte | Ajustar | Puede recibirse por WhatsApp y cargarse manualmente |
| 11b | Validación de Evidencia | 15 | Call Center valida/carga evidencia | Ajustar | Unificado con registro de evidencia en paso 15. Definir si valida Call Center, Supervisor o Administración |
| 12 | Cierre Operativo | 16 | Cierre del caso con evidencia/conformidad | Ajustar | Separar cierre operativo de validación para liquidación |
| 13 | Confirmación de Cierre | 16 | Call Center informa cierre al cliente | Absorbido | Sin paso propio en el proceso real; se registra como parte del cierre operativo (16). Puede integrarse con encuesta |
| 14 | Encuesta y Evaluación | 17 | Encuesta y scoring proveedor | Conservar con definición pendiente | Definir canal, momento y ponderación |
| 15 | Liquidación al Proveedor | 18, 19, 20 | OS, factura, aprobación, pago y conciliación | Ajustar | Se separó en: cierre validado para liquidación (18), liquidación/pago al proveedor (19) y reporte/cobro al Deal (20). Usar OA; separar pago proveedor de reporte/cobro Deal |
| 16 | Gestión de Incidencias | 14 | Reclamos, calidad y retroalimentación | Absorbido | Sin paso propio; gestionado dentro del seguimiento, SLA e incidencias (14) |
| — | Sin equivalente HTML | 21 | Reportería y control como flujo de cierre | Agregado | Paso 21 proviene del módulo de Reportería del HTML, incorporado como etapa explícita del flujo operativo |

## Principales diferencias frente al borrador HTML

| Tema | HTML borrador | Proceso real depurado |
|---|---|---|
| Contraparte comercial | Aseguradora / compañía de seguros | Deal |
| Objeto operativo | Caso / ticket | Solicitud y Asistencia separadas |
| Orden | Orden de Servicio / OS | Orden de Atención como término oficial; OS se trata como término heredado/proveedor |
| Canal inicial | No lo explicita suficientemente | Teléfono al Call Center |
| WhatsApp | Integración WhatsApp Business | Canal externo MVP con registro; API fase 2 |
| Geolocalización | Mapa/GPS/seguimiento en tiempo real | Ubicación por WhatsApp en MVP; GPS fase 2 |
| Disponibilidad proveedor | Tiempo real | Manual o semi-automática en MVP |
| Liquidación | Mezcla proveedor y aseguradora | Separar pago proveedor de reporte/cobro Deal |
| Cierre | Cierre del caso | Cierre operativo separado de validación administrativa |

## Uso recomendado

Usar este archivo antes de:

- Actualizar `02_PROCESO_REAL_WORKING_DRAFT.md`.
- Completar `03_MATRIZ_COMPARACION_TEMPLATE.md`.
- Preparar observaciones al proveedor.
- Clasificar funcionalidades como MVP, MVP condicionado, fase 2 o fuera del sistema.
