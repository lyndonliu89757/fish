import { defineConfig } from '@umijs/max';

export default defineConfig({
  title: 'fish',
  hash: true,
  history: { type: 'hash' },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  routes: [
    {
      path: '/',
      component: './web',
      title: 'fish',
    },
  ],
  jsMinifierOptions: { charset: 'utf8' },
});
