import { Request, Response, NextFunction } from 'express'
import Lead from '../models/Lead'
import type { LeadQuery, LeadStatus, LeadSource } from '../types/lead.types'

// CREATE LEAD
export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, status, source, phone, company, message } = req.body

    // check if lead with same email already exists
    const leadExists = await Lead.findOne({ email })
    if (leadExists) {
      return res.status(400).json({ success: false, message: 'Lead already exists' })
    }

    // create lead — mongoose validates fields against schema automatically
    const lead = await Lead.create({ name, email, status, source, phone, company, message })

    return res.status(201).json({ success: true, data: lead })
  } catch (error) {
    next(error)
  }
}

// GET ALL LEADS (filter + search + sort + paginate)
export const getAllLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // coerce query params — req.query values are string | ParsedQs | string[] | ParsedQs[]
    const status = req.query.status ? String(req.query.status) : undefined
    const source = req.query.source ? String(req.query.source) : undefined
    const search = req.query.search ? String(req.query.search) : undefined
    const sort = req.query.sort ? String(req.query.sort) : undefined
    const pageNum = Number(req.query.page ?? 1)
    const limitNum = Number(req.query.limit ?? 10)

    const sortOrder = sort === 'oldest' ? 1 : -1

    const query: LeadQuery = {}

    if (status) query.status = status as LeadStatus
    if (source) query.source = source as LeadSource

    // searching -> search uses regex for partial + case insensitive matching
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    // count total matching documents BEFORE pagination
    // needed to calculate total pages
    const total = await Lead.countDocuments(query)

    // pagination + sorting
    // fetch leads with all filters applied
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })           // sort by date
      .skip((pageNum - 1) * limitNum)           // skip previous pages
      .limit(limitNum)                           // take only current page

    return res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,                              // total matching leads
        page: pageNum,                      // current page number
        pages: Math.ceil(total / limitNum), // total number of pages
        limit: limitNum                     // leads per page
      }
    })
  } catch (error) {
    next(error)
  }
}

// GET SINGLE LEAD BY ID
export const getLeadById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    return res.status(200).json({ success: true, data: lead })
  } catch (error) {
    next(error)
  }
}

// UPDATE LEAD
export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,          // id from URL
      req.body,               // new values from request body
      {
        new: true,            // return updated doc, not old one
        runValidators: true   // run schema validation on new values
      }
    )

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    return res.status(200).json({ success: true, data: lead })
  } catch (error) {
    next(error)
  }
}

// DELETE LEAD
export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)

    // if no lead found with that id → return 404
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' })
    }

    // 200 with success message
    return res.status(200).json({ success: true, message: 'Lead deleted successfully' })
  } catch (error) {
    next(error)
  }
}