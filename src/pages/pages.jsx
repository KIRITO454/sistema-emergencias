
import { useState } from "react"
import Login from "@/components/login"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState("")

  const handleLogin = (usuario: string) => {
    setIsLoggedIn(true)
    setCurrentUser(usuario)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
    localStorage.removeItem("usuario")
  }

  if (isLoggedIn) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ color: "#4caf50", fontSize: "2rem", marginBottom: "1rem" }}>¡Bienvenido, {currentUser}!</h1>
          <p style={{ color: "#666", marginBottom: "2rem" }}>Has iniciado sesión correctamente.</p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  return <Login onLogin={handleLogin} />
}
