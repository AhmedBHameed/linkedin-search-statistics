import Table from 'cli-table';

const table = new Table({head: ['Method', 'Path']});

const listRoutes = (routes: any[]) => {
  let route;
  // const routes: any[] = [];

  routes.forEach(function (middleware) {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push(middleware.route);
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach(function (handler) {
        route = handler.route;
        if (route.methods.get && route.methods.post) {
          table.push(['GET', route.path]);
          table.push(['POST', route.path]);
        } else if (route.methods.post) {
          table.push(['POST', route.path]);
        } else if (route.methods.get) {
          table.push(['GET', route.path]);
        }
      });
    }
  });

  console.log(table.toString());
  return table;
};

export {listRoutes};
