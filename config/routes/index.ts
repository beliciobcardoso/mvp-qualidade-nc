import type { ConfigRoutes } from '@/types/routes'

export const configRoutes: ConfigRoutes = {
  publicRoutes: ['/signin'],
  authRoutes: ['/api/auth/signin', '/api/auth/signout', '/api/auth/[...nextauth]'],
  apiRoutes: ['/api/reportpdf/[idReport]'],
  protectedRoutes: [
    '/',
    '/admin/client',
    '/admin/site',
    '/admin/siteType',
    '/admin/structureType',
    '/admin/technician',
    '/admin/user',
    '/admin/user/profile',
    '/api/reportpdf/[idReport]',
    '/relatorio',
    '/relatorio/[id]',
    '/reportviewer/[id]',
  ],
}

// /                                    107 kB          257 kB
// /admin/client                        5.6 kB          175 kB
// /admin/site                          4.69 kB         194 kB
// /admin/siteType                      4.38 kB         169 kB
// /admin/structureType                 4.39 kB         169 kB
// /admin/technician                    4.36 kB         169 kB
// /admin/user                          5.37 kB         201 kB
// /admin/user/profile                  3.17 kB         154 kB
// /api/auth/[...nextauth]              0 B                0 B
// /api/reportpdf/[idReport]            0 B                0 B
// /relatorio                           21.7 kB         236 kB
// /relatorio/[id]                      104 kB          260 kB
// /reportviewer/[id]                   1.72 kB         101 kB
// /signin
