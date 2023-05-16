/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            width: { 140: "35rem" }, // 4:1
            colors: {
                "#F4ECE1": "#F4ECE1",
                "#3A86FF": "#3A86FF",
                "#FF7E00": "#FF7E00",
                "#909090": "#909090",
                "#2F2F2F": "#2F2F2F",
            },
        },
    },
    plugins: [],
};
