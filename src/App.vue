<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const figures = ref([]),
  selectedId = ref(null),
  fileInputRef = ref(null),
  isDragging = ref(false),
  isResizing = ref(false);
let draggedFigure = null,
  mouseStartX = 0,
  mouseStartY = 0,
  figStartX = 0,
  figStartY = 0,
  figStartX2 = 0,
  figStartY2 = 0,
  startWidth = 0,
  startHeight = 0;

const selectFigure = (id) => (selectedId.value = id);
const deselectAll = (e) =>
  e.target.id === "main-canvas" && (selectedId.value = null);

const addFigure = (type) => {
  if (type === "image") return fileInputRef.value?.click();
  const id = Date.now(),
    start = 100 + figures.value.length * 20,
    isLine = type === "line";
  figures.value.push({
    id,
    type,
    x: start,
    y: start,
    width: 150,
    height: 150,
    text: type === "text" ? "Дважды кликните для ввода" : "",
    x1: isLine ? start : 0,
    y1: isLine ? start : 0,
    x2: isLine ? start + 150 : 0,
    y2: isLine ? start : 0,
  });
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const start = 100 + figures.value.length * 20,
    newImg = {
      id: Date.now(),
      type: "image",
      x: start,
      y: start,
      width: 200,
      height: 200,
      src: URL.createObjectURL(file),
    };
  figures.value.push(newImg);
  selectedId.value = newImg.id;
  e.target.value = "";
};

const onTextBlur = (e, fig) => {
  const text = e.target.innerText.replace(/\u200B/g, "").trim();
  fig.text = text || "Пустой текст";
  if (!text) e.target.innerText = "Пустой текст";
};

const onTextFocus = (e, fig) => {
  if (["Дважды кликните для ввода", "Пустой текст"].includes(fig.text)) {
    fig.text = "";
    e.target.innerText = "\u200B";
  }
};

const onTextKeyDown = (e, fig) => {
  if (
    ["Backspace", "Delete"].includes(e.key) &&
    !e.target.innerText.replace(/\u200B/g, "").trim()
  ) {
    e.preventDefault();
    document.activeElement?.blur();
    removeFigure(fig.id);
  }
};

const startDrag = (e, fig) => {
  selectFigure(fig.id);
  e.currentTarget?.focus?.();
  if (
    e.target.classList.contains("resize-handle") ||
    (e.target.classList.contains("editable-text") &&
      document.activeElement === e.target)
  )
    return;

  isDragging.value = true;
  draggedFigure = fig;
  mouseStartX = e.clientX;
  mouseStartY = e.clientY;

  if (fig.type === "line") {
    figStartX = fig.x1;
    figStartY = fig.y1;
    figStartX2 = fig.x2;
    figStartY2 = fig.y2;
  } else {
    figStartX = fig.x;
    figStartY = fig.y;
  }
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value || !draggedFigure) return;
  const dx = e.clientX - mouseStartX,
    dy = e.clientY - mouseStartY;
  if (draggedFigure.type === "line") {
    draggedFigure.x1 = figStartX + dx;
    draggedFigure.y1 = figStartY + dy;
    draggedFigure.x2 = figStartX2 + dx;
    draggedFigure.y2 = figStartY2 + dy;
  } else {
    draggedFigure.x = figStartX + dx;
    draggedFigure.y = figStartY + dy;
  }
};

const stopDrag = () => {
  isDragging.value = false;
  draggedFigure = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};

const startResize = (e, fig) => {
  isResizing.value = true;
  draggedFigure = fig;
  mouseStartX = e.clientX;
  mouseStartY = e.clientY;
  startWidth = fig.width;
  startHeight = fig.height;
  if (fig.type === "line") {
    figStartX2 = fig.x2;
    figStartY2 = fig.y2;
  }
  document.addEventListener("mousemove", onResize);
  document.addEventListener("mouseup", stopResize);
};

const onResize = (e) => {
  if (!isResizing.value || !draggedFigure) return;
  const dx = e.clientX - mouseStartX,
    dy = e.clientY - mouseStartY;
  if (draggedFigure.type === "line") {
    draggedFigure.x2 = figStartX2 + dx;
    draggedFigure.y2 = figStartY2 + dy;
  } else {
    draggedFigure.width = Math.max(45, startWidth + dx);
    draggedFigure.height = Math.max(45, startHeight + dy);
  }
};

const stopResize = () => {
  isResizing.value = false;
  draggedFigure = null;
  document.removeEventListener("mousemove", onResize);
  document.removeEventListener("mouseup", stopResize);
};

const removeFigure = (id) => {
  figures.value = figures.value.filter((f) => f.id !== id);
  if (selectedId.value === id) selectedId.value = null;
};

const handleKeyDown = (e) => {
  if (document.activeElement?.classList.contains("editable-text")) return;
  if (["Delete", "Backspace"].includes(e.key) && selectedId.value !== null) {
    e.preventDefault();
    removeFigure(selectedId.value);
  }
};

onMounted(() => window.addEventListener("keydown", handleKeyDown));
onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
</script>

<template>
  <div class="workspace">
    <input
      type="file"
      ref="fileInputRef"
      style="display: none"
      accept="image/*"
      @change="onFileChange"
    />
    <nav class="toolbar">
      <button class="toolbar__btn" @click="addFigure('text')">Текст</button>
      <button class="toolbar__btn" @click="addFigure('image')">
        <img src="../public/img/img.png" alt="изоб." />
      </button>
      <button class="toolbar__btn" @click="addFigure('rectangle')">
        <img src="../public/img/rectangle.png" alt="прямоуг." />
      </button>
      <button class="toolbar__btn" @click="addFigure('circle')">
        <img src="../public/img/elleps.png" alt="круг" />
      </button>
      <button class="toolbar__btn" @click="addFigure('line')">
        <img src="../public/img/linia.png" alt="линия" />
      </button>
    </nav>

    <div class="canvas-viewport">
      <div class="canvas-board" id="main-canvas" @click="deselectAll">
        <div
          v-for="fig in figures"
          :key="fig.id"
          tabindex="0"
          :class="[
            'figure',
            `figure--${fig.type}`,
            { 'figure--selected': fig.id === selectedId },
          ]"
          :style="
            fig.type === 'line'
              ? {
                  position: 'absolute',
                  left: fig.x1 + 'px',
                  top: fig.y1 + 'px',
                  width:
                    Math.sqrt(
                      Math.pow(fig.x2 - fig.x1, 2) +
                        Math.pow(fig.y2 - fig.y1, 2),
                    ) + 'px',
                  height: '12px',
                  transformOrigin: '0 50%',
                  transform: `rotate(${(Math.atan2(fig.y2 - fig.y1, fig.x2 - fig.x1) * 180) / Math.PI}deg)`,
                }
              : {
                  position: 'absolute',
                  left: fig.x + 'px',
                  top: fig.y + 'px',
                  width: fig.width + 'px',
                  height: fig.height + 'px',
                }
          "
          @mousedown.stop="startDrag($event, fig)"
        >
          <div
            v-if="fig.type === 'text'"
            contenteditable="true"
            class="editable-text"
            v-text="fig.text"
            @focus="onTextFocus($event, fig)"
            @blur="onTextBlur($event, fig)"
            @keydown="onTextKeyDown($event, fig)"
          ></div>
          <div v-if="fig.type === 'image'" class="image-container">
            <img :src="fig.src" class="figure__uploaded-img" alt="Загружено" />
          </div>
          <div v-if="fig.type === 'line'" class="line-shape"></div>
          <div
            v-if="fig.id === selectedId"
            class="resize-handle"
            :class="{ 'resize-handle--line': fig.type === 'line' }"
            @mousedown.stop.prevent="startResize($event, fig)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.figure {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: rgba(52, 152, 219, 0.2);
  border: 2px solid #3498db;
  color: #2c3e50;
  font-weight: bold;
  cursor: grab;
  outline: none;
}
.figure:active {
  cursor: grabbing;
}
.image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  display: flex;
}
.figure__uploaded-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.figure--circle {
  border-radius: 50%;
}
.figure--rectangle {
  border-radius: 4px;
}
.figure--selected {
  border: 2px dashed #e74c3c !important;
  box-shadow: 0 0 12px rgba(231, 76, 60, 0.5);
}
.figure--text {
  background: transparent !important;
  border: 1px dashed #7f8c8d;
}
.figure--text.figure--selected {
  border: 2px dashed #e74c3c !important;
}
.editable-text {
  width: 100%;
  height: 100%;
  padding: 8px;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  cursor: text;
}
.figure--line {
  background: transparent;
  border: none;
}
.figure--line .line-shape {
  width: 100%;
  height: 4px;
  background-color: #e74c3c;
}
.figure--line.figure--selected {
  box-shadow: none;
}
.resize-handle {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 16px;
  height: 16px;
  background-color: #e74c3c;
  border: 2px solid #ffffff;
  border-radius: 50%;
  cursor: nwse-resize;
  z-index: 9999;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}
.resize-handle--line {
  right: -8px;
  bottom: -2px;
  cursor: crosshair;
}
.resize-handle:hover {
  transform: scale(1.2);
  background-color: #c0392b;
}
.workspace {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
}
.toolbar {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}
.toolbar__btn {
  width: 64px;
  height: 64px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #4a5568;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.toolbar__btn img {
  width: 32px;
}
.toolbar__btn:hover {
  background-color: #f7fafc;
  border-color: #cbd5e1;
}
.canvas-viewport {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}
.canvas-board {
  width: 1600px;
  height: 900px;
  min-width: 1600px;
  min-height: 900px;
  background-color: #ffffff;
  background-image: radial-gradient(#bdc3c7 1.2px, transparent 1.2px);
  background-size: 24px 24px;
  position: relative;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 2px solid #34495e;
}
</style>
