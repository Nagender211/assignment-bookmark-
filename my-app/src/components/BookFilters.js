import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'


const GENRES = ['', 'Fiction', 'Fantasy', 'Programming', 'Sci-Fi', 'Non-Fiction']
const STATUSES = ['', 'Available', 'Issued']


export default function BookFilters() {
const [params, setParams] = useSearchParams()


// read current values from URL
const search = params.get('search') ?? ''
const genre = params.get('genre') ?? ''
const status = params.get('status') ?? ''


// whenever filters change, reset to first page
function update(key, value) {
const next = new URLSearchParams(params)
if (value) next.set(key, value); else next.delete(key)
next.set('page', '1')
setParams(next)
}


return (
<div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
<div>
<label className="label">Search (title/author)</label>
<input className="input" placeholder="Search..." defaultValue={search}
onChange={(e) => update('search', e.target.value.trim())} />
</div>
<div>
<label className="label">Genre</label>
<select className="select" value={genre} onChange={(e) => update('genre', e.target.value)}>
{GENRES.map(g => <option key={g} value={g}>{g || 'All'}</option>)}
</select>
</div>
<div>
<label className="label">Status</label>
<select className="select" value={status} onChange={(e) => update('status', e.target.value)}>
{STATUSES.map(s => <option key={s} value={s}>{s || 'All'}</option>)}
</select>
</div>
</div>
)
}