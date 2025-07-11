<template>
    <div>
        <!-- NAVBAR -->
        <header class="navbar">
        <div class="logo">Andyna</div>
        <nav>
            <a href="#categorias">Categorías</a>
            <a href="#about">Sobre Nosotros</a>
            <router-link to="/login" class="login-link">Iniciar Sesión</router-link>
        </nav>
        </header>

        <!-- HERO -->
        <section class="hero">
        <h1>Bienvenid@ a Andyna</h1>
        <p>
            Descubre moda circular en un solo lugar. Encuentra, conecta y da nueva vida a prendas únicas.
        </p>
        </section>


    </div>
</template>

<style scoped>
/* ---------- NAVBAR ---------- */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--cafe-claro);
    padding: 1rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--gris-oscuro);
}

.navbar nav a,
.navbar nav .login-link {
    margin-left: 1.5rem;
    text-decoration: none;
    color: var(--gris-oscuro);
    font-weight: 500;
    transition: color 0.2s ease;
}

.navbar nav a:hover,
.navbar nav .login-link:hover {
    color: var(--cafe);
}

/* ---------- HERO ---------- */
.hero {
    padding: 4rem 2rem;
    text-align: center;
    color: white;
}

.hero h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    color: var(--cafe-claro);
}

.hero p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    color: #f5f5f5;
}

</style>