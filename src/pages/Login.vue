<template>
    <div class="login-container">
        <div class="login-box">
        <h1>ANDYNA</h1>
        <form @submit.prevent="handleLogin">
            <div class="input-group">
            <label>Correo:</label>
            <input v-model="email" type="email" required />
            </div>

            <div class="input-group">
            <label>Contraseña:</label>
            <input v-model="password" type="password" required />
            </div>

            <div class="checkbox-group">
            <input type="checkbox" id="remember" v-model="mantenerSesion" />
            <label for="remember">Mantener sesión</label>
            </div>

            <button type="submit">Iniciar Sesión</button>
        </form>

        <p v-if="error" class="error-message">{{ error }}</p>

        <p class="register-message">
            ¿No tienes cuenta?
            <span @click="mostrarRegistro = true">Crea una</span>
        </p>
        </div>

        <RegisterUser v-if="mostrarRegistro" @close="mostrarRegistro = false" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { LOGIN_USUARIO } from '../graphql/login'
import RegisterUser from '../components/RegisterUser.vue'
import { useRouter } from 'vue-router'


const email = ref('');
const password = ref('');
const mantenerSesion = ref(false);
const mostrarRegistro = ref(false);
const error = ref('');
const router = useRouter();


const { mutate: loginUsuario, onDone, onError } = useMutation(LOGIN_USUARIO);

const handleLogin = async () => {
  error.value = '';
  try {
    await loginUsuario({
      email: email.value,
      password: password.value,
    });

    onDone(({ data }) => {
      const token = data.loginUsuario.token;
      localStorage.setItem('userToken', token);
      router.push('/'); //Poner ruta 
      console.log("Holiwis")
    });

    onError((e) => {
      error.value = 'Correo o contraseña incorrectos';
      console.error('Error al iniciar sesión:', e);
    });
  } catch (e) {
    error.value = 'Error de conexión';
    console.error(e);
  }
};
</script>

<style scoped>
.login-container {
    background-image: url('../assets/img/LoginFondo1.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.login-box {
    background: rgba(255, 255, 255, 0.9);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 350px;
    position: relative;
    z-index: 1;
}

h1 {
    color: var(--cafe);
    margin-bottom: 20px;
    text-align: center;
}

.input-group {
    margin-bottom: 20px;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--gris-oscuro);
    border-radius: 5px;
}

.checkbox-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.checkbox-group input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid var(--gris-oscuro);
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
}

.checkbox-group input[type="checkbox"]:checked {
    background-color: var(--naranja-opaco);
    border-color: var(--naranja-opaco);
}

.checkbox-group input[type="checkbox"]::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    display: none;
}

.checkbox-group input[type="checkbox"]:checked::after {
    display: block;
}

button {
    width: 100%;
    background-color: var(--cafe-claro);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background-color: var(--naranja-opaco);
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.register-message {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: #3D3936;
}

.register-message span {
    color: var(--naranja-opaco);
    cursor: pointer;
    font-weight: bold;
    margin-left: 0.3rem;
    text-decoration: underline;
}
</style>
