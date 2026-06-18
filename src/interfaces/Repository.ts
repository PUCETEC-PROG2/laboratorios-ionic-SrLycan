export interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    owner: (
        login: string;
        avatar_url: string;
    )
}

// Creación del arreglo con 5 instancias
export const repositoryList: Repository[] = [
    {
        name: "react-dashboard",
        avatarUrl: "https://avatars.githubusercontent.com/u/211136897?v=4",
        description: "Un panel de control de administración moderno construido con React y Tailwind.",
        language: "TypeScript"
    },
    {
        name: "fastapi-backend",
        avatarUrl: "https://avatars.githubusercontent.com/u/211136897?v=4",
        description: "API REST de alto rendimiento para el manejo de usuarios y autenticación.",
        language: "Python"
    },
    {
        name: "awesome-utils",
        avatarUrl: "https://avatars.githubusercontent.com/u/211136897?v=4",
        description: "Colección de funciones utilitarias para el día a día en JavaScript vanilla.",
        language: "JavaScript"
    },
    {
        name: "flutter-ecommerce",
        avatarUrl: "https://avatars.githubusercontent.com/u/211136897?v=4",
        description: "Aplicación móvil de comercio electrónico con soporte para iOS y Android.",
        language: "Dart"
    },
    {
        name: "rust-game-engine",
        avatarUrl: "https://avatars.githubusercontent.com/u/211136897?v=4",
        description: "Un motor de videojuegos 2D enfocado en el rendimiento y la seguridad de memoria.",
        language: "Rust"
    }
];