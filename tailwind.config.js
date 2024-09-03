/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "custom-background": "url('/bg.jpeg')",
            },
            spacing: {
                7.5: "30px",
            },
            height: {
                74: "74px",
            },
            colors: {
                confirmation: "rgba(106, 184, 69, 1)", // Цвет подтверждения
                rejection: "rgba(247, 53, 53, 1)", // Цвет отклонения
            },
        },
    },
    plugins: [],
};
