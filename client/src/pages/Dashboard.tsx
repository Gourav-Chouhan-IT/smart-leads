import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import { fetchStart, fetchSuccess, fetchFailure, setFilter, setPage } from '../store/leadSlice'
import axios from 'axios'
import { leadService } from '../services/leadService'
import type { GetLeadsParams } from '../services/leadService'
import { useDebounce } from '../hooks/useDebounce'
import { exportToCSV } from '../utils/exportCSV'
import Navbar from '../components/layout/Navbar'
import LeadTable from '../components/leads/LeadTable'
import LeadFilters from '../components/leads/LeadFilters'
import LeadModal from '../components/leads/LeadModal'
import StatCard from '../components/ui/StatCard'
import Pagination from '../components/ui/Pagination'
import type { Lead } from '../store/leadSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { leads, loading, pagination, filters } = useSelector((state: RootState) => state.lead)
  const { user } = useSelector((state: RootState) => state.auth)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)

  const debouncedSearch = useDebounce(filters.search, 400)

  const fetchLeads = async () => {
    dispatch(fetchStart())
    try {
      const params: GetLeadsParams = {
        page: pagination.page,
        limit: pagination.limit,
        sort: filters.sort,
      }
      if (filters.status) params.status = filters.status
      if (filters.source) params.source = filters.source
      if (debouncedSearch) params.search = debouncedSearch

      const res = await leadService.getAll(params)
      dispatch(fetchSuccess({ data: res.data, pagination: res.pagination }))
    } catch (err: unknown) {
      dispatch(fetchFailure(axios.isAxiosError(err) ? err.response?.data?.message || 'Failed to fetch leads' : 'Failed to fetch leads'))
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [pagination.page, filters.status, filters.source, filters.sort, debouncedSearch])

  const handleAdd = () => {
    setEditingLead(null)
    setModalOpen(true)
  }

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead)
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    try {
      await leadService.delete(id)
      fetchLeads()
    } catch (err: unknown) {
      alert(axios.isAxiosError(err) ? err.response?.data?.message || 'Failed to delete' : 'Failed to delete')
    }
  }

  const handleSave = async (data: Partial<Lead>) => {
    try {
      if (editingLead) {
        await leadService.update(editingLead._id, data)
      } else {
        await leadService.create(data)
      }
      setModalOpen(false)
      fetchLeads()
    } catch (err: unknown) {
      alert(axios.isAxiosError(err) ? err.response?.data?.message || 'Failed to save' : 'Failed to save')
    }
  }

  const stats = {
    total: pagination.total,
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    qualified: leads.filter((l) => l.status === 'Qualified').length,
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <main className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-1">Leads</h1>
          <p className="text-text-mute text-sm">
            Manage your sales pipeline · Welcome back, {user?.name}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Leads" value={stats.total} accent="teal" />
          <StatCard label="New" value={stats.new} accent="green" />
          <StatCard label="Contacted" value={stats.contacted} accent="teal" />
          <StatCard label="Qualified" value={stats.qualified} accent="green" />
        </div>

        {/* Filters + Actions */}
        <LeadFilters
          filters={filters}
          onChange={(f) => dispatch(setFilter(f))}
          onAdd={handleAdd}
          onExport={() => exportToCSV(leads)}
        />

        {/* Table */}
        <div className="mt-6">
          <LeadTable
            leads={leads}
            loading={loading}
            userRole={user?.role}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Pagination
            page={pagination.page}
            pages={pagination.pages}
            total={pagination.total}
            onChange={(p) => dispatch(setPage(p))}
          />
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <LeadModal
          lead={editingLead}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

export default Dashboard