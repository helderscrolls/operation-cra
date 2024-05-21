import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'missions',
    loadChildren: () =>
      import('@operation-cra/missions').then((m) => m.missionsRoutes),
  },
  {
    path: 'agents',
    loadChildren: () =>
      import('@operation-cra/agents').then((m) => m.agentsRoutes),
  },
];
