import React, { useEffect, useState } from 'react'

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const readUser = () => {
      try {
        const raw = localStorage.getItem('user')
        if (raw) setUser(JSON.parse(raw))
        else setUser(null)
      } catch {
        setUser(null)
      }
    }
    readUser()
    window.addEventListener('userChanged', readUser)
    window.addEventListener('storage', readUser)
    return () => {
      window.removeEventListener('userChanged', readUser)
      window.removeEventListener('storage', readUser)
    }
  }, [])

  if (user) {
    return (
      <div className="flex  items-center justify-center px-4 mt-19 mr-10">
        <div className="w-150 ml-10 bg-blue-100 shadow rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-300">
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">DOB</th>
              </tr>
              <tr>
                 <th className="border px-4 py-2 text-left">{user.name}</th>
                 <th className="border px-4 py-2 text-left">{user.email}</th>
                 <th className="border px-4 py-2 text-left">{user.dob}</th>
              </tr>
            </thead>
            
          </table>
        </div>
                <div> <img
        src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
        alt="Quantum"
        className="w-180 h-108 ml-20 rounded-lg shadow-lg mt-3 object-cover"
      /></div>
      </div>
    )
  }

  return (
    <div className=" flex  items-center justify-center px-4">
        <div> <img
        src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80"
        alt="Quantum"
        className="w-180 h-108  rounded-lg shadow-lg mt-18 object-cover"
      /></div>
     <div> <h1 className="text-3xl sm:text-4xl font-extrabold text-center m-4 p-3 bg-white rounded">Quantum It Innovation Task </h1>
   <div className='ml-5'><p>
    Simple User Login Register Platform, task given by Quantum It Innovation Company.
    </p></div>
   </div>
     
    </div>
  )
}
export default Home
