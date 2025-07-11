// src/composables/useLogin.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginAdmin } from '@/services/authService'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()

  const handleLogin = async () => {
    error.value = ''
    const result = await loginAdmin(email.value, password.value)
    if (result.success) {
      router.push('/admin')
    } else {
      error.value = result.message || 'Error al iniciar sesión'
    }
  }

  return { email, password, error, handleLogin }
}
