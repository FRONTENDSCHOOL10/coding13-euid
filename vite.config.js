import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  // process.cwd()를 사용하여 현재 작업 디렉토리에서 환경 변수 로드
  const env = loadEnv(mode, process.cwd());

  return {
    root: path.resolve(__dirname, 'src'), // src 폴더를 루트로 설정
    publicDir: resolve(__dirname, 'public'),
    build: {
      outDir: resolve(__dirname, 'docs'),
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src', 'index.html'),
          category: resolve(__dirname, 'src', 'pages', 'category', 'index.html'),
          profile: resolve(__dirname, 'src', 'pages', 'profile', 'index.html'),
          profileDetail: resolve(__dirname, 'src', 'pages', 'profile-detail', 'index.html'),
          editProfile: resolve(__dirname, 'src', 'pages', 'edit-profile', 'index.html'),
          exchange: resolve(__dirname, 'src', 'pages', 'exchange', 'index.html'),
          exchangeDetail: resolve(__dirname, 'src', 'pages', 'exchange-detail', 'index.html'),
          start: resolve(__dirname, 'src', 'pages', 'start', 'index.html'),
          search: resolve(__dirname, 'src', 'pages', 'search', 'index.html'),
          searchResult: resolve(__dirname, 'src', 'pages', 'search-result', 'index.html'),
          signup: resolve(__dirname, 'src', 'pages', 'signup', 'index.html'),
          login: resolve(__dirname, 'src', 'pages', 'login', 'index.html'),
          chat: resolve(__dirname, 'src', 'pages', 'chat', 'index.html'),
          chatContent: resolve(__dirname, 'src', 'pages', 'chat-content', 'index.html'),
          signup2: resolve(__dirname, 'src', 'pages', 'signup', 'signup2.html'),
          login2: resolve(__dirname, 'src', 'pages', 'login', 'login2.html'),
        },
      },
    },
    server: {
      configureServer(server) {
        // Vite의 개발 서버는 여러 미들웨어를 체인 형태로 연결하여 요청을 처리하기 때문에
        // 경로 설정을 만지는 경우라면 middleware를 사용해야 합니다.
        server.middlewares.use((req, res, next) => {
          if (req.method === 'GET' && !req.url.startsWith('/@') && !req.url.startsWith('/src')) {
            const url = req.url === '/' ? '/index.html' : req.url;
            const filePath = path.resolve(__dirname, 'src', url.slice(1));
            res.sendFile(filePath, (err) => {
              if (err) {
                res.status(404).sendFile(path.resolve(__dirname, 'src', 'index.html'));
              }
            });
          } else {
            next();
          }
        });
      },
    },
    define: {
      // 환경 변수를 define 옵션에 전달
      'process.env': {
        ...env, // 객체이기 때문에 열거해 전달
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
