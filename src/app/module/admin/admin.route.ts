import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { AdminValidation } from './admin.validation'
import { AdminController } from './admin.controller'
const router = express.Router()

router.post('/create-admin', validateRequest(AdminValidation.createAdminZodSchema), AdminController.createAdmin)

router.post('/login', validateRequest(AdminValidation.loginZodSchema), AdminController.login)

export const AdminRoute = router