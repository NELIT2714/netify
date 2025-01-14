/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,svelte}"],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
            aria: {
                current: 'current="page"'
            }
        },
    },
    plugins: [],
}
