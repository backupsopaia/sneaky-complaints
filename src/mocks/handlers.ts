import { rest } from 'msw';

export const handlers = [
  // Autenticação
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 1,
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
          companyId: 1,
        },
        token: 'mock-token',
      })
    );
  }),

  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: {
          id: 2,
          name: 'New User',
          email: 'user@example.com',
          role: 'user',
          companyId: 2,
        },
        token: 'mock-token',
      })
    );
  }),

  // Empresas
  rest.get('/api/companies', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Company 1',
          email: 'company1@example.com',
          active: true,
        },
        {
          id: 2,
          name: 'Company 2',
          email: 'company2@example.com',
          active: true,
        },
      ])
    );
  }),

  // Reclamações
  rest.get('/api/complaints', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'Complaint 1',
          description: 'Description 1',
          status: 'open',
          priority: 'high',
          createdAt: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          title: 'Complaint 2',
          description: 'Description 2',
          status: 'closed',
          priority: 'medium',
          createdAt: '2024-01-02T00:00:00Z',
        },
      ])
    );
  }),

  // Métricas de Performance
  rest.get('/api/performance', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        metrics: {
          totalComplaints: 100,
          openComplaints: 30,
          closedComplaints: 70,
          averageResponseTime: 2.5,
        },
        timeSeriesData: [
          {
            date: '2024-01-01',
            totalComplaints: 10,
            openComplaints: 3,
            closedComplaints: 7,
            averageResponseTime: 2.0,
          },
          {
            date: '2024-01-02',
            totalComplaints: 15,
            openComplaints: 5,
            closedComplaints: 10,
            averageResponseTime: 2.5,
          },
        ],
      })
    );
  }),
];
