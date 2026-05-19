import { Router } from 'express'
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
} from '../controllers/leadController'
import { protect } from '../middleware/authMiddleware'
import { authorize } from '../middleware/roleMiddleware'

const router = Router()

// all lead routes are protected — must be logged in

// GET /api/leads — both admin and sales can view all leads
router.get('/', protect, authorize(['admin', 'sales']), getAllLeads)

// POST /api/leads — both admin and sales can create new lead
router.post('/', protect, authorize(['admin', 'sales']), createLead)

// GET /api/leads/:id — both admin and sales can view using id
router.get('/:id', protect, authorize(['admin', 'sales']), getLeadById)

// PUT /api/leads/:id — both admin and sales can update using id
router.put('/:id', protect, authorize(['admin', 'sales']), updateLead)

// DELETE /api/leads/:id — only admin can delete using id
router.delete('/:id', protect, authorize(['admin']), deleteLead)

export default router