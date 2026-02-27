import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  earlyAccess: true,
  url: process.env.DATABASE_URL
})
