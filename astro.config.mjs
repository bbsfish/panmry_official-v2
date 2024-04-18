import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import vercel from "@astrojs/vercel/serverless";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel()
} // vite: {
//     resolve: {
//         alias: {
//             '@/*': [`${path.resolve(__dirname, 'src')}/*`]
//         }
//     }
// }
);