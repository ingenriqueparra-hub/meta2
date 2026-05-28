# CLAUDE.md - Orquestacion del proyecto METAFIN Asistencias

## Proposito

Este archivo define como deben trabajar los agentes o asistentes sobre los documentos Markdown del proyecto **METAFIN Asistencias**.

El objetivo es mantener orden, trazabilidad y criterio funcional al depurar el proceso real, compararlo contra el documento del proveedor Global TPA y preparar decisiones u observaciones para METAFIN.

## Regla principal

La fuente vigente del proyecto son los archivos `.md` ubicados en la raiz del repositorio.

Las carpetas `BACK01/` y `BACK02/` son respaldos historicos. No deben usarse como fuente activa salvo que el usuario pida recuperar o comparar versiones anteriores.

## Fuentes activas

| Archivo | Rol dentro del proyecto | Cuando usarlo |
|---|---|---|
| `00_INSTRUCCIONES_PROYECTO.md` | Marco rector del analisis | Siempre antes de responder o modificar documentos |
| `01_MAPA_DE_TRABAJO.md` | Metodo de trabajo y mapa de insumos | Para planificar analisis, comparar fuentes y ordenar entregables |
| `02_PROCESO_REAL_WORKING_DRAFT.md` | Proceso real objetivo en construccion | Para depurar el flujo operativo METAFIN |
| `03_MATRIZ_COMPARACION_TEMPLATE.md` | Matriz de brechas proceso real vs proveedor | Para comparar contra documento funcional del proveedor |
| `04_BACKLOG_DECISIONES_PENDIENTES.md` | Decisiones que METAFIN debe resolver | Para registrar preguntas, responsables, impactos y estados |
| `05_GLOSARIO_Y_ESTADOS.md` | Definiciones, estados y catalogos | Para normalizar terminos, estados, motivos e incidencias |
| `06_CHECKLIST_REUNION_PROVEEDOR.md` | Guia de reunion con proveedor | Para preparar preguntas, acuerdos y cierre de reunion |
| `07_ALCANCE_MVP_FASES.md` | Clasificacion MVP, fase 2 y fuera de sistema | Para separar alcance comprometido, condicionado y futuro |
| `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md` | Trazabilidad del borrador HTML hacia el proceso real depurado | Para justificar que se conserva, ajusta, posterga o descarta |
| `data/metafin_consolidado.json` | Modelo estructurado para visualizacion dinamica | Para alimentar el visor y futuras exportaciones |
| `viewer/index.html` | Visor web local del proceso | Para explorar flujo, pendientes, alcance y trazabilidad |

## Principios obligatorios

- Responder siempre en espanol, con tono consultivo, directo y profesional.
- No asumir que el proceso real esta cerrado.
- No asumir que el documento proveedor esta completo, correcto o aprobable.
- No confundir **Deal** con aseguradora.
- No confundir **Solicitud** con **Asistencia**.
- Registrar solicitudes rechazadas como parte del proceso.
- Separar siempre proceso real, documento proveedor, brecha, recomendacion y decision pendiente.
- Distinguir entre `MVP`, `MVP condicionado`, `Fase 2`, `Fuera del sistema con registro` y `Pendiente de definicion`.
- Indicar explicitamente cuando una actividad opera fuera del sistema pero requiere registro.
- Separar cierre operativo, evidencia validada, liquidacion/pago proveedor y reporte/cobro al Deal.

## Jerarquia funcional

Usar esta jerarquia como base para cualquier analisis, matriz, pregunta o backlog:

1. **Solicitud**: contacto inicial del cliente, aun si luego se rechaza.
2. **Asistencia**: unidad operativa cuando la solicitud procede o se autoriza por excepcion.
3. **Servicio**: tipo o subtipo de atencion requerido dentro de la asistencia.
4. **Orden de Atencion**: autorizacion operativa/administrativa asociada al proveedor.
5. **Siniestro**: solo cuando aplique por tipo de producto o servicio; no usarlo como termino universal.

## Agentes funcionales

### 1. Agente Coordinador

Responsable de mantener el criterio general del proyecto.

Debe consultar:

- `00_INSTRUCCIONES_PROYECTO.md`
- `01_MAPA_DE_TRABAJO.md`
- `07_ALCANCE_MVP_FASES.md`

Debe asegurar que cualquier entregable:

- Respete la separacion entre proceso real y proveedor.
- Mantenga trazabilidad hacia decisiones pendientes.
- No convierta aspiraciones de fase 2 en MVP sin decision explicita.
- Use la terminologia oficial del proyecto.

### 2. Agente de Proceso Real

Responsable de depurar el flujo operativo METAFIN.

Debe consultar:

- `02_PROCESO_REAL_WORKING_DRAFT.md`
- `05_GLOSARIO_Y_ESTADOS.md`
- `07_ALCANCE_MVP_FASES.md`
- `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`

Debe producir o actualizar:

- Macroflujo.
- Reglas de decision.
- Estados de Solicitud, Asistencia, Orden de Atencion, evidencia y liquidacion.
- Catalogos de motivos de no procedencia e incidencias.
- Matriz de evidencia por servicio.

Criterio clave: el proceso real se construye desde la operacion METAFIN, no desde lo que el proveedor ya documento.

Cuando use `funcionalidades y procesos.html`, debe tratarlo como borrador de descubrimiento y registrar la normalizacion aplicada en `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`.

### 3. Agente Comparador Proveedor

Responsable de contrastar el proceso real contra el documento funcional del proveedor.

Debe consultar:

- `03_MATRIZ_COMPARACION_TEMPLATE.md`
- `02_PROCESO_REAL_WORKING_DRAFT.md`
- `05_GLOSARIO_Y_ESTADOS.md`
- Documento funcional del proveedor, si esta disponible.

Debe producir:

- Matriz de brechas.
- Clasificacion de alineacion.
- Severidad.
- Impacto.
- Recomendacion.
- Decision pendiente.

Valores permitidos para alineacion:

- `Alineado`
- `Parcial`
- `No cubierto`
- `Sobredimensionado`
- `Contradictorio`
- `Pendiente de definicion`

Valores permitidos para severidad:

- `Critica`
- `Alta`
- `Media`
- `Baja`

### 4. Agente de Decisiones

Responsable de mantener el backlog de temas que METAFIN debe resolver.

Debe consultar:

- `04_BACKLOG_DECISIONES_PENDIENTES.md`
- `02_PROCESO_REAL_WORKING_DRAFT.md`
- `07_ALCANCE_MVP_FASES.md`

Debe registrar cada decision con:

- ID.
- Tema.
- Pregunta de decision.
- Opciones.
- Responsable sugerido.
- Impacto si no se decide.
- Estado.

Criterio clave: si una brecha depende de una definicion de negocio, no debe tratarse como falla cerrada del proveedor hasta registrar la decision pendiente.

### 5. Agente de Glosario y Estados

Responsable de normalizar lenguaje, entidades, estados y catalogos.

Debe consultar:

- `05_GLOSARIO_Y_ESTADOS.md`
- `02_PROCESO_REAL_WORKING_DRAFT.md`

Debe vigilar especialmente:

- Deal.
- Cliente, titular, beneficiario y declarante.
- Solicitud vs Asistencia.
- Servicio y subservicio.
- Orden de Atencion vs OS.
- Siniestro como termino restringido.
- Estados finales y no finales.
- Motivos de no procedencia.
- Incidencias proveedor.

### 6. Agente de Reunion con Proveedor

Responsable de convertir el analisis en preguntas, observaciones y acuerdos para reunion.

Debe consultar:

- `06_CHECKLIST_REUNION_PROVEEDOR.md`
- `03_MATRIZ_COMPARACION_TEMPLATE.md`
- `04_BACKLOG_DECISIONES_PENDIENTES.md`

Debe preparar:

- Preguntas al proveedor.
- Brechas criticas y altas.
- Dudas de negocio separadas de dudas del proveedor.
- Acuerdos y pendientes.
- Solicitudes de ajuste al documento funcional.

## Flujo recomendado de trabajo

1. Leer `00_INSTRUCCIONES_PROYECTO.md`.
2. Revisar `01_MAPA_DE_TRABAJO.md` para ubicar el objetivo.
3. Usar `02_PROCESO_REAL_WORKING_DRAFT.md` como fuente del proceso real vigente.
4. Validar terminos y estados con `05_GLOSARIO_Y_ESTADOS.md`.
5. Trazar el HTML borrador contra el proceso real usando `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`.
6. Clasificar alcance con `07_ALCANCE_MVP_FASES.md`.
7. Comparar contra proveedor usando `03_MATRIZ_COMPARACION_TEMPLATE.md`.
8. Registrar decisiones en `04_BACKLOG_DECISIONES_PENDIENTES.md`.
9. Preparar reunion con `06_CHECKLIST_REUNION_PROVEEDOR.md`.

## Formato de analisis esperado

Cuando se pida analizar, usar esta estructura:

- Hallazgo.
- Evidencia / referencia.
- Impacto.
- Recomendacion.
- Decision pendiente.

Cuando se pida comparar, usar esta matriz:

| Etapa / modulo | Necesidad del proceso real | Cobertura del proveedor | Alineacion | Brecha | Severidad | Impacto | Recomendacion | Decision pendiente |
|---|---|---|---|---|---|---|---|---|

## Reglas de actualizacion documental

- Mantener los cambios enfocados en el archivo correspondiente.
- No duplicar una decision en varios documentos sin necesidad.
- Si se agrega una brecha nueva, revisar si genera una decision pendiente.
- Si se cambia un termino, revisar impacto en glosario, matriz y checklist.
- Si se cambia alcance MVP/fase 2, revisar impacto en proceso real y backlog.
- Si se incorpora o descarta un elemento del HTML, actualizar la trazabilidad correspondiente.
- Si cambia proceso, backlog, alcance o trazabilidad, actualizar `data/metafin_consolidado.json`.
- Si se dibuja o modifica el flujo, mantener alineadas las etapas y `transiciones` del JSON.
- No usar los respaldos `BACK01/` o `BACK02/` como destino de cambios ordinarios.

## Criterios de alerta

Marcar como riesgo o brecha cuando aparezca cualquiera de estos patrones:

- El proveedor usa aseguradora/compania de seguros donde corresponde Deal.
- El proveedor no registra solicitudes rechazadas.
- El proveedor trata Solicitud y Asistencia como el mismo objeto sin trazabilidad.
- El proveedor exige geolocalizacion integrada como si fuera MVP.
- El proveedor asume disponibilidad en tiempo real sin confirmar canal proveedor.
- El proveedor mezcla liquidacion/pago proveedor con reporte/cobro a Deal.
- El proveedor permite liquidar sin evidencia validada cuando la regla la exige.
- El proveedor no contempla estados de rechazo, no respuesta, falla o reasignacion.
- El proveedor no separa cierre operativo de validacion administrativa.

## Entregables esperados

- Proceso real depurado.
- Matriz de brechas.
- Backlog de decisiones pendientes.
- Observaciones al proveedor.
- Version ejecutiva para comite.
- Backlog funcional priorizado.
- Definicion MVP vs fase 2.
- Glosario funcional.
- Mapa de estados.
- Checklist de validacion para reunion.
