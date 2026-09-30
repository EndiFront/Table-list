<template>
  <div class="auth-card">
    <h2>Регистрация</h2>
    <form action="/register" method="POST">
      <div class="form-group">
        <label for="username">Имя пользователя</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          placeholder="Иван"
        />
      </div>
      <div class="form-group">
        <label for="email">Электронная почта</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="example@mail.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="••••••••"
        />
      </div>
      <button type="submit" class="btn-submit">Создать аккаунт</button>
    </form>

    <div class="auth-footer">
      Уже есть аккаунт? <a href="/login">Войти</a>
    </div>
  </div>
</template>

<style scoped>
/* Центральный холст-карточка */
.auth-card {
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 350px;
  box-sizing: border-box;
}

h2 {
  margin: 0 0 24px 0;
  color: #2b3a4a;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: #506173;
  font-size: 14px;
  font-weight: 500;
}

/* Поля ввода в стиле панели инструментов */
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d2d9e0;
  border-radius: 6px;
  font-size: 14px;
  color: #2b3a4a;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.form-group input:focus {
  border-color: #2b3a4a;
  outline: none;
}

/* Кнопка отправки */
.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #2b3a4a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 10px;
}

.btn-submit:hover {
  background-color: #1f2b37;
}

/* Ссылка на вход */
.auth-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #8a99a8;
}

.auth-footer a {
  color: #2b3a4a;
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>