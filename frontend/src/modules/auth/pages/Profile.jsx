import { useEffect, useState } from 'react'
import { useUser } from '../../../context/UseAuthContext'
import useApi from '../../../shared/api'

const Profile = () => {
  // const { user, setUser } = useUser()
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  const authContext = useUser()
  const api = useApi()

  async function fetchProfile() {
    
    const response = await api.get("/auth/me")

    authContext.setUser(response.data.data.user)
  }

  useEffect(()=>{
    fetchProfile()
  },[])


  // if (loading) return <p className="text-center mt-10">Loading...</p>
  // if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-xl shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <p><span className="font-medium">Name:</span> {authContext.user?.name}</p>
        <p><span className="font-medium">Email:</span> {authContext.user?.email}</p>
      </div>
    </div>
  )
}

export default Profile
