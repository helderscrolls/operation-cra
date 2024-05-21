import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'agents',
    loadChildren: () =>
      import('@operation-cra/agents').then((m) => m.agentsRoutes),
  },
];
