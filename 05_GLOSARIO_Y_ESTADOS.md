# Glosario funcional y estados

## Glosario

| Término | Definición de trabajo | Pendiente |
|---|---|---|
| Deal | Contraparte comercial/programa sobre el cual se presta asistencia, por ejemplo ARUMA SALUD TOTAL, ASISTENCIA BANCO ALFIN, VIDA TRANKI GNB | Definir datos y reglas por Deal |
| Cliente | Persona que se comunica solicitando asistencia | Diferenciar de titular, beneficiario y declarante |
| Titular | Persona vinculada al contrato/certificado/póliza del Deal | Validar uso por Deal |
| Beneficiario | Persona que recibe el servicio | Confirmar si siempre coincide con cliente/titular |
| Declarante | Persona que reporta el evento | Confirmar obligatoriedad |
| Póliza | Identificador de cobertura usado en algunos Deals | Confirmar fuente de datos |
| Certificado | Identificador individual asociado a cobertura | Confirmar uso real por Deal |
| Solicitud | Contacto inicial del cliente. Se registra siempre, incluso si se rechaza | Confirmar datos mínimos |
| Asistencia | Unidad operativa principal cuando una Solicitud procede o se autoriza por excepción | Confirmado como término operativo |
| Servicio | Tipo de atención: grúa, auxilio mecánico, chofer, salud, hogar u otro | Confirmar catálogo por Deal |
| Subservicio | Variante del servicio: batería, llanta, remolque, etc. | Confirmar catálogo |
| Orden de Atención | Documento/autorización asociada al proveedor y soporte posterior de liquidación | Término oficial METAFIN; OS queda como término heredado/proveedor a homologar |
| Siniestro | Evento cubierto que puede activar asistencia en algunos contextos | No usar como término universal sin validación |
| Proveedor | Empresa/persona que ejecuta el servicio | Confirmar datos mínimos y canal de contacto |
| Tarifario | Tabla de precios por proveedor, servicio, zona u otra regla | Confirmar estructura |
| SLA | Tiempo objetivo medido entre hitos definidos | Definir hitos y umbrales |
| ETA | Tiempo estimado de llegada informado al cliente | Confirmar registro y fuente |
| Evidencia | Sustento del servicio realizado o cancelado | Definir por servicio |
| Liquidación proveedor | Proceso administrativo para validar y pagar al proveedor | Separar de reporte/cobro al Deal |
| Pago proveedor | Ejecución de pago al proveedor tras aprobación | Confirmar flujo contable |
| Reporte/cobro a Deal | Reporte, cobro o conciliación económica con el Deal, si aplica | Definir por Deal |
| Incidencia | Evento anómalo durante atención | Definir catálogo |
| Reclamo | Disconformidad del cliente/beneficiario | Definir flujo |
| WhatsApp operativo | Canal externo usado en MVP para ubicación, coordinación y evidencias | Definir trazabilidad mínima |
| Geolocalización integrada | Funcionalidad de mapas/GPS dentro del sistema | Fase 2 |

## Estados sugeridos para Solicitud

| Estado | Descripción | Estado final | Observación |
|---|---|---|---|
| Recibida | Cliente contacta al Call Center | No | Se crea por llamada telefónica |
| En identificación | Se buscan datos por DNI, póliza o certificado | No | Puede requerir completar datos |
| En validación | Se valida cobertura/Deal/plan/vigencia | No | Puede terminar rechazada o asistencia |
| Rechazada | No procede por motivo registrado | Sí | Debe tener motivo de no procedencia |
| Pendiente de datos | Falta información para validar | No | Puede cerrarse por desistimiento |
| Convertida en Asistencia | Solicitud procede y crea Asistencia | Sí para Solicitud | Mantener relación con Asistencia |
| Desistida | Cliente no continúa antes de crear asistencia | Sí | Registrar motivo/comentario |

## Estados sugeridos para Asistencia

| Estado | Descripción | Estado final | Observación |
|---|---|---|---|
| Aperturada | Asistencia creada y activa | No | Nace desde Solicitud procedente |
| Servicio clasificado | Servicio/subservicio definido | No | Puede requerir ubicación |
| Ubicación pendiente | Falta ubicación o referencia suficiente | No | WhatsApp MVP condicionado |
| En búsqueda de proveedor | Se buscan proveedores candidatos | No | Manual/semi-automático en MVP |
| Proveedor preasignado | Proveedor seleccionado para confirmar | No | Falta aceptación |
| Proveedor confirmado | Proveedor acepta atención | No | Dispara OA e información al cliente |
| Proveedor rechazó | Proveedor rechaza | No | Requiere reasignación |
| Sin respuesta proveedor | Proveedor no responde en tiempo definido | No | Dispara alerta/escalamiento |
| Reasignación requerida | Debe buscarse nuevo proveedor | No | Por rechazo, falla o SLA |
| En camino | Proveedor se dirige al punto | No | Requiere ETA/hora salida si aplica |
| En atención | Servicio en ejecución | No | Puede generar evidencia |
| Asistida | Servicio atendido | Sí operativo | Requiere evidencia/conformidad para cierre validado |
| Cancelada sin costo | Cancelación sin costo proveedor | Sí operativo | No debería liquidar |
| Cancelada con costo | Cancelación genera costo proveedor | Sí operativo | Puede liquidar parcial según regla |
| Fallida por proveedor | Proveedor no cumple o falla luego de aceptar | No / Sí según regla | Normalmente requiere reasignación o incidencia |
| Reclamada | Servicio con reclamo o controversia | No | Interviene Supervisor |
| Cerrada operativamente | Cierre de atención realizado | Sí operativo | Separado de liquidación |
| Validada para liquidación | Evidencia/costo aprobados para pago | Sí administrativo previo | Habilita liquidación proveedor |
| Liquidada | Incluida en liquidación proveedor | Sí administrativo | Posterior al cierre validado |

## Estados sugeridos para Orden de Atención

| Estado | Descripción |
|---|---|
| Generada | Orden creada tras confirmación del proveedor |
| Enviada | Orden enviada al proveedor por sistema, correo, WhatsApp u otro canal |
| Aceptada / Confirmada | Proveedor confirma atención asociada a la orden |
| En ejecución | Servicio en curso asociado a la orden |
| Pendiente de evidencia | Falta sustento para cierre/pago |
| Observada | Orden requiere corrección, evidencia o sustento adicional |
| Ajustada | Orden tuvo reajuste económico o de datos |
| Validada para liquidación | Orden lista para proceso administrativo |
| Liquidada | Orden incluida en liquidación |
| Anulada | Orden cancelada administrativamente |

## Estados sugeridos para evidencia

| Estado | Descripción |
|---|---|
| No requerida | No aplica según tipo de servicio o evento |
| Pendiente | Debe cargarse o registrarse evidencia |
| Recibida | Evidencia recibida por WhatsApp, correo, sistema u otro canal |
| Cargada | Evidencia registrada en sistema |
| Observada | Evidencia insuficiente o inconsistente |
| Validada | Evidencia aprobada para cierre/liquidación |
| Rechazada | Evidencia no aceptada |

## Estados sugeridos para liquidación proveedor

| Estado | Descripción |
|---|---|
| Generada | Liquidación creada para una o varias OA/asistencias |
| En revisión | Pendiente de validación administrativa |
| Observada | Con diferencias, documentos faltantes o montos no conformes |
| Ajustada | Corregida por diferencia de tarifa, evidencia o alcance |
| Aprobada | Lista para pago |
| Programada para pago | Pago calendarizado |
| Pagada | Pago ejecutado al proveedor |
| Cerrada | Liquidación finalizada |
| Anulada | Liquidación cancelada administrativamente |

## Estados sugeridos para reporte/cobro al Deal

| Estado | Descripción |
|---|---|
| No aplica | Deal no requiere reporte/cobro específico |
| Pendiente de reporte | Servicio pendiente de ser reportado al Deal |
| Reportado | Servicio incluido en reporte al Deal |
| Pendiente de cobro | Monto pendiente de recuperación/cobro si aplica |
| Cobrado | Monto cobrado al Deal |
| Conciliado | Diferencias revisadas y cerradas |
| Observado por Deal | Deal observa servicio, monto o evidencia |

## Catálogo inicial de motivos de no procedencia

| Código | Motivo | Aplica a | Comentario obligatorio |
|---|---|---|---|
| NP-001 | Póliza/certificado no encontrado | Solicitud | Sí |
| NP-002 | Póliza/certificado vencido | Solicitud | Sí |
| NP-003 | Servicio no cubierto | Solicitud | Sí |
| NP-004 | Límite excedido | Solicitud | Sí |
| NP-005 | Exclusión aplicable | Solicitud | Sí |
| NP-006 | Datos insuficientes | Solicitud | Sí |
| NP-007 | Fuera de zona de cobertura | Solicitud / Asistencia | Sí |
| NP-008 | Requiere autorización especial no aprobada | Solicitud | Sí |
| NP-009 | Cliente desiste antes de validar | Solicitud | Opcional |
| NP-010 | Otro | Solicitud | Sí |

## Catálogo inicial de incidencias proveedor

| Código | Incidencia | Acción sugerida |
|---|---|---|
| IP-001 | Proveedor rechaza atención | Buscar siguiente proveedor |
| IP-002 | Proveedor no responde | Alerta y reasignación |
| IP-003 | Proveedor acepta y luego cancela | Reasignar, escalar, afectar scoring |
| IP-004 | Proveedor llega tarde | Registrar SLA incumplido, evaluar scoring |
| IP-005 | Proveedor no llega | Reasignar y escalar |
| IP-006 | Evidencia incompleta | Observar OA/evidencia |
| IP-007 | Cliente reclama servicio | Abrir reclamo/intervención Supervisor |
