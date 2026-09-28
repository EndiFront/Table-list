<script setup>
import { ref } from "vue";

const figures = ref([]);

const addFigure = (type) => {
  const newFigure = {
    id: Date.now(),
    type: type,
    x: 100 + figures.value.length * 20,
    y: 100 + figures.value.length * 20,
    width: 150,
    height: 150,
  };
  figures.value.push(newFigure);
};
const bim = ref("Двигайте мышь...");

document.addEventListener("mousemove", (event) => {
  const clientX = event.clientX;
  const clientY = event.clientY;
  bim.value = `X: ${clientX}, Y: ${clientY}`;
});
</script>

<template>
  <h1>{{ bim }}</h1>
  <div class="workspace">
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
      <div class="canvas-board" id="main-canvas">
        <div
          v-for="fig in figures"
          :key="fig.id"
          :class="['figure', `figure--${fig.type}`]"
          :style="{
            position: 'absolute',
            left: fig.x + 'px',
            top: fig.y + 'px',
            width: fig.type !== 'line' ? fig.width + 'px' : 'auto',
            height: fig.type !== 'line' ? fig.height + 'px' : 'auto',
          }"
        >
          <template v-if="fig.type === 'text'">Редактируемый текст</template>
          <template v-if="fig.type === 'image'"></template>
          <template v-if="fig.type === 'rectangle'"></template>
          <template v-if="fig.type === 'circle'"></template>
          <template v-if="fig.type === 'line'">
            <div class="line-shape"></div>
          </template>
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
}

.figure--circle {
  border-radius: 50%;
}

.figure--rectangle {
  border-radius: 4px;
}

.figure--text {
  background: transparent;
  border: 1px dashed #7f8c8d;
}

.figure--line {
  background: transparent;
  border: none;
}
.figure--line .line-shape {
  width: 150px;
  height: 4px;
  background-color: #e74c3c;
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
  img {
    width: 32px;
  }
}
.toolbar__btn:hover {
  background-color: #f7fafc;
  border-color: #cbd5e1;
}
.toolbar__btn--active {
  background-color: #3498db;
  color: #ffffff;
  border-color: #3498db;
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
