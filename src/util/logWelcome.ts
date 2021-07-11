import environment from 'src/config/environment';

import showIp from './showIp';

const {port, version, isProd} = environment;

const logWelcome = (): void =>
  console.log(
    '\n🛡️ ###########################🛡️',
    '\n\n Server is listening to:',
    `\n${showIp()
      .map(ip => `\n 🚀 http://${ip}:${port}`)
      .join('')}\n\n 🔨 Build ver: ${version}`,
    `\n\n 📳 ${isProd ? 'Production' : 'Development'} mode`,
    '\n\n🛡️ ###########################🛡️'
  );

export default logWelcome;
