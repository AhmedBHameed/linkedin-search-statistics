import environment from 'src/config/environment';

import showIp from './showIp';

const {port, version, isProd} = environment;

const logWelcome = (): void =>
  console.log(
    '\nš”ļø ###########################š”ļø',
    '\n\n Server is listening to:',
    `\n${showIp()
      .map(ip => `\n š http://${ip}:${port}`)
      .join('')}\n\n šØ Build ver: ${version}`,
    `\n\n š³ ${isProd ? 'Production' : 'Development'} mode`,
    '\n\nš”ļø ###########################š”ļø'
  );

export default logWelcome;
