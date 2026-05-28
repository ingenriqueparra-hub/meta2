# Checklist para reunión con proveedor

## Objetivo de la reunión

Validar si el documento funcional del proveedor soporta el proceso real de METAFIN y dejar observaciones concretas para ajuste de alcance, diseño o propuesta.

## Aclaraciones METAFIN que deben comunicarse

- METAFIN trabaja con **Deal**, no con aseguradoras.
- Deals actuales o próximos: ARUMA SALUD TOTAL, ASISTENCIA BANCO ALFIN, VIDA TRANKI GNB y otros.
- El cliente inicia por **teléfono**.
- En MVP, WhatsApp puede usarse como canal operativo para compartir ubicación, coordinar y recibir evidencias.
- No todo debe estar integrado dentro del sistema en MVP.
- El sistema es principalmente para **Call Center** y **administración de pagos/liquidación proveedor**.
- Se deben registrar también las solicitudes rechazadas.
- Se debe distinguir **Solicitud** de **Asistencia**.
- Encuesta/scoring entra en MVP.

## Antes de la reunión

- [ ] Tener versión vigente del proceso real en `.md`.
- [ ] Tener matriz de brechas preliminar.
- [ ] Identificar brechas críticas.
- [ ] Separar dudas de negocio vs dudas del proveedor.
- [ ] Definir qué puntos son MVP, MVP condicionado, fase 2 o fuera del sistema.
- [ ] Preparar ejemplos de casos reales por Deal.
- [ ] Preparar catálogo de motivos de no procedencia.
- [ ] Preparar matriz de evidencia por servicio.

## Preguntas clave al proveedor

### Proceso y entidades

- [ ] ¿El sistema distingue Solicitud de Asistencia?
- [ ] ¿Puede registrar una Solicitud aunque luego sea rechazada?
- [ ] ¿Puede relacionar Solicitud → Asistencia → Servicio → Orden de Atención → Liquidación?
- [ ] ¿Dónde usa el término siniestro y si puede restringirse a casos específicos?
- [ ] ¿Cómo adapta el modelo de “aseguradora/compañía” al concepto de Deal?
- [ ] ¿Se puede gestionar más de una asistencia por cliente/póliza/certificado?
- [ ] ¿Se puede gestionar más de un proveedor por asistencia?
- [ ] ¿Se puede reabrir, reclamar u observar una asistencia cerrada?

### Deals, pólizas y cobertura

- [ ] ¿Cómo se configura cada Deal?
- [ ] ¿Se puede buscar por DNI, póliza o certificado?
- [ ] ¿Cómo se valida vigencia?
- [ ] ¿Cómo se validan límites de uso?
- [ ] ¿Cómo se manejan servicios no cubiertos?
- [ ] ¿Cómo se registran solicitudes rechazadas?
- [ ] ¿Se puede configurar catálogo de motivos de no procedencia?
- [ ] ¿El sistema soporta pago particular si METAFIN lo define luego?
- [ ] ¿La validación será por carga masiva, API o mixto?

### Canales y WhatsApp

- [ ] ¿Qué parte del flujo queda dentro del sistema y qué parte por teléfono/WhatsApp?
- [ ] ¿Puede registrarse que la ubicación fue compartida por WhatsApp?
- [ ] ¿Puede cargarse evidencia recibida por WhatsApp?
- [ ] ¿Hay integración WhatsApp Business o solo registro manual?
- [ ] ¿Las comunicaciones quedan auditadas?
- [ ] ¿Cómo se registra la confirmación al cliente por WhatsApp o llamada?

### Proveedores

- [ ] ¿El sistema maneja disponibilidad manual, semi-automática o en tiempo real?
- [ ] ¿Se puede marcar disponibilidad en tiempo real como fase 2?
- [ ] ¿El sistema sugiere proveedor por cercanía, costo, SLA o disponibilidad?
- [ ] ¿Existe confirmación formal del proveedor?
- [ ] ¿Qué pasa si el proveedor rechaza?
- [ ] ¿Qué pasa si el proveedor no responde?
- [ ] ¿Qué pasa si el proveedor acepta y luego falla?
- [ ] ¿Existe scoring/ranking automático en MVP?
- [ ] ¿Cómo afecta una incidencia al scoring?

### Orden de Atención

- [ ] ¿Cuándo se genera la Orden de Atención?
- [ ] ¿Puede generarse al confirmar proveedor?
- [ ] ¿Puede quedar pendiente de evidencia antes de liquidarse?
- [ ] ¿Se puede observar, ajustar o anular una OA?
- [ ] ¿La OA puede enviarse por WhatsApp/correo al proveedor?
- [ ] ¿La OA es equivalente a OS o se manejan ambas?

### Seguimiento y SLA

- [ ] ¿Qué hitos de tiempo registra el sistema?
- [ ] ¿Se registra hora de solicitud, validación, asignación, confirmación, salida, llegada, inicio, fin y cierre?
- [ ] ¿Hay alarmas automáticas?
- [ ] ¿Hay escalamiento a Supervisor / Coordinador Operativo?
- [ ] ¿Hay dashboard operativo de asistencias activas?
- [ ] ¿Cómo se registra incumplimiento de ETA?

### Evidencias

- [ ] ¿Qué evidencias se pueden cargar?
- [ ] ¿Se puede exigir evidencia por tipo de servicio?
- [ ] ¿Puede configurarse matriz de evidencia por Deal/servicio?
- [ ] ¿Quién valida la evidencia?
- [ ] ¿Se puede cerrar sin evidencia?
- [ ] ¿Se puede liquidar sin evidencia validada?
- [ ] ¿Se soporta firma digital o conformidad del cliente?

### Encuesta y scoring

- [ ] ¿La encuesta puede enviarse/registrarse en MVP?
- [ ] ¿Por qué canal se envía o registra la encuesta?
- [ ] ¿El scoring del proveedor se actualiza automáticamente?
- [ ] ¿Qué variables usa el scoring: SLA, encuesta, evidencia, reclamos, cancelaciones?
- [ ] ¿Se puede ver ranking de proveedores en MVP?

### Liquidación y administración

- [ ] ¿Cómo se separa liquidación al proveedor de reporte/cobro al Deal?
- [ ] ¿Cómo se registra la factura del proveedor?
- [ ] ¿Cómo se aprueba y cierra la liquidación?
- [ ] ¿Se pueden hacer ajustes?
- [ ] ¿Cómo se controla pago?
- [ ] ¿Existe conciliación OA vs factura vs pago?
- [ ] ¿Se puede liquidar parcialmente?

### Reporte / cobro al Deal

- [ ] ¿El sistema contempla reporte por Deal?
- [ ] ¿Puede generar reporte de servicios por Deal, producto, plan, servicio y periodo?
- [ ] ¿Controla montos recuperados y pendientes si hay cobro?
- [ ] ¿Diferencia pago proveedor de cobro/reporte Deal?
- [ ] ¿Qué campos exporta el reporte?

### Reportes

- [ ] ¿Qué consultas vienen estándar?
- [ ] ¿Qué campos exporta Excel?
- [ ] ¿Se puede reportar por Deal, proveedor, zona, servicio y estado?
- [ ] ¿Incluye KPIs de SLA?
- [ ] ¿Incluye ranking de proveedores?
- [ ] ¿Incluye costos y valor esperado?
- [ ] ¿Incluye solicitudes rechazadas y motivos de no procedencia?

### Seguridad

- [ ] ¿Qué perfiles existen?
- [ ] ¿Puede configurarse Call Center, Supervisor, Administración Pagos, Administrador y Consulta?
- [ ] ¿Hay permisos por módulo y acción?
- [ ] ¿Hay auditoría de cambios?
- [ ] ¿Hay 2FA/OTP?
- [ ] ¿Se puede restringir por Deal, canal, producto o punto de venta?

## Cierre de reunión

- [ ] Confirmar acuerdos.
- [ ] Registrar puntos pendientes.
- [ ] Asignar responsables.
- [ ] Solicitar versión actualizada del documento funcional.
- [ ] Solicitar que el proveedor reemplace referencias a aseguradoras por Deal cuando corresponda.
- [ ] Solicitar matriz de cobertura del proveedor contra proceso real.
- [ ] Definir fecha de revisión.
