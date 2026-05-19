import { Request, Response, NextFunction } from 'express'
import Lead from '../models/Lead'

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

    // extract query params from URL
    const { status, source, search, sort, page = 1, limit = 10 } = req.query

    // convert page and limit to numbers (they come as strings from URL)
    const pageNum = Number(page)
    const limitNum = Number(limit)

    //sorting
    // sort order — -1 means latest first (default), 1 means oldest first
    const sortOrder = sort === 'oldest' ? 1 : -1

    //filtering
    // start with empty query — means -> find everything
    const query: any = {}

    if (status) query.status = status
    if (source) query.source = source

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