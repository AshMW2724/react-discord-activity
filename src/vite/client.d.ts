/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
  readonly VITE_DISCORD_CLIENT_ID: string
}