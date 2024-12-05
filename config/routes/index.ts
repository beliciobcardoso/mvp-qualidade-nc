import type { ConfigRoutes } from '@/types/routes'

export const configRoutes: ConfigRoutes = {
  publicRoutes: ['/signin'],
  authRoutes: ['/api/auth/signin'],
  apiRoutes: ['/api/reportpdf'],
  protectedRoutes: [
    '/',
    '/admin/client',
    '/admin/site',
    '/admin/user',
    '/admin/user/profile',
    '/admin/technician',
    '/admin/structureType',
    '/admin/siteType',
    '/relatorio',
    '/relatorio/:id',
  ],
}
