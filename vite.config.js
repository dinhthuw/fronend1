import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // <-- Cấu hình này rất quan trọng khi deploy
  plugins: [react(), tailwindcss()],
})
