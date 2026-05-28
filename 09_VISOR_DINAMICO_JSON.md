# Visor dinámico y consolidado JSON

## Objetivo

Permitir consultar el proceso real de METAFIN Asistencias como un tablero dinámico, además de los documentos Markdown.

El visor no reemplaza a los `.md`; se alimenta del consolidado estructurado `data/metafin_consolidado.json`, que debe mantenerse alineado con el proceso, backlog, alcance y trazabilidad vigentes.

## Archivos

| Archivo | Uso |
|---|---|
| `data/metafin_consolidado.json` | Modelo estructurado del proceso, pendientes, alcance y trazabilidad |
| `viewer/index.html` | Página principal del visor |
| `viewer/app.js` | Lógica de filtros y renderizado |
| `viewer/styles.css` | Estilos del visor |
| `data/metafin_layout.json` | Layout acomodado manualmente de posiciones del diagrama |

## Qué permite consultar

- Flujo operativo MVP por etapas.
- Diagrama básico con swimlanes por actor.
- Transiciones y ramificaciones entre etapas.
- Actores de cada etapa.
- Fase de cada etapa: MVP, MVP condicionado, fase 2 o pendiente.
- Pendientes asociados a cada etapa.
- Backlog de decisiones pendientes.
- Alcance por fase.
- Trazabilidad del HTML hacia el proceso real.
- JSON completo para inspección o exportación.
- Edición manual de posiciones del diagrama mediante arrastre y exportación de layout.
- Edición manual de conectores: punto de salida, punto de llegada y etiqueta.
- Consulta de detalle por etapa al hacer clic en una tarjeta del diagrama.

## Cómo abrirlo

Opción 1: abrir `viewer/index.html` en el navegador.

Si el navegador bloquea la carga automática de `data/metafin_consolidado.json`, usar el botón **Cargar JSON** dentro del visor y seleccionar manualmente:

`data/metafin_consolidado.json`

Opción 2: servir la carpeta con un servidor local y abrir:

```powershell
node viewer/server.js
```

Luego abrir:

`http://127.0.0.1:8765/viewer/index.html`

## Regla de mantenimiento

Actualizar `data/metafin_consolidado.json` cuando cambie cualquiera de estos documentos:

- `02_PROCESO_REAL_WORKING_DRAFT.md`
- `04_BACKLOG_DECISIONES_PENDIENTES.md`
- `07_ALCANCE_MVP_FASES.md`
- `08_TRAZABILIDAD_HTML_A_PROCESO_REAL.md`

El JSON debe tratarse como una vista estructurada derivada, no como reemplazo de los `.md`.
Cuando se actualice el layout visual, también debe actualizarse la referencia `metadata.visualizacion` en `data/metafin_consolidado.json`.

## Layout del diagrama

Estado actual del layout:

- Archivo vigente: `data/metafin_layout.json`.
- Versión de layout: `0.2`.
- Estado: layout acomodado manualmente desde el visor.
- Incluye posiciones de tarjetas movidas, conectores, puntos de control, etiquetas y terminales `Fin`.

En la pestaña **Diagrama** puedes arrastrar las tarjetas para mejorar la lectura.

Al hacer clic en una tarjeta del diagrama se muestra un panel de detalle con:

- Resultado / descripción operativa.
- Actores.
- Sistema o canal.
- Fase y estado de definición.
- Pendientes.
- Entradas y salidas del flujo.
- Referencias documentales.

La tarjeta muestra la descripción corta o resultado operativo de la etapa y el valor de `Sistema / canal`; la fase y los pendientes se conservan en el panel de detalle.

El botón **Visualizar / Editar** controla si se muestran los puntos de edición:

- **Visualizar**: oculta los círculos de control y deja el diagrama limpio.
- **Editar**: muestra los círculos y habilita arrastre de tarjetas, conectores y etiquetas.

Los conectores también se pueden acomodar:

- Círculo blanco/azul: punto de salida.
- Círculo blanco/verde: punto de llegada.
- Círculo violeta: punto central para cambiar curva o dirección.
- Círculo azul pequeño: posición de la etiqueta.

Los finales se dibujan como terminales ovalados, no como etapas del proceso.
Los puntos de salida y llegada se ajustan al borde de la tarjeta correspondiente; el punto central y la etiqueta quedan libres para acomodar la lectura.

Para conservar posiciones:

1. Ajustar tarjetas, conectores y etiquetas.
2. Usar **Exportar layout**.
3. Guardar el archivo descargado como `data/metafin_layout.json`.
4. Recargar el visor.

También puedes usar **Importar layout** para probar un layout sin reemplazar el archivo.
