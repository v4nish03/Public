<template>
    <div class="register-overlay">
        <div class="register-box">
        <h2>Crear nueva cuenta</h2>
        <form @submit.prevent="registrarUsuario">
            <label>
            Username:
            <input v-model="username" type="text" required />
            </label>

            <label>
            Nombre:
            <input v-model="nombre" type="text" required />
            </label>

            <label>
            Apellido:
            <input v-model="apellido" type="text" required />
            </label>

            <label>
            Celular:
            <input v-model="celular" type="text" required />
            </label>

            <label>
            Correo:
            <input v-model="correo" type="email" required />
            </label>

            <label>
            Contraseña:
            <input v-model="contrasena" type="password" required />
            </label>

            <div class="actions">
            <button type="submit">Registrarse</button>
            <button type="button" class="cancel" @click="$emit('close')">Cancelar</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { REGISTRO_USUARIO } from '../graphql/registroUsuarios';
import { LOGIN_USUARIO } from '../graphql/login';
import { useRouter } from 'vue-router';

const username = ref('');
const nombre = ref('');
const apellido = ref('');
const celular = ref('');
const correo = ref('');
const contrasena = ref('');
const router = useRouter();

const { mutate: registrar } = useMutation(REGISTRO_USUARIO);
const { mutate: login } = useMutation(LOGIN_USUARIO);

const registrarUsuario = async () => {
  try {
    const { data } = await registrar({
      username: username.value,
      email: correo.value,
      password: contrasena.value,
      nombre: nombre.value,
      apellidos: apellido.value,
      celular: celular.value,
    });

    if (data.registroUsuario.ok) {
      const loginResponse = await login({
        email: correo.value,
        password: contrasena.value,
      });

      const token = loginResponse.data.loginUsuario.token;
      localStorage.setItem('userToken', token);
      router.push('/'); // cambiala ruta correcta
    } else {
      alert('Error al registrarse: ' + data.registroUsuario.message);
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Hubo un error en el proceso de registro');
  }
};

</script>

<style scoped>
.register-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.register-box {
    width: 350px;
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
}

h2 {
    text-align: center;
    color: #3D3936;
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 1rem;
    color: #3D3936;
}

input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
}

button[type="submit"] {
    background-color: #D09B69;
    color: white;
}

button.cancel {
    background-color: #ccc;
    color: #333;
}
</style>