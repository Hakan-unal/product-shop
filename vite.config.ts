import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// @ts-nocheck 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
