<template>
  <header class="main-header">
    <div class="header-container">
      <div class="header-logo">
        <a href="#" class="logo-link">
          <svg
            class="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://w3.org"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="3"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M7 7H17M7 12H13M7 17H10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span class="logo-text">CollabBoard</span>
        </a>
      </div>

      <nav class="header-nav">
        <ul class="nav-list">
          <li><a href="#" class="nav-link active">Все доски</a></li>
        </ul>
      </nav>

      <div class="header-actions">
        <a href="/login" class="nav-link-auth">Вход</a>
        <a href="/register" class="btn btn-primary">Регистрация</a>
      </div>
    </div>
  </header>

  <!-- Основной контент -->
  <main class="content-wrapper">
    <div class="page-header">
      <h1 class="page-title">Мои доски</h1>
      <a href="/newtable">
        <button class="btn-create">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://w3.org"
          >
            <path
              d="M8 3V13M3 8H13"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          Создать доску
        </button>
      </a>
    </div>

    <!-- Сетка с досками -->
    <div class="boards-grid">
      <!-- Карточка 1 -->
      <a href="#" class="board-card">
        <div class="board-preview">
          <div class="preview-shape shape-1"></div>
          <div class="preview-shape shape-2"></div>
          <div class="preview-shape shape-3"></div>
        </div>
        <div class="board-info">
          <div class="board-name">Доска 1 😊</div>
          <div class="board-meta">
            <span class="board-date">Изменено: сегодня</span>
          </div>
        </div>
      </a>

      <!-- Карточка 2 -->
      <a href="#" class="board-card">
        <div class="board-preview">
          <div
            class="preview-shape shape-1"
            style="background: #9b59b6; top: 40px"
          ></div>
          <div
            class="preview-shape shape-2"
            style="background: #f1c40f; left: 120px"
          ></div>
        </div>
        <div class="board-info">
          <div class="board-name">Доска 2 🤞</div>
          <div class="board-meta">
            <span class="board-date">Изменено: 3 дня назад</span>
          </div>
        </div>
      </a>

      <!-- Карточка 3 -->
      <a href="#" class="board-card">
        <div class="board-preview">
          <div
            class="preview-shape shape-3"
            style="top: 50px; left: 50px; width: 100px"
          ></div>
        </div>
        <div class="board-info">
          <div class="board-name">Доска 3 😍</div>
          <div class="board-meta">
            <span class="board-date">Изменено: 12 окт 2026</span>
          </div>
        </div>
      </a>
    </div>
  </main>
</template>

<style scoped>
.main-header {
  background-color: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo .logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #ffffff;
}

.logo-icon {
  width: 28px;
  height: 28px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* Навигация */
.header-nav .nav-list {
  display: flex;
  list-style: none;
  gap: 32px;
}

.header-nav .nav-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.header-nav .nav-link:hover,
.header-nav .nav-link.active {
  opacity: 1;
}

.header-nav .nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
}

/* Блок авторизации */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link-auth {
  text-decoration: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.nav-link-auth:hover {
  opacity: 1;
}

.btn-primary {
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #ffffff;
  color: #1e293b;
}

/* Основной контент страницы */
.content-wrapper {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
  flex: 1;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
}

.btn-create {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #2980b9;
}

/* Сетка карточек досок */
.boards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Стили карточки */
.board-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: #2b3a4a;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.board-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* Превью доски (мини-версия холста) */
.board-preview {
  height: 150px;
  background-color: #f8fafc;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 16px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid #e2e8f0;
}

/* Абстрактные фигурки для красоты превью */
.preview-shape {
  position: absolute;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 6px;
  opacity: 0.7;
}
.shape-1 {
  width: 50px;
  height: 35px;
  top: 30px;
  left: 40px;
  transform: rotate(-10deg);
}
.shape-2 {
  width: 40px;
  height: 40px;
  bottom: 30px;
  right: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}
.shape-3 {
  width: 60px;
  height: 4px;
  top: 80px;
  left: 110px;
  background: #2ecc71;
  transform: rotate(15deg);
}

/* Информация о доске */
.board-info {
  padding: 20px;
  background-color: #ffffff;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.board-name {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.board-meta {
  font-size: 13px;
  color: #64748b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-date {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
